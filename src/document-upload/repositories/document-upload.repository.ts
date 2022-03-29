import { UploadType } from 'aws-sdk/clients/devicefarm';
import { DocumentUpload } from '../entities/document_upload.entity';
import { DocumentUploadDto } from '../types/document-upload.type';

export class DocumentUploadRepository {
  public async create(params: DocumentUploadDto): Promise<void> {
    await DocumentUpload.create(params).save();
  }

  public async findByTypeUpload(uploadType: UploadType): Promise<DocumentUpload[]> {
    return DocumentUpload.find({ where: { uploadType } });
  }
}
