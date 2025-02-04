import dotenv from "dotenv";
import { C2Server } from "./core/server";
import { router } from "./routes";

dotenv.config();

if (!process.env.SERVER_PORT) {
  throw new Error("SERVER_PORT env var is not defined");
}

const server = new C2Server({
  port: parseInt(process.env.SERVER_PORT),
  router,
});

server.run();

// npx nodemon
