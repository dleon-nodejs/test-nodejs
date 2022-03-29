import { ReportCSV } from './csv.interface';
import { FileS3 } from './file.interface';

export interface ProcessorCsv {
  processCsvFile(file: FileS3): Promise<ReportCSV[]>;
  getCsvFile(): Promise<Buffer>;
}
