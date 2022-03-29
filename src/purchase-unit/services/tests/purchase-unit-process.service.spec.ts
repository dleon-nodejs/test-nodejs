import { PurchaseUnitProcessService } from '../purchase-unit-process.service';

describe('Suite Category Process Service', () => {
  it('should defined service ', () => {
    const service = new PurchaseUnitProcessService();
    expect(service).toBeDefined();
  });
});
