import { purchaseUnitFormattedItemFixture, purchaseUnitItemFixture } from '@/purchase-unit/fixtures/purchase-unit.fixture';
import { PurchaseUnitService } from '../purchase-unit.service';

const findByRepositoryMock = jest.fn();
jest.mock('../../repositories/purchase-unit.repository', () => {
  return {
    PurchaseUnitRepository: function () {
      return {
        findById: findByRepositoryMock,
      };
    },
  };
});

describe('Suite PurchaseUnit Service', () => {
  it('should defined service ', () => {
    const service = new PurchaseUnitService();
    expect(service).toBeDefined();
  });

  it('should called adapter method ', async () => {
    const service = new PurchaseUnitService();
    expect(service).toBeDefined();

    findByRepositoryMock.mockResolvedValue(purchaseUnitItemFixture);
    const result = await service.getById(1);
    expect(result).toEqual(purchaseUnitFormattedItemFixture);
  });
});
