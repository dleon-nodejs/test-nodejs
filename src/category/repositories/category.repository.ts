import { EntityNotFoundError, UpdateResult, Like } from 'typeorm';

import { CategoryDto } from '@/category/types/category.type';
import { Category } from '@/category/entities/category.entity';
import { CategoryCreateDto } from '@/category/types/category.type';
import { BaseRepository } from '@/shared/interfaces/base-repository.interface';
import { DecorateAll } from 'decorate-all';
import { DbCatch } from '@/shared/decorators/db-catch.decorator';

@DecorateAll(DbCatch)
export class CategoryRepository implements BaseRepository<Category, CategoryDto, CategoryCreateDto> {
  async create(params: CategoryCreateDto): Promise<void> {
    await Category.create(params).save();
  }

  async findAll({ name }: { name: string }): Promise<Category[]> {
    const filterByName = {
      where: {
        name: Like(`%${name}%`),
      },
    };
    const filter = name ? filterByName : {};
    const categories: Category[] = await Category.find(filter);
    return categories;
  }

  async findByActive(): Promise<Category[]> {
    const categories: Category[] = await Category.find({ where: { status: true } });
    return categories;
  }

  async findById(id: number): Promise<Category> {
    const category = await Category.findOneOrFail(id);
    return category;
  }

  async findOneByKey(key: string, value: any): Promise<Category> {
    const category = await Category.findOne({ where: { [key]: value } });
    return category;
  }

  async getByName(name: string): Promise<Category> {
    const category = Category.findOne({ where: { name } });
    return category;
  }

  async update(params: CategoryDto, id: number): Promise<void> {
    const category: UpdateResult = await Category.update(id, params);
    if (category.affected === 0) {
      throw new EntityNotFoundError(Category, id);
    }
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    const category: UpdateResult = await Category.update(id, { status });
    if (category.affected === 0) {
      throw new EntityNotFoundError(Category, id);
    }
  }
}
