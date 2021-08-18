"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile1628171846945 = void 0;
class Profile1628171846945 {
    constructor() {
        this.name = 'Profile1628171846945';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`project-media\`.\`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`mobile_number\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`profileId\` int NULL, UNIQUE INDEX \`REL_9466682df91534dd95e4dbaa61\` (\`profileId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project-media\`.\`profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NOT NULL, \`middle_name\` varchar(255) NULL, \`last_name\` varchar(255) NOT NULL, \`birthday\` datetime NOT NULL, \`nickname\` varchar(255) NOT NULL, \`display_image\` text NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`user\` ADD CONSTRAINT \`FK_9466682df91534dd95e4dbaa616\` FOREIGN KEY (\`profileId\`) REFERENCES \`project-media\`.\`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`project-media\`.\`user\` DROP FOREIGN KEY \`FK_9466682df91534dd95e4dbaa616\``);
        await queryRunner.query(`DROP TABLE \`project-media\`.\`profile\``);
        await queryRunner.query(`DROP INDEX \`REL_9466682df91534dd95e4dbaa61\` ON \`project-media\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`project-media\`.\`user\``);
    }
}
exports.Profile1628171846945 = Profile1628171846945;
//# sourceMappingURL=1628171846945-ProfileUserTables.js.map