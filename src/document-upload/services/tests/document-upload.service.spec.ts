import { UploadType } from '@/document-upload/config/document-upload.enum';
import { documentResportsFixture } from '@/document-upload/fixtures/document-upload.fixture';
import { DocumentUploadService } from '../document-upload.service';

const findByTypeUploadMock = jest.fn();
jest.mock('../../repositories/document-upload.repository', () => {
  return {
    DocumentUploadRepository: function () {
      return {
        findByTypeUpload: findByTypeUploadMock,
      };
    },
  };
});

describe('Suite - Get log upload services report', () => {
  beforeEach(() => {
    findByTypeUploadMock.mockClear();
  });

  describe('test ', () => {
    describe('success', () => {
      it('should search reports by upload type', async () => {
        const service = new DocumentUploadService();

        findByTypeUploadMock.mockResolvedValue(documentResportsFixture);
        const result = await service.findByUploadType(UploadType[UploadType.productionPhase]);
        expect(result).toEqual(documentResportsFixture);
      });
    });
  });
});
