import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterTableUploadTypeAddMaterialEnum1629399213446 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
          ALTER TABLE document_upload MODIFY COLUMN upload_type enum(
            'unknownType','purchaseUnit','productionPhase','buyer','category','material'
          )
        `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            ALTER TABLE document_upload MODIFY COLUMN upload_type enum(
              'unknownType','purchaseUnit','productionPhase','buyer','category'
            )
          `
    );
  }
}
