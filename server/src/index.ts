import dotenv from "dotenv";
import { C2Server } from "./core/server";
import { Database } from "./core/database";
import { router } from "./routes";

dotenv.config();

if (!process.env.SERVER_PORT) {
  throw new Error("SERVER_PORT env var is not defined");
}

if (!process.env.DB_URL) {
  throw new Error("DB_URL env var is not defined");
}

const server = new C2Server({
  port: parseInt(process.env.SERVER_PORT),
  router,
});

const database = new Database(process.env.DB_URL);

database.on("db_connected", () => {
  server.run();
});

database.on("db_disconnected", () => {
  server.stop();
});

database.connect();

// npx nodemon
