import { AnySchema } from 'yup';
import { ReportCSV } from '../interfaces/csv.interface';
import { FileS3 } from '../interfaces/file.interface';
import { ProcessorCsv } from '../interfaces/processor-csv.interface';
import { csvFileToData, dataToCSV, processCSV } from '../utils/csv/csv.util';
import { streamToBuffer } from '../utils/stream-to-buffer.util';
import { BaseService } from './base.service';

export abstract class BaseProcessService<TEntity, TDto extends TCreateDto, TCreateDto> implements ProcessorCsv {
  protected abstract schema: AnySchema;
  protected abstract csvHeaders: Record<string, string>;
  protected abstract keyUnique: string;

  protected abstract service: BaseService<TEntity, TDto, TCreateDto>;

  protected async createOrUpdate(item: any) {
    this.schema.validateSync(item);

    const exists = await this.service.getOneByKey(this.keyUnique, item[this.keyUnique]);

    if (exists) {
      await this.service.update({ ...item }, exists['id']);
    } else {
      await this.service.create(item);
    }
  }

  normalize(item: any): TDto {
    return item;
  }

  async processCsvFile(file: FileS3): Promise<ReportCSV[]> {
    const items = await csvFileToData<TDto>({
      file,
      headers: this.csvHeaders,
      normalizeFunc: this.normalize.bind(this),
    });

    return processCSV<TDto>(items, this.createOrUpdate.bind(this));
  }

  async getCsvFile(): Promise<Buffer> {
    const items = await this.service.list();
    const stream = dataToCSV<TDto>(items, this.csvHeaders);
    const data = await streamToBuffer(stream);
    return data;
  }
}
