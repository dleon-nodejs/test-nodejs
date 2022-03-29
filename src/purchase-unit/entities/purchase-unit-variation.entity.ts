import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PurchaseUnit } from './purchase-unit.entity';

@Entity()
export class PurchaseUnitVariation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  variation: string;

  @Column({ name: 'purchase_unit_id' })
  purchaseUnitId: number;

  @ManyToOne(() => PurchaseUnit, (purchaseUnit) => purchaseUnit.variations)
  @JoinColumn({ name: 'purchase_unit_id' })
  purchaseUnit;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
