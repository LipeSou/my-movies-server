import { MigrationInterface, QueryRunner } from 'typeorm';

export class CriaTabelas1735914166738 implements MigrationInterface {
  name = 'CriaTabelas1735914166738';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "watchlist_items" ADD "tmdb_id2" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "watchlist_items" DROP COLUMN "tmdb_id2"`,
    );
  }
}
