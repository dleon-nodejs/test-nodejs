import { BaseService } from '@/shared/services/base.service';

import { Buyer } from '@/buyer/entities/buyer.entity';
import { BuyerCreateDto, BuyerDto } from '@/buyer/types/buyer.type';
import { buyerAdapter } from '@/buyer/utils/buyer-adapter.util';
import { BuyerRepository } from '@/buyer/repositories/buyer.repository';
import { DecorateAll } from 'decorate-all';
import { EntityCatch } from '@/shared/decorators/entity-catch.decorator';
import { ERR_BUYER_DUPLICATE, ERR_BUYER_NOT_EXISTS } from '../config/buyer.config';

@DecorateAll(
  EntityCatch({
    notExists: ERR_BUYER_NOT_EXISTS,
    duplicate: ERR_BUYER_DUPLICATE,
  }),
  { deep: true, exclude: ['adapter'] }
)
export class BuyerService extends BaseService<Buyer, BuyerDto, BuyerCreateDto> {
  protected repository = new BuyerRepository();
  public async listActive(): Promise<BuyerDto[]> {
    const buyers = await this.repository.findByActive();
    return buyers.map(this.adapter);
  }
  public adapter(item: Buyer): BuyerDto {
    return buyerAdapter(item);
  }
}
