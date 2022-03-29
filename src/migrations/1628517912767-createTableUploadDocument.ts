import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableUploadDocument1628517912767 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS document_upload (
        id INT AUTO_INCREMENT PRIMARY KEY,
        file_name VARCHAR(500) NOT NULL,
        status enum('unprocessed','success','processedWithErrors','error') DEFAULT 'unprocessed',
        INDEX (status),
        upload_type enum('unknownType','purchaseUnit') DEFAULT 'unknownType',
        INDEX (upload_type),
        logs JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS document_upload
    `);
  }
}
