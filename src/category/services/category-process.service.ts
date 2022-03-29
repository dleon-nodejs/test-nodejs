import { BaseProcessService } from '@/shared/services/base-process.service';
import { CATEGORY_CSV_FIELDS } from '../config/category.config';
import { Category } from '../entities/category.entity';
import { categorySchema } from '../functions/schema/category.schema';
import { CategoryCreateDto, CategoryDto } from '../types/category.type';
import { CategoryService } from './category.service';

export class CategoryProcessService extends BaseProcessService<Category, CategoryDto, CategoryCreateDto> {
  protected schema = categorySchema;
  protected csvHeaders = CATEGORY_CSV_FIELDS;
  protected keyUnique = 'name';
  protected service = new CategoryService();
}
