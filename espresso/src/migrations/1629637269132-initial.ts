import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1629637269132 implements MigrationInterface {
    name = 'initial1629637269132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`project-media\`.\`comments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`content\` text NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT '1', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project-media\`.\`refresh_token\` (\`id\` int NOT NULL AUTO_INCREMENT, \`refresh_token\` text NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, UNIQUE INDEX \`REL_8e913e288156c133999341156a\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project-media\`.\`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`username\` varchar(255) NULL, \`mobile_number\` varchar(255) NULL, \`password\` varchar(255) NULL, \`is_active\` tinyint NOT NULL DEFAULT '1', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`IDX_9d6d873483c7fae39567c20919\` (\`mobile_number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project-media\`.\`profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NOT NULL, \`middle_name\` varchar(255) NULL, \`last_name\` varchar(255) NOT NULL, \`birthday\` datetime NOT NULL, \`nickname\` varchar(255) NULL, \`bio\` text NULL, \`banner_image\` text NULL, \`display_image\` text NULL, \`userId\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_a24972ebd73b106250713dcddd\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project-media\`.\`post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` text NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT '1', \`media\` text NULL, \`userId\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project-media\`.\`post_likes_profile\` (\`postId\` int NOT NULL, \`profileId\` int NOT NULL, INDEX \`IDX_5d411062ae977b173fc085b90a\` (\`postId\`), INDEX \`IDX_308e4f38b8bb4169fd8cb2fe20\` (\`profileId\`), PRIMARY KEY (\`postId\`, \`profileId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`refresh_token\` ADD CONSTRAINT \`FK_8e913e288156c133999341156ad\` FOREIGN KEY (\`userId\`) REFERENCES \`project-media\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`profile\` ADD CONSTRAINT \`FK_a24972ebd73b106250713dcddd9\` FOREIGN KEY (\`userId\`) REFERENCES \`project-media\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post\` ADD CONSTRAINT \`FK_5c1cf55c308037b5aca1038a131\` FOREIGN KEY (\`userId\`) REFERENCES \`project-media\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post_likes_profile\` ADD CONSTRAINT \`FK_5d411062ae977b173fc085b90a4\` FOREIGN KEY (\`postId\`) REFERENCES \`project-media\`.\`post\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post_likes_profile\` ADD CONSTRAINT \`FK_308e4f38b8bb4169fd8cb2fe201\` FOREIGN KEY (\`profileId\`) REFERENCES \`project-media\`.\`profile\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post_likes_profile\` DROP FOREIGN KEY \`FK_308e4f38b8bb4169fd8cb2fe201\``);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post_likes_profile\` DROP FOREIGN KEY \`FK_5d411062ae977b173fc085b90a4\``);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`post\` DROP FOREIGN KEY \`FK_5c1cf55c308037b5aca1038a131\``);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`profile\` DROP FOREIGN KEY \`FK_a24972ebd73b106250713dcddd9\``);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`refresh_token\` DROP FOREIGN KEY \`FK_8e913e288156c133999341156ad\``);
        await queryRunner.query(`DROP INDEX \`IDX_308e4f38b8bb4169fd8cb2fe20\` ON \`project-media\`.\`post_likes_profile\``);
        await queryRunner.query(`DROP INDEX \`IDX_5d411062ae977b173fc085b90a\` ON \`project-media\`.\`post_likes_profile\``);
        await queryRunner.query(`DROP TABLE \`project-media\`.\`post_likes_profile\``);
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
