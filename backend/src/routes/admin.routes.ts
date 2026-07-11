import type { FastifyInstance } from "fastify";

import { prisma } from "../lib/prisma.js";
import { authenticateAdmin } from "../middleware/authenticate.js";

type LeadQuery = {
  status?: string;
  package?: string;
  search?: string;
};

export async function adminRoutes(app: FastifyInstance) {
  app.get<{ Querystring: LeadQuery }>(
    "/api/admin/leads",
    {
      preHandler: authenticateAdmin,
    },
    async (request, reply) => {
      const {
        status,
        package: selectedPackage,
        search,
      } = request.query;

      const leads = await prisma.lead.findMany({
        where: {
          ...(status
            ? {
                status: status as never,
              }
            : {}),
          ...(selectedPackage
            ? {
                package: selectedPackage as never,
              }
            : {}),
          ...(search
            ? {
                OR: [
                  {
                    name: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                  {
                    email: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                  {
                    businessName: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                ],
              }
            : {}),
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return reply.status(200).send({
        success: true,
        count: leads.length,
        data: leads,
      });
    }
  );
}