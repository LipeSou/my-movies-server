import { MigrationInterface, QueryRunner } from "typeorm";

export class CriaRelacionamentoUsuarioComWatchlistConvencao1735932966668 implements MigrationInterface {
    name = 'CriaRelacionamentoUsuarioComWatchlistConvencao1735932966668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "watchlists" DROP CONSTRAINT "FK_4ee2b11c974ca3f516a391e1543"`);
        await queryRunner.query(`ALTER TABLE "watchlists" RENAME COLUMN "userId" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "watchlists" ADD CONSTRAINT "FK_3e8bccad3dcd75fa977892c54bb" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "watchlists" DROP CONSTRAINT "FK_3e8bccad3dcd75fa977892c54bb"`);
        await queryRunner.query(`ALTER TABLE "watchlists" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "watchlists" ADD CONSTRAINT "FK_4ee2b11c974ca3f516a391e1543" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
