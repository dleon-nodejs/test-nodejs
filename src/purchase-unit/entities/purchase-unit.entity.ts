import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PurchaseUnitVariation } from './purchase-unit-variation.entity';

@Entity()
export class PurchaseUnit extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => PurchaseUnitVariation, (variations) => variations.purchaseUnit, { cascade: ['insert', 'update', 'soft-remove'] })
  variations: PurchaseUnitVariation[];

  @Column()
  status: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
