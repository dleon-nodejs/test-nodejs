import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { DocumentStatus, UploadType } from '@/document-upload/config/document-upload.enum';

@Entity()
export class DocumentUpload extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'file_name' })
  fileName: string;

  @Column({
    type: 'enum',
    enum: DocumentStatus,
    default: 0,
  })
  status: DocumentStatus;

  @Column({
    name: 'upload_type',
    type: 'enum',
    enum: UploadType,
    default: 0,
  })
  uploadType: UploadType;

  @Column('simple-json')
  logs;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
