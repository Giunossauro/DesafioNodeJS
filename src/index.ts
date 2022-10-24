import express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import cors from 'cors';

AppDataSource.initialize().then(() => {
	const app = express();

	app.use(express.json());
  app.use(express.urlencoded({ extended: true })); //true == support to nested json
  app.use(cors());

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "GET POST PATCH PUT DELETE");
      return res.status(200).json({});
    }
  
    next();
  });

	app.use(routes);
  
  app.use((_req, res, _next) => {
    const error = new Error("not found");
    return res.status(404).json({
      message: error.message,
    });
  });

	return app.listen(process.env.PORT ?? 3000);
});
