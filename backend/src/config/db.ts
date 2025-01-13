import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA,
  entities: ["src/entities/*.ts"],
  synchronize: true,
  logging: true,

  // Migration script
  // migrations: ["./src/migrations/*.ts"],
  // migrationsTableName: "migrations",
});
