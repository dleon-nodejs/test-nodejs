import { CsvToDataParams, ReportCSV } from '@/shared/interfaces/csv.interface';
import { format } from '@fast-csv/format';
import { parseString } from '@fast-csv/parse';

export function dataToCSV<T>(data: T[] = [], headers: Record<string, string>) {
  const headersTitles = Object.values(headers);
  const fields = Object.keys(headers);

  const csvStream = format({
    headers: headersTitles,
  });

  data.forEach((item) => {
    const row = fields.map((field) => item[field]);
    csvStream.write(row);
  });
  csvStream.end();

  return csvStream;
}

export function csvFileToData<T>({ file, headers, normalizeFunc }: CsvToDataParams<T>): Promise<T[]> {
  const data = file.content.toString('utf-8');
  const fields = Object.keys(headers);

  return new Promise((resolve, reject) => {
    const rows: T[] = [];
    parseString(data, { headers: fields, renameHeaders: true })
      .on('data', (row) => {
        let newRow = { ...row };
        if (normalizeFunc) {
          newRow = normalizeFunc(newRow);
        }
        rows.push(newRow);
      })
      .on('error', (err) => reject(err))
      .on('end', () => {
        resolve(rows);
      });
  });
}

export async function processCSV<T>(data: T[], callback: (item: T) => void): Promise<ReportCSV[]> {
  const reports = [];
  let index = 1;
  for (const item of data) {
    let error = null;
    try {
      await callback(item);
    } catch (err) {
      console.log(err);
      const { errors, message } = err;
      if (errors?.join) {
        error = errors.join(', ');
      } else {
        error = message;
      }
    } finally {
      reports.push({
        line: index++,
        error,
      });
    }
  }
  return reports;
}
