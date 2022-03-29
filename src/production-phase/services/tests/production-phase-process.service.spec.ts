import { ProductionPhaseProcessService } from '../production-phase-process.service';

describe('Suite ProductionPhase Process Service', () => {
  it('should defined service ', () => {
    const service = new ProductionPhaseProcessService();
    expect(service).toBeDefined();
  });
});
