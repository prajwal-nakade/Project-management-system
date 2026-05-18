import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pkg;

const client = new Client({
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "prajwal478",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || "project_management",
});

export const connectdb = async () => {
  try {
    await client.connect();

    console.log("DB Connected");
  } catch (error) {
    console.error(error);
  }
};

process.on("SIGINT", async () => {
  await client.end();
  process.exit(0);
});

export default client;