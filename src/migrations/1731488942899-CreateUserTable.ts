import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1731488942899 implements MigrationInterface {
    name = 'CreateUserTable1731488942899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("userId" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "age" integer NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
