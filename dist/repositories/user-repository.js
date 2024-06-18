"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const db_1 = require("../db/db");
exports.userRepository = {
    getUsers() {
        return db_1.db.users;
    },
    getUserById(id) {
        if (!id) {
            return null;
        }
        return db_1.db.users.find(user => user.id === id);
    },
    createUser(user) {
        if (!user.name) {
            return null;
        }
        const newUser = {
            id: +new Date(),
            name: user.name,
        };
        db_1.db.users.push(newUser);
        return newUser;
    },
};
