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
exports.db = exports.runDb = exports.client = void 0;
const mongodb_1 = require("mongodb");
const mongoUri = process.env.mongoURI || 'mongodb://localhost:27017';
exports.client = new mongodb_1.MongoClient(mongoUri);
const runDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.client.connect();
        console.log('Connected successfully to bd');
    }
    catch (e) {
        console.error(e);
        yield exports.client.close();
    }
});
exports.runDb = runDb;
exports.db = {
    users: [
        {
            id: 1,
            name: 'Art',
            login: 'Art',
            password: '1242',
        },
        {
            id: 2,
            name: 'David',
            login: 'Art',
            password: '1242',
        },
        {
            id: 3,
            name: 'Maxim',
            login: 'Art',
            password: '1242',
        },
        {
            id: 4,
            name: 'Karina',
            login: 'Art',
            password: '1242',
        },
        {
            id: 5,
            name: 'Marina',
            login: 'Art',
            password: '1242',
        },
    ],
};
