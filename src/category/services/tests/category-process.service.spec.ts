import { CategoryProcessService } from '../category-process.service';

describe('Suite Category Process Service', () => {
  it('should defined service ', () => {
    const service = new CategoryProcessService();
    expect(service).toBeDefined();
  });
});
