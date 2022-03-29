export type CategoryDto = {
  id: number;
  name: string;
  description: string;
  status: boolean;
  deletedAt?: Date;
};

export type CategoryCreateDto = Omit<CategoryDto, 'id' | 'status'>;

export type CategoryStatusDto = Pick<CategoryDto, 'status'>;

export type CategoryComplementDto = Pick<CategoryDto, 'id' | 'name'>;
