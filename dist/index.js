"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
data_source_1.AppDataSource.initialize().then(() => {
    var _a;
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true })); //true == support to nested json
    app.use((0, cors_1.default)());
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "origin, X-Requested-With, Content-Type, Accept, Authorization");
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "GET POST PATCH PUT DELETE");
            return res.status(200).json({});
        }
        next();
    });
    app.use(routes_1.default);
    app.use((_req, res, _next) => {
        const error = new Error("not found");
        return res.status(404).json({
            message: error.message,
        });
    });
    return app.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000);
});
