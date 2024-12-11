"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT,
    database_url: process.env.database_url,
    NODE_ENV: process.env.NODE_ENV,
    jwt_secret: process.env.jwt_secret,
    jwt_expires_in: process.env.jwt_expires_in,
    bcrypt_salt_rounds: process.env.bcrypt_salt_rounds,
};
