import { BuyerProcessService } from '../buyer-process.service';

describe('Suite Buyer Process Service', () => {
  it('should defined service ', () => {
    const service = new BuyerProcessService();
    expect(service).toBeDefined();
  });
});
