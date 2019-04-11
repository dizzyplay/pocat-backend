import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  database: process.env.DB_NAME,
  synchronize: true,
  port: 5432,
  host: process.env.DB_HOST ? process.env.DB_HOST : "localhost",
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "",
  migrationsTableName: "my_migration_table",
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "entity",
    migrationsDir: "migration"
  }
};

export default connectionOptions;
