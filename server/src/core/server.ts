import http, { Server } from "http";
import { WebSocket, WebSocketServer } from "ws";
import cors from "cors";
import express, { Express, Router } from "express";
import logger from "./logger";

interface ServerOptions {
  port: number;
  router: Router;
}

export class C2Server {
  app: Express;
  port: number;
  router: Router;
  websocketServer: WebSocketServer | null;
  c2server: Server;

  constructor(options: ServerOptions) {
    this.app = express();
    this.router = options.router;
    this.port = options.port;
    this.websocketServer = null;
    this.c2server = http.createServer(this.app);

    this.init();
  }

  init() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(this.router);
  }

  run() {
    this.c2server.listen(this.port, () => {
      logger.info(`http server started [${this.port}]`);
      try {
        this.startWebsocketServer();
        logger.info(`websocket server initialized`);
      } catch (error) {
        logger.error(`failed to initialize websocket server: [${error}]`);
      }
    });
    this.c2server.on("error", (error) => {
      logger.error(`http server error: [${error}]`);
    });
  }

  startWebsocketServer() {
    this.websocketServer = new WebSocketServer({ server: this.c2server });
    this.websocketServer.on("connection", (websocket, req) => {
      websocket.on("message", this.onWebsocketMessage);
      websocket.on("close", this.onWebsocketClose);
      websocket.on("error", this.onWebsocketError);
    });
  }

  onWebsocketMessage(message: string | Buffer | ArrayBuffer | Buffer[]) {
    console.log(message);
  }
  onWebsocketClose() {}
  onWebsocketError() {}
}
