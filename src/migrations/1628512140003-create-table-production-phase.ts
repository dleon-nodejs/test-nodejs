import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableProductionPhase1628512140003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS production_phase (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(20) NOT NULL UNIQUE,
        description VARCHAR(140),
        status BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS production_phase
    `);
  }
}
