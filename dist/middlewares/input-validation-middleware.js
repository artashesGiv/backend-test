"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const http_status_codes_1 = require("http-status-codes");
const inputValidationMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
        res.end();
    }
    else {
        next();
    }
};
exports.inputValidationMiddleware = inputValidationMiddleware;
