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
exports.getUserViewModel = exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_repository_1 = require("../repositories/user-repository");
const express_validator_1 = require("express-validator");
const http_status_codes_1 = require("http-status-codes");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
exports.userRouter = express_1.default.Router();
const getUserViewModel = (user) => {
    return {
        id: user.id,
        name: user.name,
    };
};
exports.getUserViewModel = getUserViewModel;
// local middlewares
const userNameValidation = (0, express_validator_1.body)('name')
    .isString()
    .isLength({ min: 3, max: 15 })
    .withMessage('name length should be from 3 to 15 symbols')
    .trim();
const paramIdValidation = (0, express_validator_1.param)('id')
    .isNumeric()
    .withMessage('id should be is number');
const userIsFoundValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_repository_1.userRepository.getUserById(+req.params.id);
    if (user) {
        next();
    }
    else {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).end();
    }
});
// routes
exports.userRouter.get('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_repository_1.userRepository.getUsers();
    res.json(users.map(exports.getUserViewModel)).status(http_status_codes_1.StatusCodes.OK).end();
}));
exports.userRouter.get('/:id([0-9]+)', userIsFoundValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_repository_1.userRepository.getUserById(+req.params.id);
    res.json((0, exports.getUserViewModel)(user)).status(http_status_codes_1.StatusCodes.OK).end();
}));
exports.userRouter.post('/', userNameValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_repository_1.userRepository.createUser(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json((0, exports.getUserViewModel)(user)).end();
}));
exports.userRouter.put('/:id', paramIdValidation, userIsFoundValidation, userNameValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_repository_1.userRepository.updateUser(+req.params.id, req.body);
    res.status(http_status_codes_1.StatusCodes.OK).end();
}));
exports.userRouter.delete('/:id', paramIdValidation, userIsFoundValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteUserId = yield user_repository_1.userRepository.deleteUser(+req.params.id);
    res.status(http_status_codes_1.StatusCodes.OK).json(deleteUserId).end();
}));
