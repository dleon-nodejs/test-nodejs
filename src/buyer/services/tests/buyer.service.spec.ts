import { buyerFormattedItemFixture, buyerItemFixture } from '@/buyer/fixtures/buyer.fixture';
import { BuyerService } from '../buyer.service';

const findByRepositoryMock = jest.fn();
jest.mock('../../repositories/buyer.repository', () => {
  return {
    BuyerRepository: function () {
      return {
        findById: findByRepositoryMock,
      };
    },
  };
});

describe('Suite Buyer Service', () => {
  it('should defined service ', () => {
    const service = new BuyerService();
    expect(service).toBeDefined();
  });

  it('should called adapter method ', async () => {
    const service = new BuyerService();
    expect(service).toBeDefined();

    findByRepositoryMock.mockResolvedValue(buyerItemFixture);
    const result = await service.getById(1);
    expect(result).toEqual(buyerFormattedItemFixture);
  });
});
