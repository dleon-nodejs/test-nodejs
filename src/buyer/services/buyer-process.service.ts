import { BaseProcessService } from '@/shared/services/base-process.service';
import { BUYER_CSV_FIELDS } from '../config/buyer.config';
import { Buyer } from '../entities/buyer.entity';
import { buyerSchema } from '../functions/schema/buyer.schema';
import { BuyerCreateDto, BuyerDto } from '../types/buyer.type';
import { BuyerService } from './buyer.service';

export class BuyerProcessService extends BaseProcessService<Buyer, BuyerDto, BuyerCreateDto> {
  protected schema = buyerSchema;
  protected csvHeaders = BUYER_CSV_FIELDS;
  protected keyUnique = 'email';
  protected service = new BuyerService();
}
