class S3Mock {
  static getObjectMock = jest.fn();
  getObject() {
    return {
      promise: S3Mock.getObjectMock,
    };
  }
}

jest.mock('aws-sdk', () => ({
  S3: S3Mock,
  SecretsManager: class {},
}));

const createMock = jest.fn();
jest.mock('../../repositories/document-upload.repository', () => {
  return {
    DocumentUploadRepository: function () {
      return {
        create: createMock,
      };
    },
  };
});

import {
  createReportCallFixture,
  logsWithSuccessAndErrorFixture,
  logsWithSuccessFixture,
  purchaseUnitRecordFixture,
} from '@/document-upload/fixtures/process.fixtute';
import { DocumentProcessService } from '../document-process.service';
import * as getProcessFactory from '../../factories/processor-by-type.factory';
import { DocumentStatus, UploadType } from '@/document-upload/config/document-upload.enum';
import { logsErrorFixture } from '@/buyer/fixtures/process-csv.fixture';

describe('Suite Document Process Service', () => {
  const getProcessorMock = jest.spyOn(getProcessFactory, 'getProcessorByTypeFactory');

  it('should defined service ', () => {
    const service = new DocumentProcessService();
    expect(service).toBeDefined();
  });

  it('should save a report of process purchase-unit', async () => {
    const records = [purchaseUnitRecordFixture];
    S3Mock.getObjectMock.mockResolvedValue({
      Body: Buffer.from('csv'),
    });

    const processCsvFileMock = jest.fn();
    getProcessorMock.mockImplementation(
      () =>
        ({
          processCsvFile: processCsvFileMock,
        } as any)
    );

    processCsvFileMock.mockResolvedValue(logsWithSuccessFixture);
    createMock.mockResolvedValue(null);

    const service = new DocumentProcessService();
    await service.processFiles(records);

    const expectReportObject = createReportCallFixture({
      logs: logsWithSuccessFixture,
      uploadType: UploadType.purchaseUnit,
      status: DocumentStatus.success,
    });

    expect(createMock).toHaveBeenCalledWith(expectReportObject);
  });

  it('should save a report with sucess and error', async () => {
    const records = [purchaseUnitRecordFixture];
    S3Mock.getObjectMock.mockResolvedValue({
      Body: Buffer.from('csv'),
    });

    const processCsvFileMock = jest.fn();
    getProcessorMock.mockReturnValue({
      processCsvFile: processCsvFileMock,
    } as any);

    processCsvFileMock.mockResolvedValue(logsWithSuccessAndErrorFixture);
    createMock.mockResolvedValue(null);

    const service = new DocumentProcessService();
    await service.processFiles(records);

    const expectReportObject = createReportCallFixture({
      logs: logsWithSuccessAndErrorFixture,
      uploadType: UploadType.purchaseUnit,
      status: DocumentStatus.processedWithErrors,
    });

    expect(createMock).toHaveBeenCalledWith(expectReportObject);
  });

  it('should save a report with errors', async () => {
    const records = [purchaseUnitRecordFixture];
    S3Mock.getObjectMock.mockResolvedValue({
      Body: Buffer.from('csv'),
    });

    const processCsvFileMock = jest.fn();
    getProcessorMock.mockImplementation(
      () =>
        ({
          processCsvFile: processCsvFileMock,
        } as any)
    );

    processCsvFileMock.mockResolvedValue(logsErrorFixture);
    createMock.mockResolvedValue(null);

    const service = new DocumentProcessService();
    await service.processFiles(records);

    const expectReportObject = createReportCallFixture({
      logs: logsErrorFixture,
      uploadType: UploadType.purchaseUnit,
      status: DocumentStatus.error,
    });

    expect(createMock).toHaveBeenCalledWith(expectReportObject);
  });
});
