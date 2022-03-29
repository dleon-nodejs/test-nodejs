import { categoryFormattedItemFixture, categoryItemFixture } from '../fixtures/category.fixture';
import { CategoryDto } from '@/category/types/category.type';
import { categoryAdapter } from '@/category/utils/category-adapter.util';

describe('Suite Category Adapter Util', () => {
  describe('test categoryAdapter', () => {
    describe('success', () => {
      it('should return an adapted category', () => {
        const category: CategoryDto = categoryAdapter(categoryItemFixture);
        expect(category).toEqual(categoryFormattedItemFixture);
      });
    });
  });
});
