import { Category } from '@/category/entities/category.entity';
import { CategoryDto } from '@/category/types/category.type';

export function categoryAdapter(category: Category): CategoryDto {
  const formattedCategory: CategoryDto = {
    id: category.id,
    name: category.name,
    description: category.description || '',
    status: category.status,
    deletedAt: category.deletedAt,
  };

  return formattedCategory;
}
