import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterTablePurchaseUnitAddStatusField1628273839826 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE purchase_unit ADD COLUMN status BOOLEAN DEFAULT true
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE purchase_unit DROP COLUMN status;
      `);
  }
}
