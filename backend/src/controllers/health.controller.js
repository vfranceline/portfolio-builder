"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = healthCheck;
function healthCheck(_request, response) {
    response.status(200).json({
        status: "ok",
        service: "portfolio-builder-api"
    });
}
