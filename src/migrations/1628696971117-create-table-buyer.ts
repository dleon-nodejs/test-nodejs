import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableBuyer1628696971117 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
          CREATE TABLE IF NOT EXISTS buyer (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(80) NOT NULL,
            email VARCHAR(80) NOT NULL UNIQUE,
            phone VARCHAR(11) UNIQUE,
            status BOOLEAN DEFAULT true,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            deleted_at TIMESTAMP NULL
          )
        `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        DROP TABLE IF EXISTS buyer
      `
    );
  }
}
