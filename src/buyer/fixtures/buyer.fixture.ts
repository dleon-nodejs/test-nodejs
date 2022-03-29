import { Buyer } from '@/buyer/entities/buyer.entity';
import { BuyerDto } from '@/buyer/types/buyer.type';

export const buyerItemFixture: Buyer = {
  id: 1,
  name: 'João',
  email: 'joao@email.com',
  phone: '11988887777',
  status: true,
  createdAt: new Date(8, 11, 2021),
  updatedAt: new Date(8, 11, 2021),
} as Buyer;

export const buyerFormattedItemFixture: BuyerDto = {
  id: 1,
  name: 'João',
  email: 'joao@email.com',
  phone: '11988887777',
  status: true,
};
