import { Request, Response } from "express";
import { User } from "../entities/User";
import { userRepository } from "../repositories/userRepository";

export class UserController {
  async getUsers(_req: Request, res: Response): Promise<void> {
    try {
      const users: Array<User | null> | null = await userRepository.find({
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
    } catch (error: any | unknown) {
      console.log(error);
      res.status(500).json({ message: "Internal Sever Error" });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const user: User | null = await userRepository.findOne({
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
    } catch (error: any | unknown) {
      console.log(error);
      res.status(500).json({ message: "Internal Sever Error" });
    }
  }

  async getUsersByName(req: Request, res: Response): Promise<void> {
    const { name } = req.params;

    try {
      const user: Array<User | null> | null = await userRepository.query(`
        SELECT id, name, email FROM users WHERE name ILIKE '${name}%';
      `);

      res.status(200).json(user);
    } catch (error: any | unknown) {
      console.log(error);
      res.status(500).json({ message: "Internal Sever Error" });
    }
  }

  async getUsersByEmail(req: Request, res: Response): Promise<void> {
    const { email } = req.params;

    try {
      const user: Array<User | null> | null = await userRepository.query(`
        SELECT id, name, email FROM users WHERE email ILIKE '${email}%';
      `);

      res.status(200).json(user);
    } catch (error: any | unknown) {
      console.log(error);
      res.status(500).json({ message: "Internal Sever Error" });
    }
  }

  async post(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    try {
      await userRepository.insert([{
        name: name,
        email: email,
        password: password // max length = 72
      }]);

      res.sendStatus(201);
    } catch (error: any | unknown) {
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

  async put(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
      await userRepository.update(Number(id),{
        name: name,
        email: email,
        password: password
      });

      res.sendStatus(200);
    } catch (error: any | unknown) {
      console.log(error);
      res.status(500).json({ message: "Internal Sever Error" });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await userRepository.delete(Number(id));

      res.status(204).send("Usuário excluído com sucesso!");
    } catch (error: any | unknown) {
      console.log(error);
      res.status(500).json({ message: "Internal Sever Error" });
    }
  }
}
