import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTablePurchaseUnitVariation1627252499627 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS purchase_unit_variation (
        id INT AUTO_INCREMENT PRIMARY KEY,
        purchase_unit_id INT NOT NULL,
        variation VARCHAR(50) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_purchase_unit_id
        FOREIGN KEY (purchase_unit_id)
        REFERENCES purchase_unit(id)
          ON UPDATE CASCADE
          ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS purchase_unit_variation
    `);
  }
}
