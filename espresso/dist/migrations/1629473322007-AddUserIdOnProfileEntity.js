"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserIdOnProfileEntity1629473322007 = void 0;
class AddUserIdOnProfileEntity1629473322007 {
    constructor() {
        this.name = 'AddUserIdOnProfileEntity1629473322007';
    }
    async up(queryRunner) {
        await queryRunner.query(`DROP INDEX \`IDX_a24972ebd73b106250713dcddd\` ON \`project-media\`.\`profile\``);
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
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post\` DROP FOREIGN KEY \`FK_5c1cf55c308037b5aca1038a131\``);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post\` CHANGE \`userId\` \`userId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`refresh_token\` ADD CONSTRAINT \`FK_8e913e288156c133999341156ad\` FOREIGN KEY (\`userId\`) REFERENCES \`project-media\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post\` ADD CONSTRAINT \`FK_5c1cf55c308037b5aca1038a131\` FOREIGN KEY (\`userId\`) REFERENCES \`project-media\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post\` DROP FOREIGN KEY \`FK_5c1cf55c308037b5aca1038a131\``);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`refresh_token\` DROP FOREIGN KEY \`FK_8e913e288156c133999341156ad\``);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post\` ADD CONSTRAINT \`FK_5c1cf55c308037b5aca1038a131\` FOREIGN KEY (\`userId\`) REFERENCES \`project-media\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_a24972ebd73b106250713dcddd\` ON \`project-media\`.\`profile\` (\`userId\`)`);
    }
}
exports.AddUserIdOnProfileEntity1629473322007 = AddUserIdOnProfileEntity1629473322007;
//# sourceMappingURL=1629473322007-AddUserIdOnProfileEntity.js.map