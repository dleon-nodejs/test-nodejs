import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ComplementType } from '../config/provider-complement.enum';
import { Provider } from './provider.entity';

@Entity()
export class ProviderComplement extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'provider_id' })
  providerId: number;

  @ManyToOne(() => Provider, (provider) => provider.complements)
  @JoinColumn({ name: 'provider_id' })
  provider;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ComplementType,
  })
  type: ComplementType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
