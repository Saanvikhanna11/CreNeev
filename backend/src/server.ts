import { buildApp } from "./app.js";

const startServer = async () => {
  const app = buildApp();

  try {
    await app.listen({
      port: 5000,
      host: "0.0.0.0",
    });

    console.log("CreNeev backend running on http://localhost:5000");
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

startServer();