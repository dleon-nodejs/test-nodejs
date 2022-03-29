import { FileS3 } from './file.interface';

export type CsvToDataParams<T extends unknown> = {
  file: FileS3;
  headers: Record<string, string>;
  normalizeFunc?: (row) => T;
};

export type ReportCSV = {
  line: number;
  error: string;
};
