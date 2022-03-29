import { categoryFormattedItemFixture, categoryItemFixture } from '@/category/fixtures/category.fixture';
import { CategoryService } from '../category.service';

const findByRepositoryMock = jest.fn();
jest.mock('../../repositories/category.repository', () => {
  return {
    CategoryRepository: function () {
      return {
        findById: findByRepositoryMock,
      };
    },
  };
});

describe('Suite Category Service', () => {
  it('should defined service ', () => {
    const service = new CategoryService();
    expect(service).toBeDefined();
  });

  it('should called adapter method ', async () => {
    const service = new CategoryService();
    expect(service).toBeDefined();

    findByRepositoryMock.mockResolvedValue(categoryItemFixture);
    const result = await service.getById(1);
    expect(result).toEqual(categoryFormattedItemFixture);
  });
});
