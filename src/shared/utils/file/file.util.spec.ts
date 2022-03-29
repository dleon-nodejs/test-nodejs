import createHttpError from 'http-errors';

import { ERR_FILE_EXCEEDED_SIZE_LIMIT, ERR_FILE_NOT_SEND, ERR_FILE_TYPE_NOT_ACCEPTED } from '@/shared/errors/file.error';
import { createFileDataFixture } from '@/shared/fixtures/utils/file/file.fixture';

import { validateUploadFile } from './file.util';

describe('Suite file.util', () => {
  describe('method validateUploadFile', () => {
    describe('success', () => {
      it('should validate file with success', () => {
        const file = createFileDataFixture();
        expect(
          validateUploadFile({
            file,
            sizeLimit: 100,
            acceptTypes: ['text'],
          })
        ).toBeUndefined();
      });

      it('should validate file with success when file size is equal sizeLimit', () => {
        const file = createFileDataFixture();
        expect(
          validateUploadFile({
            file,
            sizeLimit: 100,
            acceptTypes: ['text'],
          })
        ).toBeUndefined();
      });

      it('should validate file with success when file size is -1 sizeLimit', () => {
        const file = createFileDataFixture({
          content: Buffer.alloc(99),
        });
        expect(
          validateUploadFile({
            file,
            sizeLimit: 100,
            acceptTypes: ['text'],
          })
        ).toBeUndefined();
      });
    });

    describe('fails', () => {
      it('should throw error when not passed file', () => {
        const expectedError = createHttpError(ERR_FILE_NOT_SEND);
        expect(() => validateUploadFile({ file: null, sizeLimit: 100, acceptTypes: [] })).toThrow(expectedError);
      });

      it('should throw error when not passed size file exceed limit', () => {
        const file = createFileDataFixture({
          size: 101,
        });
        const expectedError = createHttpError(ERR_FILE_EXCEEDED_SIZE_LIMIT);
        expect(() => validateUploadFile({ file, sizeLimit: 100, acceptTypes: ['text'] })).toThrow(expectedError);
      });

      it('should throw error when file type is not acepted', () => {
        const file = createFileDataFixture();
        const expectedError = createHttpError(ERR_FILE_TYPE_NOT_ACCEPTED);
        expect(() => validateUploadFile({ file, sizeLimit: 100, acceptTypes: ['text/csv'] })).toThrow(expectedError);
      });
    });
  });
});
