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
const STATUS_CODES_1 = require("../STATUS_CODES");
exports.userRouter = express_1.default.Router();
const getUserViewModel = (user) => {
    return {
        id: user.id,
        name: user.name,
    };
};
exports.getUserViewModel = getUserViewModel;
exports.userRouter.get('/', (_, res) => {
    res
        .json(user_repository_1.userRepository.getUsers().map(exports.getUserViewModel))
        .status(STATUS_CODES_1.STATUS_CODES.OK)
        .end();
});
exports.userRouter.get('/:id([0-9]+)', (req, res) => {
    const id = +req.params.id;
    if (id) {
        const user = user_repository_1.userRepository.getUserById(+req.params.id);
        if (user) {
            res.json({
                id: user.id,
                name: user.name,
            });
            res.status(STATUS_CODES_1.STATUS_CODES.OK);
        }
        else {
            res.status(STATUS_CODES_1.STATUS_CODES.NOT_FOUND);
        }
    }
    else {
        res.status(STATUS_CODES_1.STATUS_CODES.BAD_REQUEST);
    }
    res.end();
});
exports.userRouter.post('/', (0, express_validator_1.body)('name').isString().isLength({ min: 3, max: 15 }).trim(), (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return (res
            .status(STATUS_CODES_1.STATUS_CODES.BAD_REQUEST)
            // @ts-ignore
            .json({ errors: errors.array() }));
    }
    const user = user_repository_1.userRepository.createUser(req.body);
    if (user) {
        res.status(STATUS_CODES_1.STATUS_CODES.CREATED).json((0, exports.getUserViewModel)(user));
    }
    else {
        res.status(STATUS_CODES_1.STATUS_CODES.BAD_REQUEST);
    }
    res.end();
});
exports.userRouter.put('/:id', (req, res) => {
    if (req.params.id) {
        const user = db_1.db.users.find(user => user.id === +req.params.id);
        if (user) {
            user.name = req.body.name;
            res.status(STATUS_CODES_1.STATUS_CODES.OK);
            res.json((0, exports.getUserViewModel)(user));
        }
        else {
            res.status(STATUS_CODES_1.STATUS_CODES.NOT_FOUND);
        }
    }
    else {
        res.status(STATUS_CODES_1.STATUS_CODES.BAD_REQUEST);
    }
    res.end();
});
exports.userRouter.delete('/:id', (req, res) => {
    if (req.params.id) {
        const user = db_1.db.users.find(user => user.id === Number(req.params.id));
        if (user) {
            db_1.db.users.splice(db_1.db.users.indexOf(user), 1);
            res.status(STATUS_CODES_1.STATUS_CODES.OK);
        }
        else {
            res.status(STATUS_CODES_1.STATUS_CODES.NOT_FOUND);
        }
    }
    else {
        res.status(STATUS_CODES_1.STATUS_CODES.BAD_REQUEST);
    }
    res.end();
});
