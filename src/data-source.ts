import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";

const port = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
	type: "postgres",
  //url: process.env.DATABASE_URL,
	host: process.env.DB_HOST,
	port: port,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
  synchronize: false,
	entities: [`${__dirname}/**/entities/*.{ts,js}`],
	migrations: [`${__dirname}/**/migrations/*.{ts,js}`]
});
