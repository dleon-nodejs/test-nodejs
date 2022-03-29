import { UploadDocumentDto } from '@/document-upload/types/document-upload.type';
import { FileS3 } from '@/shared/interfaces/file.interface';

export function createFileDataFixture(props = {}): UploadDocumentDto {
  return {
    size: 100,
    filename: 'example.txt',
    contentType: 'text',
    ...props,
  };
}
export function createFileFixture(props = {}): FileS3 {
  return {
    content: Buffer.alloc(100),
    filename: 'example.txt',
    ...props,
  };
}
