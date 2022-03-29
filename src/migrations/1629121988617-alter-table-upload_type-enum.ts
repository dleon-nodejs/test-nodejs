import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterTableUploadTypeEnum1629121988617 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
          ALTER TABLE document_upload MODIFY COLUMN upload_type enum(
            'unknownType','purchaseUnit','productionPhase','buyer','category'
          )
        `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        ALTER TABLE document_upload MODIFY COLUMN upload_type enum(
          'unknownType','purchaseUnit'
        )
      `
    );
  }
}
