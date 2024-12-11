"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("../module/Auth/auth.routes");
const user_routes_1 = require("../module/User/user.routes");
const lessons_routes_1 = require("../module/Lessons/lessons.routes");
const vocabulary_routes_1 = require("../module/Vocabulary/vocabulary.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_routes_1.UserRoutes,
    },
    {
        path: '/lessons',
        route: lessons_routes_1.LessonRoutes,
    },
    {
        path: '/vocabularies',
        route: vocabulary_routes_1.VocabularyRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
