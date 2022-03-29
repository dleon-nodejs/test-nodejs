import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableProvider1630607127539 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
          CREATE TABLE IF NOT EXISTS provider(
            id INT AUTO_INCREMENT PRIMARY KEY,
            code_erp VARCHAR(10) NOT NULL UNIQUE,
            name VARCHAR(80) NOT NULL,
            document VARCHAR(40) NOT NULL UNIQUE,
            foreign_document BOOLEAN,
            lead_time_day SMALLINT DEFAULT 0,
            CONSTRAINT lead_time_day_provider CHECK(
                lead_time_day > 0 OR lead_time_day = 0
                AND lead_time_day < 999 OR lead_time_day = 999
              ),
            shipping enum('cif', 'fob') DEFAULT 'cif',
            INDEX (shipping),
            contact VARCHAR(80),
            phone VARCHAR(80) NOT NULL,
            email VARCHAR(80),
            region VARCHAR(80) NOT NULL,
            payment_term VARCHAR(80),
            payment_method VARCHAR(80),
            ipi DOUBLE DEFAULT 0,
            CONSTRAINT ipi_value CHECK(
                ipi > 0 OR ipi = 0
                AND ipi < 99.99 OR ipi = 99.99
              ),
            icms DOUBLE DEFAULT 0,
            CONSTRAINT icms_value CHECK(
                icms > 0 OR icms = 0
                AND icms < 99.99 OR icms = 99.99
              ),
            bank VARCHAR(80),
            branch VARCHAR(80),
            account VARCHAR(80),
            status BOOLEAN DEFAULT true,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            deleted_at TIMESTAMP NULL
          )`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
          DROP TABLE IF EXISTS provider
      `
    );
  }
}
