import type { FastifyInstance } from "fastify";
import bcrypt from "bcryptjs";

import { prisma } from "../lib/prisma.js";

type LoginBody = {
  email: string;
  password: string;
};

export async function authRoutes(app: FastifyInstance) {
  app.post<{ Body: LoginBody }>(
    "/api/auth/login",
    async (request, reply) => {
      const email = request.body.email?.trim().toLowerCase();
      const password = request.body.password;

      if (!email || !password) {
        return reply.status(400).send({
          success: false,
          message: "Email and password are required.",
        });
      }

      const admin = await prisma.admin.findUnique({
        where: {
          email,
        },
      });

      if (!admin) {
        return reply.status(401).send({
          success: false,
          message: "Invalid email or password.",
        });
      }

      const passwordMatches = await bcrypt.compare(
        password,
        admin.passwordHash
      );

      if (!passwordMatches) {
        return reply.status(401).send({
          success: false,
          message: "Invalid email or password.",
        });
      }

      const token = app.jwt.sign(
        {
          adminId: admin.id,
          email: admin.email,
        },
        {
          expiresIn: "8h",
        }
      );

      return reply.status(200).send({
        success: true,
        message: "Login successful.",
        token,
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
        },
      });
    }
  );
}