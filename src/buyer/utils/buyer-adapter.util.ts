import { Buyer } from '@/buyer/entities/buyer.entity';
import { BuyerDto } from '@/buyer/types/buyer.type';

export function buyerAdapter(buyer: Buyer): BuyerDto {
  const formattedList: BuyerDto = {
    id: buyer.id,
    name: buyer.name,
    email: buyer.email,
    phone: buyer.phone || '',
    status: buyer.status,
    deletedAt: buyer.deletedAt || undefined,
  };
  return formattedList;
}
