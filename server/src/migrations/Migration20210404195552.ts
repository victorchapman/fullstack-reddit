import { Migration } from '@mikro-orm/migrations';

export class Migration20210404195552 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "password" text null;');
  }

}
