"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const userRepository_1 = require("../repositories/userRepository");
const jwt = __importStar(require("jsonwebtoken"));
class AuthController {
    async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "O email e a senha são obrigatórios" });
            return;
        }
        try {
            const user = (await userRepository_1.userRepository.query(`
        SELECT email, password FROM users
        WHERE email = '${email}' AND password = crypt('${password}', password);
      `))[0];
            if (user) {
                res.status(200).json({
                    token: jwt.sign({ user: user.email }, process.env.AUTH_SECRET, { expiresIn: "45m" }),
                    refreshToken: jwt.sign({ user: user.email }, process.env.REFRESH_SECRET, {})
                });
            }
            else {
                res.status(403).json("Usuário e(ou) senha inválido(s)");
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async refresh(req, res) {
        const { refreshToken } = req.body;
        jwt.verify(refreshToken, process.env.REFRESH_SECRET, {}, (err, user) => {
            res.send(jwt.sign({ user: user }, process.env.AUTH_SECRET, { expiresIn: '45m' }));
        });
    }
    async authorize(req, res, next) {
        const authToken = req.get('authorization');
        if (authToken === undefined) {
            res.sendStatus(401);
            return;
        }
        jwt.verify(authToken, process.env.AUTH_SECRET, {}, (err, user) => {
            if (err !== null) {
                return res.sendStatus(403);
            }
            console.log(user);
            res.locals.user = user;
            next();
        });
    }
}
exports.AuthController = AuthController;
