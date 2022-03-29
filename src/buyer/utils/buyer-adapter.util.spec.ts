import { buyerAdapter } from '@/buyer/utils/buyer-adapter.util';
import { buyerFormattedItemFixture, buyerItemFixture } from '../fixtures/buyer.fixture';

describe('Suite Buyer Adapter', () => {
  describe('test buyerAdapter', () => {
    describe('success', () => {
      it('should return a formatted buyer', () => {
        const buyer = buyerAdapter(buyerItemFixture);
        expect(buyer).toEqual(buyerFormattedItemFixture);
      });
    });
  });
});
