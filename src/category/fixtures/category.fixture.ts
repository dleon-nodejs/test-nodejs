import { Category } from '@/category/entities/category.entity';
import { CategoryDto } from '@/category/types/category.type';

export const categoryItemFixture: Category = {
  id: 1,
  name: 'Tecido',
  description: 'Tecido de algodão',
  status: true,
  createdAt: new Date(8, 13, 2021),
  updatedAt: new Date(8, 13, 2021),
} as Category;

export const categoryFormattedItemFixture: CategoryDto = {
  id: 1,
  name: 'Tecido',
  description: 'Tecido de algodão',
  status: true,
};
