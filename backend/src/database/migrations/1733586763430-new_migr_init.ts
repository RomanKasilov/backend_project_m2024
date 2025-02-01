import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrInit1733586763430 implements MigrationInterface {
    name = 'NewMigrInit1733586763430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "refreshToken" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cars" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "trader_id" uuid NOT NULL, "brand" text NOT NULL, "model" text NOT NULL, "price" numeric NOT NULL, "location" text, "description" text NOT NULL, "carImage" text, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trader_profile" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "company" text, "user_id" uuid NOT NULL, CONSTRAINT "REL_206933d93ddf86cebc00271487" UNIQUE ("user_id"), CONSTRAINT "PK_7eb190ee1bb3d0082cfe2dba762" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_account_enum" AS ENUM('basic', 'premium')`);
        await queryRunner.query(`CREATE TABLE "users" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "name" text NOT NULL, "password" text NOT NULL, "account" "public"."users_account_enum" NOT NULL DEFAULT 'basic', "phone" integer NOT NULL, "avatar" text, "isBanned" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "currency" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "buyValue" numeric NOT NULL, "sellValue" numeric NOT NULL, CONSTRAINT "PK_3cda65c731a6264f0e444cc9b91" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car_brands" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brandName" text NOT NULL, CONSTRAINT "PK_6a4e2f9b03d554f40b91f4f289a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car_models" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "modelName" text NOT NULL, "brand_id" uuid NOT NULL, CONSTRAINT "PK_ee4355345e0e1c18cb6efa2bd5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "FK_a969861629af37cd1c7f4ff3e6b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_3f65fcb49fa12dd9cdae71315d7" FOREIGN KEY ("trader_id") REFERENCES "trader_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trader_profile" ADD CONSTRAINT "FK_206933d93ddf86cebc00271487e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car_models" ADD CONSTRAINT "FK_9a3830bccf83d0cfdb449ebcea4" FOREIGN KEY ("brand_id") REFERENCES "car_brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car_models" DROP CONSTRAINT "FK_9a3830bccf83d0cfdb449ebcea4"`);
        await queryRunner.query(`ALTER TABLE "trader_profile" DROP CONSTRAINT "FK_206933d93ddf86cebc00271487e"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_3f65fcb49fa12dd9cdae71315d7"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "FK_a969861629af37cd1c7f4ff3e6b"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4"`);
        await queryRunner.query(`DROP TABLE "car_models"`);
        await queryRunner.query(`DROP TABLE "car_brands"`);
        await queryRunner.query(`DROP TABLE "currency"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_account_enum"`);
        await queryRunner.query(`DROP TABLE "trader_profile"`);
        await queryRunner.query(`DROP TABLE "cars"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
    }

}
