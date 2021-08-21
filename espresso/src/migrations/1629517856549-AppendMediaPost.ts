import {MigrationInterface, QueryRunner} from "typeorm";

export class AppendMediaPost1629517856549 implements MigrationInterface {
    name = 'AppendMediaPost1629517856549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post\` ADD \`media\` text NULL`);
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
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`refresh_token\` ADD CONSTRAINT \`FK_8e913e288156c133999341156ad\` FOREIGN KEY (\`userId\`) REFERENCES \`project-media\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`refresh_token\` DROP FOREIGN KEY \`FK_8e913e288156c133999341156ad\``);
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
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post\` DROP COLUMN \`media\``);
    }

}
