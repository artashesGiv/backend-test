"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_router_1 = require("./routes/users-router");
require("./types");
exports.app = (0, express_1.default)();
exports.app.use(body_parser_1.default.json());
exports.app.use('/api/users', users_router_1.userRouter);
exports.app.get('/', (_, res) => {
    res.send('Hello server!');
    res.end();
});
