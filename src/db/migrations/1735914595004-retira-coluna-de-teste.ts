import { MigrationInterface, QueryRunner } from 'typeorm';

export class RetiraColunaDeTeste1735914595004 implements MigrationInterface {
  name = 'RetiraColunaDeTeste1735914595004';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "watchlist_items" DROP COLUMN "tmdb_id2"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "watchlist_items" ADD "tmdb_id2" integer NOT NULL`,
    );
  }
}
