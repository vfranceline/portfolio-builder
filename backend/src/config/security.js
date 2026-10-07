"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsMiddleware = exports.securityMiddleware = void 0;
const helmet_1 = require("helmet");
const cors_1 = require("cors");
exports.securityMiddleware = (0, helmet_1.helmet)();
exports.corsMiddleware = (0, cors_1.cors)({
    origin: true,
    credentials: true,
});
