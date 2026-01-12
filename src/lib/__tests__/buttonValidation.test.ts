import {
  validateButtonText,
  validateNavigationTarget,
  validateButtonVariant,
  validateButtonAction,
  validateButtonConfiguration,
  sanitizeButtonText,
  createDefaultButtonConfig,
  getAvailableTargets,
  getAvailableVariants
} from '../buttonValidation';
import { ButtonConfiguration } from '../content';

describe('buttonValidation', () => {
  describe('validateButtonText', () => {
    it('should validate correct button text', () => {
      const result = validateButtonText('CALL NOW');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject empty text', () => {
      const result = validateButtonText('');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Button text is required');
    });

    it('should reject text that is too short', () => {
      const result = validateButtonText('AB');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Button text must be at least 3 characters long');
    });

    it('should reject text that is too long', () => {
      const result = validateButtonText('A'.repeat(26));
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Button text must be no more than 25 characters long');
    });

    it('should reject text with invalid characters', () => {
      const result = validateButtonText('CALL@NOW#');
      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toContain('can only contain letters, numbers, spaces');
    });

    it('should accept text with valid special characters', () => {
      const result = validateButtonText('CALL NOW!');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('validateNavigationTarget', () => {
    it('should validate correct navigation targets', () => {
      const validTargets = ['/contact#phone', '/contact#map', '/about', '/admissions'];
      
      validTargets.forEach(target => {
        const result = validateNavigationTarget(target);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });
    });

    it('should reject empty target', () => {
      const result = validateNavigationTarget('');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Navigation target is required');
    });

    it('should reject invalid targets', () => {
      const result = validateNavigationTarget('/invalid-route');
      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toContain('Invalid navigation target');
    });
  });

  describe('validateButtonVariant', () => {
    it('should validate correct variants', () => {
      const validVariants = ['default', 'outline', 'secondary'];
      
      validVariants.forEach(variant => {
        const result = validateButtonVariant(variant);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });
    });

    it('should reject invalid variants', () => {
      const result = validateButtonVariant('invalid');
      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toContain('Invalid button variant');
    });
  });

  describe('validateButtonAction', () => {
    it('should validate correct actions', () => {
      const validActions = ['navigate', 'modal'];
      
      validActions.forEach(action => {
        const result = validateButtonAction(action);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });
    });

    it('should reject invalid actions', () => {
      const result = validateButtonAction('invalid');
      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toContain('Invalid button action');
    });
  });

  describe('validateButtonConfiguration', () => {
    const validConfig: ButtonConfiguration = {
      text: 'CALL NOW',
      action: 'navigate',
      target: '/contact#phone',
      variant: 'default',
      enabled: true
    };

    it('should validate correct configuration', () => {
      const result = validateButtonConfiguration(validConfig);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it('should validate modal configuration', () => {
      const modalConfig: ButtonConfiguration = {
        text: 'REQUEST CALLBACK',
        action: 'modal',
        target: 'RequestCallbackDialog',
        variant: 'outline',
        enabled: true
      };
      
      const result = validateButtonConfiguration(modalConfig);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it('should reject configuration with invalid text', () => {
      const invalidConfig = { ...validConfig, text: 'AB' };
      const result = validateButtonConfiguration(invalidConfig);
      expect(result.isValid).toBe(false);
      expect(result.errors.text).toBeDefined();
    });

    it('should reject configuration with invalid target for navigate action', () => {
      const invalidConfig = { ...validConfig, target: '/invalid' };
      const result = validateButtonConfiguration(invalidConfig);
      expect(result.isValid).toBe(false);
      expect(result.errors.target).toBeDefined();
    });

    it('should reject configuration with invalid variant', () => {
      const invalidConfig = { ...validConfig, variant: 'invalid' as any };
      const result = validateButtonConfiguration(invalidConfig);
      expect(result.isValid).toBe(false);
      expect(result.errors.variant).toBeDefined();
    });
  });

  describe('sanitizeButtonText', () => {
    it('should trim whitespace', () => {
      const result = sanitizeButtonText('  CALL NOW  ');
      expect(result).toBe('CALL NOW');
    });

    it('should remove invalid characters', () => {
      const result = sanitizeButtonText('CALL@NOW#');
      expect(result).toBe('CALLNOW');
    });

    it('should limit to max length', () => {
      const result = sanitizeButtonText('A'.repeat(30));
      expect(result).toHaveLength(25);
    });

    it('should preserve valid characters', () => {
      const result = sanitizeButtonText('CALL NOW & GO!');
      expect(result).toBe('CALL NOW & GO!');
    });
  });

  describe('createDefaultButtonConfig', () => {
    it('should create valid default configuration', () => {
      const config = createDefaultButtonConfig('CALL NOW', 'navigate', '/contact#phone');
      
      expect(config.text).toBe('CALL NOW');
      expect(config.action).toBe('navigate');
      expect(config.target).toBe('/contact#phone');
      expect(config.variant).toBe('default');
      expect(config.enabled).toBe(true);
    });

    it('should sanitize text in default configuration', () => {
      const config = createDefaultButtonConfig('  CALL@NOW  ', 'navigate', '/contact#phone');
      expect(config.text).toBe('CALLNOW');
    });
  });

  describe('getAvailableTargets', () => {
    it('should return array of target options', () => {
      const targets = getAvailableTargets();
      expect(Array.isArray(targets)).toBe(true);
      expect(targets.length).toBeGreaterThan(0);
      
      targets.forEach(target => {
        expect(target).toHaveProperty('value');
        expect(target).toHaveProperty('label');
        expect(target).toHaveProperty('description');
      });
    });

    it('should include contact page targets', () => {
      const targets = getAvailableTargets();
      const contactTargets = targets.filter(t => t.value.startsWith('/contact'));
      expect(contactTargets.length).toBeGreaterThan(0);
    });
  });

  describe('getAvailableVariants', () => {
    it('should return array of variant options', () => {
      const variants = getAvailableVariants();
      expect(Array.isArray(variants)).toBe(true);
      expect(variants).toHaveLength(3);
      
      variants.forEach(variant => {
        expect(variant).toHaveProperty('value');
        expect(variant).toHaveProperty('label');
        expect(variant).toHaveProperty('description');
      });
    });

    it('should include all required variants', () => {
      const variants = getAvailableVariants();
      const values = variants.map(v => v.value);
      expect(values).toContain('default');
      expect(values).toContain('outline');
      expect(values).toContain('secondary');
    });
  });
});