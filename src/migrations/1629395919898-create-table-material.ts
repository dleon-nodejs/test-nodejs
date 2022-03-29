import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableMaterial1629395919898 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
          CREATE TABLE IF NOT EXISTS material(
            id INT AUTO_INCREMENT PRIMARY KEY,
            code VARCHAR(9) NOT NULL UNIQUE,
            name VARCHAR(80) NOT NULL UNIQUE,
            purchase_unit_id INT NOT NULL,
            production_phase_id INT NULL,
            category_id INT NOT NULL,
            lead_time_day SMALLINT DEFAULT 0,
            CONSTRAINT lead_time_day_value CHECK(
              lead_time_day > 0 OR lead_time_day = 0
              AND lead_time_day < 999 OR lead_time_day = 999
              ),
            buyer_id INT,
            verifiable BOOLEAN DEFAULT false,
            price DOUBLE DEFAULT 0,
            CONSTRAINT price_value CHECK(
              price > 0 OR price = 0
              AND price < 99999.99 OR price = 99999.99
              ),
            price_service DOUBLE DEFAULT 0,
            CONSTRAINT price_service_value CHECK(
              price_service > 0 OR price_service = 0
              AND price_service < 99999.99 OR price_service = 99999.99
              ),
            status BOOLEAN DEFAULT true,
            date_price TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            deleted_at TIMESTAMP NULL,

            CONSTRAINT fk_purchase_unit_material
            FOREIGN KEY (purchase_unit_id) REFERENCES purchase_unit(id)
              ON UPDATE CASCADE
              ON DELETE CASCADE,

            CONSTRAINT fk_production_phase_material
            FOREIGN KEY (production_phase_id) REFERENCES production_phase(id)
              ON UPDATE CASCADE
              ON DELETE CASCADE,

            CONSTRAINT fk_category_material
            FOREIGN KEY (category_id) REFERENCES category(id)
              ON UPDATE CASCADE
              ON DELETE CASCADE,

            CONSTRAINT fk_buyer_material
            FOREIGN KEY (buyer_id) REFERENCES buyer(id)
              ON UPDATE CASCADE
              ON DELETE CASCADE
          )
        `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `
        DROP TABLE IF EXISTS material
      `
    );
  }
}
