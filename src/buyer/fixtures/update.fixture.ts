import { BuyerDto } from '@/buyer/types/buyer.type';

export const buyerUpdateMock: BuyerDto = {
  id: 1,
  name: 'João',
  email: 'joao@email.com',
  phone: '11988887777',
  status: true,
};

export const buyerUpdateWithoutPhoneMock: BuyerDto = {
  id: 1,
  name: 'João',
  email: 'joao@email.com',
  status: true,
};

export const buyerUpdateIdMock = 1;

export const buyerInvalidIdUpdateMock = Number('number123');
