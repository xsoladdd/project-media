"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPostLikeTable = void 0;
class UserPostLikeTable {
    constructor() {
        this.name = "UserPostLikeTable1629642340616";
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`project-media\`.\`user_post_like\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`postId\` int NOT NULL, PRIMARY KEY (\`id\`, \`userId\`, \`postId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`profile\` CHANGE \`middle_name\` \`middle_name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`profile\` CHANGE \`nickname\` \`nickname\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`profile\` CHANGE \`bio\` \`bio\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`profile\` CHANGE \`banner_image\` \`banner_image\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`profile\` CHANGE \`display_image\` \`display_image\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`refresh_token\` DROP FOREIGN KEY \`FK_8e913e288156c133999341156ad\``);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`refresh_token\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`user\` CHANGE \`username\` \`username\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`user\` CHANGE \`mobile_number\` \`mobile_number\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`user\` CHANGE \`password\` \`password\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post\` CHANGE \`media\` \`media\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`refresh_token\` ADD CONSTRAINT \`FK_8e913e288156c133999341156ad\` FOREIGN KEY (\`userId\`) REFERENCES \`project-media\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`user_post_like\` ADD CONSTRAINT \`FK_63a50c854ac0b2c9d0990141ff3\` FOREIGN KEY (\`postId\`) REFERENCES \`project-media\`.\`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`user_post_like\` ADD CONSTRAINT \`FK_4f0bdf1e459a15b7a286957e737\` FOREIGN KEY (\`userId\`) REFERENCES \`project-media\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`user_post_like\` DROP FOREIGN KEY \`FK_4f0bdf1e459a15b7a286957e737\``);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`user_post_like\` DROP FOREIGN KEY \`FK_63a50c854ac0b2c9d0990141ff3\``);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`refresh_token\` DROP FOREIGN KEY \`FK_8e913e288156c133999341156ad\``);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post\` CHANGE \`media\` \`media\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`user\` CHANGE \`password\` \`password\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`user\` CHANGE \`mobile_number\` \`mobile_number\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`user\` CHANGE \`username\` \`username\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`refresh_token\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`refresh_token\` ADD CONSTRAINT \`FK_8e913e288156c133999341156ad\` FOREIGN KEY (\`userId\`) REFERENCES \`project-media\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`profile\` CHANGE \`display_image\` \`display_image\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`profile\` CHANGE \`banner_image\` \`banner_image\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`profile\` CHANGE \`bio\` \`bio\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`profile\` CHANGE \`nickname\` \`nickname\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`profile\` CHANGE \`middle_name\` \`middle_name\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`project-media\`.\`user_post_like\``);
    }
}
exports.UserPostLikeTable = UserPostLikeTable;
//# sourceMappingURL=1629642340616-UserPostLikeTable%0A.js.map