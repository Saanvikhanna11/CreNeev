import type { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma.js";
import {
  PackageType,
  type Prisma,
} from "../../generated/prisma/client.js";

type CreateLeadBody = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  industry: string;
  package: PackageType;
  timeline?: string;
  projectDetails: string;
  selectedServices?: string[];
  estimatedBudget?: string;
};

export async function leadRoutes(app: FastifyInstance) {
  app.post<{ Body: CreateLeadBody }>("/api/leads", async (request, reply) => {
    const {
      name,
      email,
      phone,
      businessName,
      industry,
      package: selectedPackage,
      timeline,
      projectDetails,
      selectedServices = [],
      estimatedBudget,
    } = request.body;

    if (
      !name?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !businessName?.trim() ||
      !industry?.trim() ||
      !selectedPackage ||
      !projectDetails?.trim()
    ) {
      return reply.status(400).send({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    const validPackages = Object.values(PackageType);

    if (!validPackages.includes(selectedPackage)) {
      return reply.status(400).send({
        success: false,
        message: "Invalid package selected.",
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      return reply.status(400).send({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    const phoneDigits = phone.replace(/\D/g, "");

    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      return reply.status(400).send({
        success: false,
        message: "Please enter a valid phone number.",
      });
    }

    if (name.trim().length < 2) {
      return reply.status(400).send({
        success: false,
        message: "Name must contain at least 2 characters.",
      });
    }

    if (businessName.trim().length < 2) {
      return reply.status(400).send({
        success: false,
        message: "Business name must contain at least 2 characters.",
      });
    }

    if (industry.trim().length < 2) {
      return reply.status(400).send({
        success: false,
        message: "Please enter a valid industry.",
      });
    }

    if (projectDetails.trim().length < 10) {
      return reply.status(400).send({
        success: false,
        message: "Please provide at least 10 characters about your project.",
      });
    }

    if (
      !Array.isArray(selectedServices) ||
      !selectedServices.every(
        (service) =>
          typeof service === "string" &&
          service.trim().length > 0
      )
    ) {
      return reply.status(400).send({
        success: false,
        message: "Selected services are invalid.",
      });
    }

    const cleanedServices = selectedServices.map((service) =>
      service.trim()
    );

    const leadData: Prisma.LeadCreateInput = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phoneDigits,
      businessName: businessName.trim(),
      industry: industry.trim(),
      package: selectedPackage,
      timeline: timeline?.trim() || null,
      projectDetails: projectDetails.trim(),
      selectedServices: cleanedServices,
      estimatedBudget: estimatedBudget?.trim() || null,
    };

    try {
      const lead = await prisma.lead.create({
        data: leadData,
      });

      return reply.status(201).send({
        success: true,
        message: "Your project enquiry has been submitted successfully.",
        data: lead,
      });
    } catch (error) {
      request.log.error(error);

      return reply.status(500).send({
        success: false,
        message:
          "We could not submit your enquiry right now. Please try again shortly.",
      });
    }
  });
}