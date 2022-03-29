export interface BaseRepository<TEntity, TDto, TCreateDto> {
  create: (params: TCreateDto) => Promise<void>;
  findAll: (filter: Record<string, any>) => Promise<TEntity[]>;
  update: (params: TDto, id: number) => Promise<void>;
  findById: (id: number) => Promise<TEntity>;
  findByActive?: () => Promise<TEntity[]>;
  findOneByKey: (key: string, value: any) => Promise<TEntity>;
  changeStatus: (id: number, status: boolean) => Promise<void>;
}
