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
exports.usersService = void 0;
const repositories_1 = require("@/repositories");
const getUserViewModel = (user) => {
    return {
        id: user.id,
        name: user.name,
    };
};
exports.usersService = {
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield repositories_1.usersRepository.getUsers();
            return users.map(getUserViewModel);
        });
    },
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield repositories_1.usersRepository.getUserById(id);
            return getUserViewModel(user);
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
            const createdUser = yield repositories_1.usersRepository.createUser(newUser);
            return getUserViewModel(createdUser);
        });
    },
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield repositories_1.usersRepository.updateUser(id, user);
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield repositories_1.usersRepository.deleteUser(id);
        });
    },
};
