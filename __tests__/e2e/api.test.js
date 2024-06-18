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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../src/app");
describe('/users', () => {
    it('Получить все пользователей', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).get('/users').expect(200);
    }));
    it('Получить пользовтеля по id', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).get('/users/1').expect(200);
    }));
    it('Получить несуществующего пользователя', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).get('/users/999999').expect(404);
    }));
    it('Создать пользователя', () => __awaiter(void 0, void 0, void 0, function* () {
        const newData = { name: 'new' };
        yield (0, supertest_1.default)(app_1.app).post('/users').send(newData).expect(201);
    }));
    it('Создать пустого пользователя', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).post('/users').send({}).expect(400);
    }));
    it('Удалить пользователя', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).delete('/users/1').expect(200);
    }));
    it('should rename user by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedData = { name: 'new name' };
        yield (0, supertest_1.default)(app_1.app).put('/users/2').send(updatedData).expect(200);
    }));
});
