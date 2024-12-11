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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const auth_model_1 = require("./auth.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const auth_utils_1 = require("./auth.utils");
const registerFromDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if user already exists
    const existingUser = yield auth_model_1.User.findOne({ email: userData.email });
    if (existingUser) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'User already exists');
    }
    // Create user
    const newUser = yield auth_model_1.User.create(Object.assign({}, userData));
    // Generate access token
    const token = (0, auth_utils_1.createAccessToken)({ id: newUser._id, role: newUser.role });
    return { user: newUser, token };
});
const loginFromDB = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password, }) {
    const user = yield auth_model_1.User.findOne({ email }).select('+password');
    console.log('Fetched User Data:', user);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (!(yield auth_model_1.User.isPasswordMatched(password, user === null || user === void 0 ? void 0 : user.password)))
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Incorrect password');
    // Generate access token
    const token = (0, auth_utils_1.createAccessToken)({ id: user._id, role: user.role });
    return { user, token };
});
exports.AuthService = {
    registerFromDB,
    loginFromDB,
};
