import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pkg;

const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
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
