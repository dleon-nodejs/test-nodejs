import { Buyer } from '@/buyer/entities/buyer.entity';
import { Category } from '@/category/entities/category.entity';
import { ProductionPhase } from '@/production-phase/entities/production-phase.entity';
import { PurchaseUnit } from '@/purchase-unit/entities/purchase-unit.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Material extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ name: 'purchase_unit_id' })
  purchaseUnitId: number;

  @Column({ name: 'production_phase_id' })
  productionPhaseId: number;

  @Column({ name: 'category_id' })
  categoryId: number;

  @Column({ name: 'buyer_id' })
  buyerId: number;

  @ManyToOne(() => PurchaseUnit, (purchaseUnit) => purchaseUnit.id)
  @JoinColumn({ name: 'purchase_unit_id' })
  purchaseUnit;

  @ManyToOne(() => ProductionPhase, (productionPhase) => productionPhase.id)
  @JoinColumn({ name: 'production_phase_id' })
  productionPhase;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'category_id' })
  category;

  @ManyToOne(() => Buyer, (buyer) => buyer.id)
  @JoinColumn({ name: 'buyer_id' })
  buyer;

  @Column({ name: 'lead_time_day' })
  leadTimeDay: number;

  @Column()
  price: number;

  @Column({ name: 'price_service' })
  priceService: number;

  @Column({ name: 'date_price' })
  datePrice: Date;

  @Column()
  verifiable: boolean;

  @Column()
  status: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
