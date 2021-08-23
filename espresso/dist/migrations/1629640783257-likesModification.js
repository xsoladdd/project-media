"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likesModification1629640783257 = void 0;
class likesModification1629640783257 {
    constructor() {
        this.name = 'likesModification1629640783257';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post_likes_profile\` DROP FOREIGN KEY \`FK_308e4f38b8bb4169fd8cb2fe201\``);
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
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post_likes_profile\` ADD CONSTRAINT \`FK_308e4f38b8bb4169fd8cb2fe201\` FOREIGN KEY (\`profileId\`) REFERENCES \`project-media\`.\`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post_likes_profile\` DROP FOREIGN KEY \`FK_308e4f38b8bb4169fd8cb2fe201\``);
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
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post_likes_profile\` ADD CONSTRAINT \`FK_308e4f38b8bb4169fd8cb2fe201\` FOREIGN KEY (\`profileId\`) REFERENCES \`project-media\`.\`profile\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }
}
exports.likesModification1629640783257 = likesModification1629640783257;
//# sourceMappingURL=1629640783257-likesModification.js.map