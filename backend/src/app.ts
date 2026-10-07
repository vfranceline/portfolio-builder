import express from "express";
import { router } from "./routes/index";
import { securityMiddleware, corsMiddleware } from "./config/security";

const app = express();

app.use(express.json());
app.use(securityMiddleware);
app.use(corsMiddleware);

app.use("/api", router);

export { app };