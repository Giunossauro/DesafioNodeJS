import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { ImageController } from "./controllers/ImageController";
import { AuthController } from "./controllers/AuthController";

const routes = Router();

const userController: UserController = new UserController();
const imageController: ImageController = new ImageController();
const authController: AuthController = new AuthController();

routes.post("/users", userController.post);
routes.get("/users", /* authController.authorize,  */userController.getUsers);
routes.get("/users/:id", userController.getUserById);
routes.get("/getUsersByName/:name", userController.getUsersByName);
routes.get("/getUsersByEmail/:email", userController.getUsersByEmail);
//routes.patch("/users/:id", userController.patch);
routes.put("/users/:id", userController.put);
routes.delete("/users/:id", userController.delete);

routes.post("/images", authController.authorize, imageController.post);
routes.get("/images", imageController.getImages);
routes.get("/images/:id", imageController.getImageById);
routes.get("/getImagesByName", imageController.getImagesByName);
//routes.patch("/images/:id", imageController.patch);
routes.put("/images/:id", authController.authorize, imageController.put);
routes.delete("/images/:id", authController.authorize, imageController.delete);

routes.post("/login", authController.login);
routes.post("/refresh", authController.refresh);

export default routes;
