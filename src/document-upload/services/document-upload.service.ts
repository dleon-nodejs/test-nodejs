import { S3 } from 'aws-sdk';

import { CSV_SIZE_LIMIT, CSV_TYPES } from '@/shared/config/file.config';
import { cleanFilename, validateUploadFile } from '@/shared/utils/file/file.util';
import { createPresignedPost } from '@/shared/utils/s3.utils';
import { UploadType } from '../config/document-upload.enum';
import { DOCUMENTS_BUCKET, ERR_DOCUMENT_UPLOAD_TYPE_WRONG } from '../config/upload.config';
import { DocumentUploadRepository } from '../repositories/document-upload.repository';
import { UploadDocumentDto } from '../types/document-upload.type';
import { throwError } from '@/shared/utils/throw-error.util';

export class DocumentUploadService {
  protected repository = new DocumentUploadRepository();

  public createUploadURL(uploadType: string, fileUploadData: UploadDocumentDto): S3.PresignedPost {
    this.validateFileCSV(fileUploadData);

    if (typeof uploadType === 'string') {
      const typeNum = UploadType[uploadType];
      if (typeNum === null || typeNum === undefined) {
        throwError(ERR_DOCUMENT_UPLOAD_TYPE_WRONG);
      }
    } else {
      throwError(ERR_DOCUMENT_UPLOAD_TYPE_WRONG);
    }

    const filenameFormatted = cleanFilename(fileUploadData.filename);
    return createPresignedPost(uploadType, filenameFormatted, DOCUMENTS_BUCKET);
  }

  public async findByUploadType(uploadType: string) {
    return this.repository.findByTypeUpload(uploadType);
  }

  private validateFileCSV(fileUploadData: UploadDocumentDto) {
    validateUploadFile({
      file: fileUploadData,
      acceptTypes: CSV_TYPES,
      sizeLimit: CSV_SIZE_LIMIT,
    });
  }
}
