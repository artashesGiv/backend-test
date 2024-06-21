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
exports.collections = exports.ALL_COLLECTIONS = exports.runDb = exports.db = void 0;
const mongodb_1 = require("mongodb");
const mongoUri = process.env.mongoURI || 'mongodb://localhost:27017';
const client = new mongodb_1.MongoClient(mongoUri);
exports.db = client.db(process.env.MAIN_DB);
const runDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log('Connected successfully to bd');
    }
    catch (e) {
        console.error(e);
        yield client.close();
    }
});
exports.runDb = runDb;
var ALL_COLLECTIONS;
(function (ALL_COLLECTIONS) {
    ALL_COLLECTIONS["USERS"] = "users";
})(ALL_COLLECTIONS || (exports.ALL_COLLECTIONS = ALL_COLLECTIONS = {}));
exports.collections = {
    [ALL_COLLECTIONS.USERS]: exports.db.collection(ALL_COLLECTIONS.USERS),
};
