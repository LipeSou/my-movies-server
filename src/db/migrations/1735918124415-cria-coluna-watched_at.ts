import { MigrationInterface, QueryRunner } from "typeorm";

export class CriaColunaWatchedAt1735918124415 implements MigrationInterface {
    name = 'CriaColunaWatchedAt1735918124415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "watchlist_items" ADD "watched_at" TIMESTAMP DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "watchlist_items" DROP COLUMN "watched_at"`);
    }

}
