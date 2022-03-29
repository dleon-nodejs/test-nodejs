import { S3EventRecord } from 'aws-lambda';
import { S3 } from 'aws-sdk';

import { ReportCSV } from '@/shared/interfaces/csv.interface';
import { FileS3 } from '@/shared/interfaces/file.interface';

import { DocumentStatus, UploadType } from '../config/document-upload.enum';
import { getProcessorByTypeFactory } from '../factories/processor-by-type.factory';
import { DocumentUploadDto } from '../types/document-upload.type';
import { DocumentUploadRepository } from '../repositories/document-upload.repository';

const s3Instance = new S3();

export class DocumentProcessService {
  public async processFiles(records: S3EventRecord[]): Promise<void> {
    const repository = new DocumentUploadRepository();

    for (const record of records) {
      const { uploadType, file } = await this.getFile(record);

      const processor = getProcessorByTypeFactory(uploadType);
      const reports = await processor.processCsvFile(file);

      const report = this.mountReport(file.filename, uploadType, reports);
      await repository.create(report);
    }
  }

  private async getFile(record: S3EventRecord) {
    const { s3 } = record;
    const {
      bucket: { name: bucketName },
      object: { key },
    } = s3;

    const [folder, ...filenameArray] = key.split('/');
    const filename = filenameArray.join('_');

    const uploadType: UploadType = UploadType[folder] || UploadType.unknownType;

    const data = await s3Instance
      .getObject({
        Bucket: bucketName,
        Key: key,
      })
      .promise();

    const file: FileS3 = {
      content: data.Body as Buffer,
      filename,
    };

    return {
      uploadType,
      file,
    };
  }

  private mountReport(fileName: string, uploadType: UploadType, reports: ReportCSV[]): DocumentUploadDto {
    const hasError = reports.find((item) => item.error !== null);
    const hasSuccess = reports.find((item) => item.error === null);

    let status = DocumentStatus.unprocessed;

    if (hasError && hasSuccess) {
      status = DocumentStatus.processedWithErrors;
    }

    if (hasError && !hasSuccess) {
      status = DocumentStatus.error;
    }

    if (!hasError && hasSuccess) {
      status = DocumentStatus.success;
    }

    return {
      logs: reports,
      uploadType,
      fileName,
      status,
    };
  }
}
