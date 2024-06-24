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
exports.usersRepository = void 0;
const db_1 = require("@/db");
const { usersCollection } = db_1.collections;
exports.usersRepository = {
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return usersCollection.find({}).toArray();
        });
    },
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return usersCollection.findOne({ id });
        });
    },
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield usersCollection.insertOne(user);
            return user;
        });
    },
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield usersCollection.updateOne({ id }, { $set: user });
            return !!result.matchedCount;
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield usersCollection.deleteOne({ id });
            return !!result.deletedCount;
        });
    },
};
