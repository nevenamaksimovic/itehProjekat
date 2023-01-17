import { MigrationInterface, QueryRunner } from "typeorm";

export class doctors1663090355775 implements MigrationInterface {
    name = 'doctors1663090355775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`doctor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`type\` enum ('patient', 'technitian') NOT NULL DEFAULT 'patient'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`type\``);
        await queryRunner.query(`DROP TABLE \`doctor\``);
    }

}
