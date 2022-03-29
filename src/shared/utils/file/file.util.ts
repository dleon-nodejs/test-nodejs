import { UploadDocumentDto } from '@/document-upload/types/document-upload.type';
import { ERR_FILE_EXCEEDED_SIZE_LIMIT, ERR_FILE_NOT_SEND, ERR_FILE_TYPE_NOT_ACCEPTED } from '@/shared/errors/file.error';
import { throwError } from '../throw-error.util';

type ValidFileOptions = {
  file: UploadDocumentDto;
  sizeLimit: number;
  acceptTypes: string[];
};

export function validateUploadFile({ file, sizeLimit, acceptTypes }: ValidFileOptions) {
  if (!file || !file.filename) {
    throwError(ERR_FILE_NOT_SEND);
  }

  if (!acceptTypes.includes(file.contentType)) {
    throwError(ERR_FILE_TYPE_NOT_ACCEPTED);
  }

  if (file.size > sizeLimit) {
    throwError(ERR_FILE_EXCEEDED_SIZE_LIMIT);
  }
}

export function cleanFilename(filename) {
  return filename
    .toLowerCase()
    .normalize('NFD')
    .replace(/ /g, '_')
    .replace(/[^a-z-0-9_.]/gi, '');
}
