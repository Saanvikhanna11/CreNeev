import "dotenv/config";
import bcrypt from "bcryptjs";

import { prisma } from "../lib/prisma.js";

async function createAdmin() {
  const name = process.env.ADMIN_NAME;
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!name || !email || !password) {
    throw new Error(
      "ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD must be provided in .env"
    );
  }

  const existingAdmin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  if (existingAdmin) {
    console.log(`Admin already exists: ${existingAdmin.email}`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.admin.create({
    data: {
      name,
      email,
      passwordHash,
    },
  });

  console.log(`Admin created successfully: ${admin.email}`);
}

createAdmin()
  .catch((error) => {
    console.error("Failed to create admin:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });