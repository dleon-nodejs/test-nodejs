import { phoneAdpatedMock, phoneMock } from '../fixtures/phone-only-numbers.fixture';
import { phoneOnlyNumbers } from './phone-only-numbers.util';

describe('Suite Phone Adpater Util', () => {
  describe('test phoneOnlyNumbers', () => {
    describe('success', () => {
      it('should return a phone with only numbers', () => {
        const phone = phoneOnlyNumbers(phoneMock);
        expect(phone).toEqual(phoneAdpatedMock);
      });
    });
  });
});
