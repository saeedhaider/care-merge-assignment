import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexForAgeNameColumnsUserTable1731492008168 implements MigrationInterface {
    name = 'AddIndexForAgeNameColumnsUserTable1731492008168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "idx_user_age" ON "user" ("age") `);
        await queryRunner.query(`CREATE INDEX "idx_user_age_name" ON "user" ("age", "name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_user_age_name"`);
        await queryRunner.query(`DROP INDEX "public"."idx_user_age"`);
    }

}
