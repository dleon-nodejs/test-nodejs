import {
  formattedCsvFixture,
  headersCsvFixture,
  processCsvErrorWithErrorsFixture,
  processCsvErrorWithMessageFixture,
  dataProcessReportFixture,
  dataToProcessFixture,
  dataListFixture,
  dataListUpperCaseFixture,
  rowToUppercaseFixture,
} from '@/shared/fixtures/utils/csv/csv.fixture';
import { createFileFixture } from '@/shared/fixtures/utils/file/file.fixture';
import { streamToBuffer } from '../stream-to-buffer.util';
import { csvFileToData, dataToCSV, processCSV } from './csv.util';

describe('Suite csv.util', () => {
  describe('tests dataToCSV', () => {
    it('should return csv with 2 columns and 2 lines', async () => {
      const stream = dataToCSV<unknown>(dataListFixture, headersCsvFixture);
      const data = (await streamToBuffer(stream)).toString();
      expect(data).toEqual(formattedCsvFixture);
    });

    it('should return empty if not pass data', async () => {
      const stream = dataToCSV<unknown>(undefined, headersCsvFixture);
      const data = (await streamToBuffer(stream)).toString();
      expect(data).toEqual('');
    });
  });

  describe('tests csvFileToData', () => {
    it('should return data from csv with 2 columns and 2 lines', async () => {
      const file = createFileFixture({
        content: Buffer.from(formattedCsvFixture),
      });

      const data = await csvFileToData({
        file,
        headers: headersCsvFixture,
      });
      expect(data).toEqual(dataListFixture);
    });

    it('should return data from csv transformed in uppercase', async () => {
      const file = createFileFixture({
        content: Buffer.from(formattedCsvFixture),
      });

      const data = await csvFileToData({
        file,
        headers: headersCsvFixture,
        normalizeFunc: rowToUppercaseFixture,
      });
      expect(data).toEqual(dataListUpperCaseFixture);
    });
  });

  describe('test processCSV', () => {
    it('should return report with results of process', async () => {
      const callback = jest.fn();
      callback
        .mockResolvedValueOnce((x) => x)
        .mockRejectedValueOnce(processCsvErrorWithMessageFixture)
        .mockRejectedValueOnce(processCsvErrorWithErrorsFixture);

      const result = await processCSV(dataToProcessFixture, callback);
      expect(result).toEqual(dataProcessReportFixture);
      expect(callback).toHaveBeenCalledWith(dataToProcessFixture[0]);
      expect(callback).toHaveBeenCalledWith(dataToProcessFixture[1]);
      expect(callback).toHaveBeenCalledWith(dataToProcessFixture[2]);
      expect(callback).not.toHaveBeenCalledWith(dataToProcessFixture[3]);
      expect(callback).toHaveBeenCalledTimes(dataToProcessFixture.length);
    });
  });
});
