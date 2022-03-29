import { Buyer } from '@/buyer/entities/buyer.entity';

export const buyerItemMock: Buyer = {
  id: 1,
  name: 'João',
  email: 'joao@email.com',
  phone: '11988887777',
  status: true,
  createdAt: new Date(8, 11, 2021),
  updatedAt: new Date(8, 11, 2021),
} as Buyer;

export const buyerNameMock = 'João';
