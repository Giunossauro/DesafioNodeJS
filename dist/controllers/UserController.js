"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userRepository_1 = require("../repositories/userRepository");
class UserController {
    async getUsers(_req, res) {
        try {
            const users = await userRepository_1.userRepository.find({
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
                order: {
                    id: "ASC",
                },
            });
            res.status(200).json(users);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Sever Error" });
        }
    }
    async getUserById(req, res) {
        const { id } = req.params;
        try {
            const user = await userRepository_1.userRepository.findOne({
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
                where: {
                    id: Number(id),
                },
            });
            res.status(200).json(user);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Sever Error" });
        }
    }
    async getUsersByName(req, res) {
        const { name } = req.params;
        try {
            const user = await userRepository_1.userRepository.query(`
        SELECT id, name, email FROM users WHERE name ILIKE '${name}%';
      `);
            res.status(200).json(user);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Sever Error" });
        }
    }
    async getUsersByEmail(req, res) {
        const { email } = req.params;
        try {
            const user = await userRepository_1.userRepository.query(`
        SELECT id, name, email FROM users WHERE email ILIKE '${email}%';
      `);
            res.status(200).json(user);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Sever Error" });
        }
    }
    async post(req, res) {
        const { name, email, password } = req.body;
        try {
            await userRepository_1.userRepository.insert([{
                    name: name,
                    email: email,
                    password: password // max length = 72
                }]);
            res.sendStatus(201);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Sever Error" });
        }
    }
    /* async patch(req: Request, res: Response): Promise<void> {
      const { name, email, password } = req.body;
  
      try {
        await userRepository.insert([{
          name: name,
          email: email,
          password: password
        }]);
  
        res.sendStatus(201);
      } catch (error: any | unknown) {
        console.log(error);
        res.status(500).json({ message: "Internal Sever Error" });
      }
    } */
    async put(req, res) {
        const { id } = req.params;
        const { name, email, password } = req.body;
        try {
            await userRepository_1.userRepository.update(Number(id), {
                name: name,
                email: email,
                password: password
            });
            res.sendStatus(200);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Sever Error" });
        }
    }
    async delete(req, res) {
        const { id } = req.params;
        try {
            await userRepository_1.userRepository.delete(Number(id));
            res.status(204).send("Usuário excluído com sucesso!");
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Sever Error" });
        }
    }
}
exports.UserController = UserController;
