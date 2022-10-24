import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repositories/userRepository";
import * as jwt from "jsonwebtoken";
import { User } from "../entities/User";

export class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "O email e a senha são obrigatórios" });
      return;
    }

    try {
      const user: User | null = (await userRepository.query(`
        SELECT email, password FROM users
        WHERE '${email}' = email AND password = crypt('${password}', password);
      `));

      if (user) {
        res.status(200).json({
          token: jwt.sign(
            { user: user.email },
            process.env.AUTH_SECRET as string,
            { expiresIn: "45m" }
          ),
          refreshToken: jwt.sign(
            { user: user.email },
            process.env.REFRESH_SECRET as string,
            {}
          )
        });
      }
      else {
        res.status(403).json("Usuário e(ou) senha inválido(s)");
      }
    } catch (error: any | unknown) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async refresh(req: Request, res: Response): Promise<void> {
    const { refreshToken } = req.body;

    jwt.verify(refreshToken, process.env.REFRESH_SECRET as string, {}, (err, user) => {
      res.send(jwt.sign(
        { user: user },
        process.env.AUTH_SECRET as string,
        { expiresIn: '45m' }
      ));
    });
  }

  async authorize(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authToken: string | undefined = req.get('authorization');

    if (authToken === undefined) {
      res.sendStatus(401);
      return;
    }

    jwt.verify(
      authToken,
      process.env.AUTH_SECRET as string,
      {},
      (err, user) => {
        if (err !== null) {
          return res.sendStatus(403);
        }

        console.log(user)

        res.locals.user = user;
        next();
      },
    );
  }
}
