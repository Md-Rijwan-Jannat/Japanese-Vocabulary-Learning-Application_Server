"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccessToken = void 0;
// utils/tokenHelper.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const createAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, config_1.default.jwt_secret, {
        expiresIn: config_1.default.jwt_expires_in,
    });
};
exports.createAccessToken = createAccessToken;
