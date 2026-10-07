import helmet  from "helmet";
import cors from "cors";

export const securityMiddleware = helmet();

export const corsMiddleware = cors({
    origin: true,
    credentials: true,
});