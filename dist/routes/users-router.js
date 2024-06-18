"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserViewModel = exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../db/db");
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
exports.userRouter.get('/', (_, res) => {
    res
        .json(user_repository_1.userRepository.getUsers().map(exports.getUserViewModel))
        .status(http_status_codes_1.StatusCodes.OK)
        .end();
});
exports.userRouter.get('/:id([0-9]+)', (req, res) => {
    const user = user_repository_1.userRepository.getUserById(+req.params.id);
    if (user) {
        res.json({
            id: user.id,
            name: user.name,
        });
        res.status(http_status_codes_1.StatusCodes.OK);
    }
    else {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    res.end();
});
exports.userRouter.post('/', userNameValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const user = user_repository_1.userRepository.createUser(req.body);
    if (user) {
        res.status(http_status_codes_1.StatusCodes.CREATED).json((0, exports.getUserViewModel)(user));
    }
    else {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    res.end();
});
exports.userRouter.put('/:id', paramIdValidation, userNameValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const user = db_1.db.users.find(user => user.id === +req.params.id);
    if (user) {
        user.name = req.body.name;
        res.status(http_status_codes_1.StatusCodes.OK);
        res.json((0, exports.getUserViewModel)(user));
    }
    else {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    res.end();
});
exports.userRouter.delete('/:id', paramIdValidation, (req, res) => {
    if (req.params.id) {
        const user = db_1.db.users.find(user => user.id === Number(req.params.id));
        if (user) {
            db_1.db.users.splice(db_1.db.users.indexOf(user), 1);
            res.status(http_status_codes_1.StatusCodes.OK);
        }
        else {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
        }
    }
    else {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    res.end();
});
