import { BaseService } from '@/shared/services/base.service';
import { Category } from '@/category/entities/category.entity';
import { CategoryCreateDto, CategoryDto } from '@/category/types/category.type';
import { categoryAdapter } from '@/category/utils/category-adapter.util';
import { CategoryRepository } from '../repositories/category.repository';
import { DecorateAll } from 'decorate-all';
import { EntityCatch } from '@/shared/decorators/entity-catch.decorator';
import { ERR_CATEGORY_DUPLICATE, ERR_CATEGORY_NOT_EXISTS } from '../config/category.config';

@DecorateAll(
  EntityCatch({
    notExists: ERR_CATEGORY_NOT_EXISTS,
    duplicate: ERR_CATEGORY_DUPLICATE,
  }),
  { deep: true, exclude: ['adapter'] }
)
export class CategoryService extends BaseService<Category, CategoryDto, CategoryCreateDto> {
  protected repository = new CategoryRepository();

  public adapter(item: Category): CategoryDto {
    return categoryAdapter(item);
  }
}
