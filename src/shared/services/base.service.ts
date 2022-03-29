import { ERR_INVALID_ID } from '../errors/app.error';
import { BaseRepository } from '../interfaces/base-repository.interface';
import { throwError } from '../utils/throw-error.util';

export abstract class BaseService<TEntity, TDto, TCreateDto> {
  protected abstract repository: BaseRepository<TEntity, TDto, TCreateDto>;

  async create(params: TCreateDto): Promise<void> {
    await this.repository.create(params);
  }

  async list(name?: string): Promise<TDto[]> {
    const results = await this.repository.findAll({ name });
    return results.map(this.adapter);
  }

  async getById(id: number): Promise<TDto> {
    if (Number.isNaN(id)) {
      throwError(ERR_INVALID_ID);
    }
    const result = await this.repository.findById(id);
    return result ? this.adapter(result) : undefined;
  }
  public async listActive(): Promise<TDto[]> {
    const categories = await this.repository.findByActive();
    return categories.map(this.adapter);
  }

  async getOneByKey(key: string, value: any): Promise<TDto> {
    const result = await this.repository.findOneByKey(key, value);
    return result ? this.adapter(result) : undefined;
  }

  abstract adapter(item: TEntity): TDto;

  async update(params: TDto, id: number): Promise<void> {
    if (Number.isNaN(id)) {
      throwError(ERR_INVALID_ID);
    }
    await this.repository.update(params, id);
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    if (Number.isNaN(id)) {
      throwError(ERR_INVALID_ID);
    }
    await this.repository.changeStatus(id, status);
  }
}
