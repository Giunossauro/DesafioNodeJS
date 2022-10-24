"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default1666599778306 = void 0;
class default1666599778306 {
    constructor() {
        this.name = 'default1666599778306';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "images" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "picture" text NOT NULL, "filename" text NOT NULL, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "images"`);
    }
}
exports.default1666599778306 = default1666599778306;
