"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthRouter = void 0;
const express_1 = require("express");
const health_controller_js_1 = require("../controllers/health.controller.js");
const healthRouter = (0, express_1.Router)();
exports.healthRouter = healthRouter;
healthRouter.get("/", health_controller_js_1.healthCheck);
