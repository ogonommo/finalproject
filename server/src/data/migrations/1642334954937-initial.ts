import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1642334954937 implements MigrationInterface {
  name = 'initial1642334954937';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`quotes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`text\` text NOT NULL, \`movie\` varchar(255) NULL, UNIQUE INDEX \`IDX_db930f4393d6a1090d7ce28b96\` (\`text\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_db930f4393d6a1090d7ce28b96\` ON \`quotes\``,
    );
    await queryRunner.query(`DROP TABLE \`quotes\``);
  }
}
