import { BuyerCreateDto } from '@/buyer/types/buyer.type';

export const buyerCreateMock: BuyerCreateDto = {
  name: 'João',
  email: 'joao@email.com',
  phone: '1195554444',
};

export const buyerCreateWithoutPhoneMock: BuyerCreateDto = {
  name: 'João',
  email: 'joao@email.com',
};
