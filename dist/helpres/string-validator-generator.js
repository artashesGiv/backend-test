"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringValidatorGenerator = void 0;
const express_validator_1 = require("express-validator");
const stringValidatorGenerator = (field, minLength, maxLength) => {
    return (0, express_validator_1.body)(field)
        .isString()
        .withMessage(`${field} should be is string`)
        .isLength({ min: minLength, max: maxLength })
        .withMessage(`${field} length should be from ${minLength} to ${maxLength} symbols`)
        .trim();
};
exports.stringValidatorGenerator = stringValidatorGenerator;
