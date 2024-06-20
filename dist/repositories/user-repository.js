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
exports.userRepository = void 0;
const db_1 = require("../db/db");
const userCollection = db_1.client.db('test').collection('users');
exports.userRepository = {
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return userCollection.find({}).toArray();
        });
    },
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return userCollection.findOne({ id });
        });
    },
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = {
                id: +new Date(),
                name: user.name,
                login: user.login,
                password: user.password,
            };
            yield userCollection.insertOne(newUser);
            return newUser;
        });
    },
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield userCollection.updateOne({ id }, { $set: user });
            return !!result.matchedCount;
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield userCollection.deleteOne({ id });
            return !!result.deletedCount;
        });
    },
};
