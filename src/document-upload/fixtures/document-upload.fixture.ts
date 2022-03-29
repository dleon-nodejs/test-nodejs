import { DocumentUpload } from '@/document-upload/entities/document_upload.entity';

export const documentResportsFixture: DocumentUpload[] = [
  {
    id: 1,
    fileName: 'unidade de compra error.csv',
    status: 3,
    uploadType: 1,
    logs: [
      { line: 1, error: "Duplicate entry 'pç' for key 'variation'" },
      { line: 2, error: 'name is a required field' },
      { line: 3, error: "Duplicate entry 'pç' for key 'variation'" },
    ],
  } as DocumentUpload,
];
