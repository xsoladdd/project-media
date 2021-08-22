"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init1629637043780 = void 0;
class init1629637043780 {
    constructor() {
        this.name = "init1629637043780";
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`project-media\`.\`comments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`content\` text NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT '1', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project-media\`.\`refresh_token\` (\`id\` int NOT NULL AUTO_INCREMENT, \`refresh_token\` text NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, UNIQUE INDEX \`REL_8e913e288156c133999341156a\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project-media\`.\`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`username\` varchar(255) NULL, \`mobile_number\` varchar(255) NULL, \`password\` varchar(255) NULL, \`is_active\` tinyint NOT NULL DEFAULT '1', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`IDX_9d6d873483c7fae39567c20919\` (\`mobile_number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project-media\`.\`profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NOT NULL, \`middle_name\` varchar(255) NULL, \`last_name\` varchar(255) NOT NULL, \`birthday\` datetime NOT NULL, \`nickname\` varchar(255) NULL, \`bio\` text NULL, \`banner_image\` text NULL, \`display_image\` text NULL, \`userId\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_a24972ebd73b106250713dcddd\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project-media\`.\`post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` text NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT '1', \`media\` text NULL, \`userId\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project-media\`.\`post_categories_profile\` (\`postId\` int NOT NULL, \`profileId\` int NOT NULL, INDEX \`IDX_0b17d8b824ff7293e9e9e203b2\` (\`postId\`), INDEX \`IDX_a2b7431530b3d89b1d08787fc6\` (\`profileId\`), PRIMARY KEY (\`postId\`, \`profileId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`refresh_token\` ADD CONSTRAINT \`FK_8e913e288156c133999341156ad\` FOREIGN KEY (\`userId\`) REFERENCES \`project-media\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`profile\` ADD CONSTRAINT \`FK_a24972ebd73b106250713dcddd9\` FOREIGN KEY (\`userId\`) REFERENCES \`project-media\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post\` ADD CONSTRAINT \`FK_5c1cf55c308037b5aca1038a131\` FOREIGN KEY (\`userId\`) REFERENCES \`project-media\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post\` DROP FOREIGN KEY \`FK_5c1cf55c308037b5aca1038a131\``);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`profile\` DROP FOREIGN KEY \`FK_a24972ebd73b106250713dcddd9\``);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`refresh_token\` DROP FOREIGN KEY \`FK_8e913e288156c133999341156ad\``);
        await queryRunner.query(`DROP INDEX \`IDX_a2b7431530b3d89b1d08787fc6\` ON \`project-media\`.\`post_categories_profile\``);
        await queryRunner.query(`DROP INDEX \`IDX_0b17d8b824ff7293e9e9e203b2\` ON \`project-media\`.\`post_categories_profile\``);
        await queryRunner.query(`DROP TABLE \`project-media\`.\`post_categories_profile\``);
        await queryRunner.query(`DROP TABLE \`project-media\`.\`post\``);
        await queryRunner.query(`DROP INDEX \`REL_a24972ebd73b106250713dcddd\` ON \`project-media\`.\`profile\``);
        await queryRunner.query(`DROP TABLE \`project-media\`.\`profile\``);
        await queryRunner.query(`DROP INDEX \`IDX_9d6d873483c7fae39567c20919\` ON \`project-media\`.\`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`project-media\`.\`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`project-media\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`project-media\`.\`user\``);
        await queryRunner.query(`DROP INDEX \`REL_8e913e288156c133999341156a\` ON \`project-media\`.\`refresh_token\``);
        await queryRunner.query(`DROP TABLE \`project-media\`.\`refresh_token\``);
        await queryRunner.query(`DROP TABLE \`project-media\`.\`comments\``);
    }
}
exports.init1629637043780 = init1629637043780;
//# sourceMappingURL=1629637043780-init.js.map