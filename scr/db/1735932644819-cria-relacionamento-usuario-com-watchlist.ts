import { MigrationInterface, QueryRunner } from "typeorm";

export class CriaRelacionamentoUsuarioComWatchlist1735932644819 implements MigrationInterface {
    name = 'CriaRelacionamentoUsuarioComWatchlist1735932644819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "watchlists" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "watchlists" ADD CONSTRAINT "FK_4ee2b11c974ca3f516a391e1543" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "watchlists" DROP CONSTRAINT "FK_4ee2b11c974ca3f516a391e1543"`);
        await queryRunner.query(`ALTER TABLE "watchlists" DROP COLUMN "userId"`);
    }

}
