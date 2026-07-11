import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

import { leadRoutes } from "./routes/lead.routes.js";
import { authRoutes } from "./routes/auth.routes.js";
import { adminRoutes } from "./routes/admin.routes.js";

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is missing from the .env file");
  }

  app.register(cors, {
    origin: "http://localhost:5173",
  });

  app.register(jwt, {
    secret: jwtSecret,
  });

  app.get("/api/health", async () => {
    return {
      success: true,
      message: "CreNeev backend is running",
    };
  });

  app.register(leadRoutes);
  app.register(authRoutes);
  app.register(adminRoutes);

  return app;
}