import {
  createBackup,
  getBackups,
  restoreFromBackup,
  deleteBackup,
  clearAllBackups,
  createAutoBackup,
  getLatestBackup,
  hasContentChanged,
  formatBackupDate,
  getBackupSize
} from '../contentBackup';
import { SiteContent } from '../content';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

describe('contentBackup', () => {
  const mockContent: Partial<SiteContent> = {
    home: {
      heroTitle: 'Test Title',
      heroSubtitle: 'Test Subtitle',
      heroButtons: {
        callNow: {
          text: 'CALL NOW',
          action: 'navigate',
          target: '/contact#phone',
          variant: 'default',
          enabled: true
        },
        getDirections: {
          text: 'GET DIRECTIONS', 
          action: 'navigate',
          target: '/contact#map',
          variant: 'outline',
          enabled: true
        },
        requestCallback: {
          text: 'REQUEST CALLBACK',
          action: 'modal',
          target: 'RequestCallbackDialog',
          variant: 'outline',
          enabled: true
        }
      }
    }
  } as SiteContent;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  describe('createBackup', () => {
    it('should create a backup successfully', () => {
      createBackup(mockContent, 'Test backup');

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'site_content_backups',
        expect.stringContaining('"description":"Test backup"')
      );
    });
  });
});