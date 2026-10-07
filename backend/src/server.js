"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = require("./app.js");
const PORT = process.env.PORT || 3000;
app_js_1.app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
});
