import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ButtonConfigCard } from '../ButtonConfigCard';
import { ButtonConfiguration } from '@/lib/content';

// Mock the toast hook
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn()
  })
}));

describe('ButtonConfigCard', () => {
  const mockConfig: ButtonConfiguration = {
    text: 'CALL NOW',
    action: 'navigate',
    target: '/contact#phone',
    variant: 'default',
    enabled: true
  };

  const mockOnUpdate = jest.fn();
  const mockOnPreview = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render button configuration card', () => {
    render(
      <ButtonConfigCard
        buttonType="callNow"
        config={mockConfig}
        onUpdate={mockOnUpdate}
        onPreview={mockOnPreview}
      />
    );

    expect(screen.getByText('Call Now Button')).toBeInTheDocument();
    expect(screen.getByDisplayValue('CALL NOW')).toBeInTheDocument();
    expect(screen.getByText('Enabled')).toBeInTheDocument();
  });

  it('should show disabled state when button is disabled', () => {
    const disabledConfig = { ...mockConfig, enabled: false };
    
    render(
      <ButtonConfigCard
        buttonType="callNow"
        config={disabledConfig}
        onUpdate={mockOnUpdate}
        onPreview={mockOnPreview}
      />
    );

    const textInput = screen.getByDisplayValue('CALL NOW');
    expect(textInput).toBeDisabled();
  });

  it('should update text when user types', async () => {
    const user = userEvent.setup();
    
    render(
      <ButtonConfigCard
        buttonType="callNow"
        config={mockConfig}
        onUpdate={mockOnUpdate}
        onPreview={mockOnPreview}
      />
    );

    const textInput = screen.getByDisplayValue('CALL NOW');
    await user.clear(textInput);
    await user.type(textInput, 'CONTACT US');

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith(
        expect.objectContaining({
          text: 'CONTACT US'
        })
      );
    });
  });

  it('should show validation error for invalid text', async () => {
    const user = userEvent.setup();
    
    render(
      <ButtonConfigCard
        buttonType="callNow"
        config={mockConfig}
        onUpdate={mockOnUpdate}
        onPreview={mockOnPreview}
      />
    );

    const textInput = screen.getByDisplayValue('CALL NOW');
    await user.clear(textInput);
    await user.type(textInput, 'AB'); // Too short

    await waitFor(() => {
      expect(screen.getByText('Button text must be at least 3 characters long')).toBeInTheDocument();
    });
  });

  it('should show character count', () => {
    render(
      <ButtonConfigCard
        buttonType="callNow"
        config={mockConfig}
        onUpdate={mockOnUpdate}
        onPreview={mockOnPreview}
      />
    );

    expect(screen.getByText('8/25')).toBeInTheDocument(); // 'CALL NOW' is 8 characters
  });

  it('should handle variant selection', async () => {
    const user = userEvent.setup();
    
    render(
      <ButtonConfigCard
        buttonType="callNow"
        config={mockConfig}
        onUpdate={mockOnUpdate}
        onPreview={mockOnPreview}
      />
    );

    // Find and click the variant selector
    const variantTrigger = screen.getByRole('combobox', { name: /button style/i });
    await user.click(variantTrigger);

    // Select outline variant
    const outlineOption = screen.getByText('Outline');
    await user.click(outlineOption);

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith(
        expect.objectContaining({
          variant: 'outline'
        })
      );
    });
  });

  it('should handle navigation target selection', async () => {
    const user = userEvent.setup();
    
    render(
      <ButtonConfigCard
        buttonType="callNow"
        config={mockConfig}
        onUpdate={mockOnUpdate}
        onPreview={mockOnPreview}
      />
    );

    // Find and click the target selector
    const targetTrigger = screen.getByRole('combobox', { name: /navigation target/i });
    await user.click(targetTrigger);

    // Select map target
    const mapOption = screen.getByText('Contact - Map Section');
    await user.click(mapOption);

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith(
        expect.objectContaining({
          target: '/contact#map'
        })
      );
    });
  });

  it('should handle enable/disable toggle', async () => {
    const user = userEvent.setup();
    
    render(
      <ButtonConfigCard
        buttonType="callNow"
        config={mockConfig}
        onUpdate={mockOnUpdate}
        onPreview={mockOnPreview}
      />
    );

    const enableSwitch = screen.getByRole('switch');
    await user.click(enableSwitch);

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: false
        })
      );
    });
  });

  it('should show modal action info for modal buttons', () => {
    const modalConfig: ButtonConfiguration = {
      text: 'REQUEST CALLBACK',
      action: 'modal',
      target: 'RequestCallbackDialog',
      variant: 'outline',
      enabled: true
    };

    render(
      <ButtonConfigCard
        buttonType="requestCallback"
        config={modalConfig}
        onUpdate={mockOnUpdate}
        onPreview={mockOnPreview}
      />
    );

    expect(screen.getByText('Opens callback request dialog')).toBeInTheDocument();
  });

  it('should call preview function when preview button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <ButtonConfigCard
        buttonType="callNow"
        config={mockConfig}
        onUpdate={mockOnUpdate}
        onPreview={mockOnPreview}
      />
    );

    const previewButton = screen.getByText('Preview Button');
    await user.click(previewButton);

    expect(mockOnPreview).toHaveBeenCalledWith(mockConfig);
  });

  it('should disable preview button when configuration is invalid', async () => {
    const user = userEvent.setup();
    
    render(
      <ButtonConfigCard
        buttonType="callNow"
        config={mockConfig}
        onUpdate={mockOnUpdate}
        onPreview={mockOnPreview}
      />
    );

    // Make text invalid
    const textInput = screen.getByDisplayValue('CALL NOW');
    await user.clear(textInput);
    await user.type(textInput, 'AB'); // Too short

    await waitFor(() => {
      const previewButton = screen.getByText('Preview Button');
      expect(previewButton).toBeDisabled();
    });
  });

  it('should show validation status indicators', async () => {
    const user = userEvent.setup();
    
    render(
      <ButtonConfigCard
        buttonType="callNow"
        config={mockConfig}
        onUpdate={mockOnUpdate}
        onPreview={mockOnPreview}
      />
    );

    // Initially should show valid status
    expect(screen.getByText('● Configuration valid')).toBeInTheDocument();

    // Make text invalid
    const textInput = screen.getByDisplayValue('CALL NOW');
    await user.clear(textInput);
    await user.type(textInput, 'AB'); // Too short

    await waitFor(() => {
      expect(screen.getByText('● 1 validation error(s)')).toBeInTheDocument();
    });
  });

  it('should show unsaved changes indicator', async () => {
    const user = userEvent.setup();
    
    render(
      <ButtonConfigCard
        buttonType="callNow"
        config={mockConfig}
        onUpdate={mockOnUpdate}
        onPreview={mockOnPreview}
      />
    );

    const textInput = screen.getByDisplayValue('CALL NOW');
    await user.type(textInput, ' TEST');

    await waitFor(() => {
      expect(screen.getByText('● Unsaved changes')).toBeInTheDocument();
    });
  });

  it('should sanitize text input', async () => {
    const user = userEvent.setup();
    
    render(
      <ButtonConfigCard
        buttonType="callNow"
        config={mockConfig}
        onUpdate={mockOnUpdate}
        onPreview={mockOnPreview}
      />
    );

    const textInput = screen.getByDisplayValue('CALL NOW');
    await user.clear(textInput);
    await user.type(textInput, 'CALL@NOW#'); // Invalid characters

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith(
        expect.objectContaining({
          text: 'CALLNOW' // Sanitized
        })
      );
    });
  });
});