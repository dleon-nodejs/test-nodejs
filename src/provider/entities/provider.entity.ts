import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Shipping } from '../config/provider.enum';
import { ProviderComplement } from './provider-complement.entity';

@Entity()
export class Provider extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'code_erp' })
  codeErp: string;

  @Column()
  name: string;

  @Column()
  document: string;

  @Column({ name: 'foreign_document' })
  foreignDocument: boolean;

  @Column({ name: 'lead_time_day' })
  leadTimeDay: number;

  @Column({
    type: 'enum',
    enum: Shipping,
  })
  shipping: Shipping;

  @OneToMany(() => ProviderComplement, (complements) => complements.provider, { cascade: ['insert', 'update', 'soft-remove'] })
  complements: ProviderComplement[];

  @Column()
  contact: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  region: string;

  @Column({ name: 'payment_term' })
  paymentTerm: string;

  @Column({ name: 'payment_method' })
  paymentMethod: string;

  @Column()
  ipi: number;

  @Column()
  icms: number;

  @Column()
  bank: string;

  @Column()
  branch: string;

  @Column()
  account: string;

  @Column()
  status: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
