"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostEntityLikesColumn1629637098315 = void 0;
class PostEntityLikesColumn1629637098315 {
    constructor() {
        this.name = 'PostEntityLikesColumn1629637098315';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`project-media\`.\`post_likes_profile\` (\`postId\` int NOT NULL, \`profileId\` int NOT NULL, INDEX \`IDX_5d411062ae977b173fc085b90a\` (\`postId\`), INDEX \`IDX_308e4f38b8bb4169fd8cb2fe20\` (\`profileId\`), PRIMARY KEY (\`postId\`, \`profileId\`)) ENGINE=InnoDB`);
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
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post_likes_profile\` ADD CONSTRAINT \`FK_5d411062ae977b173fc085b90a4\` FOREIGN KEY (\`postId\`) REFERENCES \`project-media\`.\`post\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post_likes_profile\` ADD CONSTRAINT \`FK_308e4f38b8bb4169fd8cb2fe201\` FOREIGN KEY (\`profileId\`) REFERENCES \`project-media\`.\`profile\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post_likes_profile\` DROP FOREIGN KEY \`FK_308e4f38b8bb4169fd8cb2fe201\``);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post_likes_profile\` DROP FOREIGN KEY \`FK_5d411062ae977b173fc085b90a4\``);
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
        await queryRunner.query(`DROP INDEX \`IDX_308e4f38b8bb4169fd8cb2fe20\` ON \`project-media\`.\`post_likes_profile\``);
        await queryRunner.query(`DROP INDEX \`IDX_5d411062ae977b173fc085b90a\` ON \`project-media\`.\`post_likes_profile\``);
        await queryRunner.query(`DROP TABLE \`project-media\`.\`post_likes_profile\``);
    }
}
exports.PostEntityLikesColumn1629637098315 = PostEntityLikesColumn1629637098315;
//# sourceMappingURL=1629637098315-PostEntityLikesColumn.js.map