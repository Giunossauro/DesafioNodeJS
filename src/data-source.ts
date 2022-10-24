import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";

//const port = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
	type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
	entities: [`${__dirname}/**/entities/*.{ts,js}`],
	migrations: [`${__dirname}/**/migrations/*.{ts,js}`]
});
