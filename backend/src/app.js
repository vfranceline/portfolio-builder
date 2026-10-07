"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const index_ts_1 = require("./routes/index.ts");
const security_js_1 = require("./config/security.js");
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use(security_js_1.securityMiddleware);
app.use(security_js_1.corsMiddleware);
app.use("/api", index_ts_1.router);
