import { ReportCSV } from '@/shared/interfaces/csv.interface';
import { DocumentStatus, UploadType } from '@/document-upload/config/document-upload.enum';

export type DocumentUploadDto = {
  id?: number;
  fileName: string;
  status: DocumentStatus;
  uploadType: UploadType;
  logs: ReportCSV[];
};

export type UploadDocumentDto = {
  filename: string;
  size: number;
  contentType: string;
};
