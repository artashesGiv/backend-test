"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const domain_1 = require("@/domain");
const http_status_codes_1 = require("http-status-codes");
const middlewares_1 = require("@/middlewares");
exports.userRouter = express_1.default.Router();
// routes
exports.userRouter.get('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield domain_1.usersService.getUsers();
    res.json(users).status(http_status_codes_1.StatusCodes.OK).end();
}));
exports.userRouter.get('/:id([0-9]+)', middlewares_1.userIsFoundValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield domain_1.usersService.getUserById(+req.params.id);
    res.json(user).status(http_status_codes_1.StatusCodes.OK).end();
}));
exports.userRouter.post('/', middlewares_1.userNameValidation, middlewares_1.userLoginValidation, middlewares_1.userPasswordValidation, middlewares_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield domain_1.usersService.createUser(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json(user).end();
}));
exports.userRouter.put('/:id', middlewares_1.paramIdValidation, middlewares_1.userIsFoundValidation, middlewares_1.userNameValidation, middlewares_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield domain_1.usersService.updateUser(+req.params.id, req.body);
    res.status(http_status_codes_1.StatusCodes.OK).end();
}));
exports.userRouter.delete('/:id', middlewares_1.paramIdValidation, middlewares_1.userIsFoundValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteUserId = yield domain_1.usersService.deleteUser(+req.params.id);
    res.status(http_status_codes_1.StatusCodes.OK).json(deleteUserId).end();
}));
