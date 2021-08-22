"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likesManyToManyColumn1629636680111 = void 0;
class likesManyToManyColumn1629636680111 {
    constructor() {
        this.name = 'likesManyToManyColumn1629636680111';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`project-media\`.\`post_categories_profile\` (\`postId\` int NOT NULL, \`profileId\` int NOT NULL, INDEX \`IDX_0b17d8b824ff7293e9e9e203b2\` (\`postId\`), INDEX \`IDX_a2b7431530b3d89b1d08787fc6\` (\`profileId\`), PRIMARY KEY (\`postId\`, \`profileId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`refresh_token\` DROP FOREIGN KEY \`FK_8e913e288156c133999341156ad\``);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`refresh_token\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`user\` CHANGE \`username\` \`username\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`user\` CHANGE \`mobile_number\` \`mobile_number\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`user\` CHANGE \`password\` \`password\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`profile\` CHANGE \`middle_name\` \`middle_name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`profile\` CHANGE \`nickname\` \`nickname\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`profile\` CHANGE \`bio\` \`bio\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`profile\` CHANGE \`banner_image\` \`banner_image\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`profile\` CHANGE \`display_image\` \`display_image\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post\` CHANGE \`media\` \`media\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`refresh_token\` ADD CONSTRAINT \`FK_8e913e288156c133999341156ad\` FOREIGN KEY (\`userId\`) REFERENCES \`project-media\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post_categories_profile\` ADD CONSTRAINT \`FK_0b17d8b824ff7293e9e9e203b2f\` FOREIGN KEY (\`postId\`) REFERENCES \`project-media\`.\`post\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post_categories_profile\` ADD CONSTRAINT \`FK_a2b7431530b3d89b1d08787fc6c\` FOREIGN KEY (\`profileId\`) REFERENCES \`project-media\`.\`profile\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post_categories_profile\` DROP FOREIGN KEY \`FK_a2b7431530b3d89b1d08787fc6c\``);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post_categories_profile\` DROP FOREIGN KEY \`FK_0b17d8b824ff7293e9e9e203b2f\``);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`refresh_token\` DROP FOREIGN KEY \`FK_8e913e288156c133999341156ad\``);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post\` CHANGE \`media\` \`media\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`profile\` CHANGE \`display_image\` \`display_image\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`profile\` CHANGE \`banner_image\` \`banner_image\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`profile\` CHANGE \`bio\` \`bio\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`profile\` CHANGE \`nickname\` \`nickname\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`profile\` CHANGE \`middle_name\` \`middle_name\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`user\` CHANGE \`password\` \`password\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`user\` CHANGE \`mobile_number\` \`mobile_number\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`user\` CHANGE \`username\` \`username\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`refresh_token\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`refresh_token\` ADD CONSTRAINT \`FK_8e913e288156c133999341156ad\` FOREIGN KEY (\`userId\`) REFERENCES \`project-media\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP INDEX \`IDX_a2b7431530b3d89b1d08787fc6\` ON \`project-media\`.\`post_categories_profile\``);
        await queryRunner.query(`DROP INDEX \`IDX_0b17d8b824ff7293e9e9e203b2\` ON \`project-media\`.\`post_categories_profile\``);
        await queryRunner.query(`DROP TABLE \`project-media\`.\`post_categories_profile\``);
    }
}
exports.likesManyToManyColumn1629636680111 = likesManyToManyColumn1629636680111;
//# sourceMappingURL=1629636680111-likesManyToManyColumn.js.map