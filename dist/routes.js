"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("./controllers/UserController");
const ImageController_1 = require("./controllers/ImageController");
const AuthController_1 = require("./controllers/AuthController");
const routes = (0, express_1.Router)();
const userController = new UserController_1.UserController();
const imageController = new ImageController_1.ImageController();
const authController = new AuthController_1.AuthController();
routes.post("/users", userController.post);
routes.get("/users", /* authController.authorize,  */ userController.getUsers);
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
exports.default = routes;
