import { Buyer } from '@/buyer/entities/buyer.entity';
import { BuyerDto } from '@/buyer/types/buyer.type';

export const buyerListMock: Buyer[] = [
  {
    id: 1,
    name: 'João',
    email: 'joao@email.com',
    phone: '1198888555',
    status: true,
    createdAt: new Date(8, 11, 2021),
    updatedAt: new Date(8, 11, 2021),
  } as Buyer,
  {
    id: 2,
    name: 'Maria',
    email: 'maria@email.com',
    phone: '1199999222',
    status: true,
    createdAt: new Date(8, 11, 2021),
    updatedAt: new Date(8, 11, 2021),
  } as Buyer,
];

export const buyerListFormattedMock: BuyerDto[] = [
  {
    id: 1,
    name: 'João',
    email: 'joao@email.com',
    phone: '1198888555',
    status: true,
  },
  {
    id: 2,
    name: 'Maria',
    email: 'maria@email.com',
    phone: '1199999222',
    status: true,
  },
];

export const buyerListWithoutPhoneMock: Buyer[] = [
  {
    id: 1,
    name: 'João',
    email: 'joao@email.com',
    status: true,
    createdAt: new Date(8, 11, 2021),
    updatedAt: new Date(8, 11, 2021),
  } as Buyer,
  {
    id: 2,
    name: 'Maria',
    email: 'maria@email.com',
    status: true,
    createdAt: new Date(8, 11, 2021),
    updatedAt: new Date(8, 11, 2021),
  } as Buyer,
];

export const buyerListFormattedWithoutPhoneMock: BuyerDto[] = [
  {
    id: 1,
    name: 'João',
    email: 'joao@email.com',
    phone: '',
    status: true,
  },
  {
    id: 2,
    name: 'Maria',
    email: 'maria@email.com',
    phone: '',
    status: true,
  },
];

export const buyerNameMock = 'João';
export const buyerMock: Buyer[] = [
  {
    id: 1,
    name: 'João',
    email: 'joao@email.com',
    phone: '',
    status: true,
    createdAt: new Date(8, 11, 2021),
    updatedAt: new Date(8, 11, 2021),
  } as Buyer,
];

export const buyerFormattedMock: BuyerDto[] = [
  {
    id: 1,
    name: 'João',
    email: 'joao@email.com',
    phone: '',
    status: true,
  },
];
