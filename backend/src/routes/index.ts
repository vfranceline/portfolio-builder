import { Router } from "express";
import { healthRouter } from "./health.routes";

const router = Router();

// router.get("/health", (_req, res) => {
//   res.json({
//     status: "ok",
//     service: "portfolio-builder-api"
//   });
// });

router.use("/health", healthRouter)

export { router };