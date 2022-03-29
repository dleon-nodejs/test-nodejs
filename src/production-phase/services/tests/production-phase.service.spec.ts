import { productionPhaseFormattedItemFixture, productionPhaseItemFixture } from '@/production-phase/fixtures/production-phase.fixture';
import { ProductionPhaseService } from '../production-phase.service';

const findByRepositoryMock = jest.fn();
jest.mock('../../repositories/production-phase.repository', () => {
  return {
    ProductionPhaseRepository: function () {
      return {
        findById: findByRepositoryMock,
      };
    },
  };
});

describe('Suite ProductionPhase Service', () => {
  it('should defined service ', () => {
    const service = new ProductionPhaseService();
    expect(service).toBeDefined();
  });

  it('should called adapter method ', async () => {
    const service = new ProductionPhaseService();
    expect(service).toBeDefined();

    findByRepositoryMock.mockResolvedValue(productionPhaseItemFixture);
    const result = await service.getById(1);
    expect(result).toEqual(productionPhaseFormattedItemFixture);
  });
});
