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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userIsFoundValidation = exports.paramIdValidation = exports.userPasswordValidation = exports.userLoginValidation = exports.userNameValidation = void 0;
const express_validator_1 = require("express-validator");
const users_service_1 = require("@/domain/users-service");
const http_status_codes_1 = require("http-status-codes");
const helpres_1 = require("@/helpres");
exports.userNameValidation = (0, helpres_1.stringValidatorGenerator)('name', 3, 15);
exports.userLoginValidation = (0, helpres_1.stringValidatorGenerator)('login', 3, 15);
exports.userPasswordValidation = (0, helpres_1.stringValidatorGenerator)('password', 3, 15);
exports.paramIdValidation = (0, express_validator_1.param)('id')
    .isNumeric()
    .withMessage('id should be is number');
const userIsFoundValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_service_1.usersService.getUserById(+req.params.id);
    if (user) {
        next();
    }
    else {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).end();
    }
});
exports.userIsFoundValidation = userIsFoundValidation;
