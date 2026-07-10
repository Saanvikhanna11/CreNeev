import Fastify from "fastify";
import cors from "@fastify/cors";
import { leadRoutes } from "./routes/lead.routes.js";

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.register(cors, {
    origin: "http://localhost:5173",
  });

  app.get("/api/health", async () => {
    return {
      success: true,
      message: "CreNeev backend is running",
    };
  });

  app.register(leadRoutes);

  return app;
}