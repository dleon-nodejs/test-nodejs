import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableProviderComplement1630604907313 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
          CREATE TABLE IF NOT EXISTS provider_complement(
            id INT AUTO_INCREMENT PRIMARY KEY,
            provider_id INT NOT NULL,
            name VARCHAR(80),
            type enum('brand', 'product') NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_provider_id
            FOREIGN KEY (provider_id) REFERENCES provider(id)
              ON UPDATE CASCADE
              ON DELETE CASCADE,
            CONSTRAINT uk_provider_id_name UNIQUE KEY (provider_id, name, type)
          )
        `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      DROP TABLE IF EXISTS provider_complement
      `
    );
  }
}
