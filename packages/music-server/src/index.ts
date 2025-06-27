import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import express from "express";
import http from "http";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginDrainHttpServerOptions,
} from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import audioRouter from "./router/audioRouter";
import musicRouter from "./router/musicRouter";

// const server = new ApolloServer({ typeDefs, resolvers });
async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "http://music-app-austru-bucket.s3-website.ap-northeast-2.amazonaws.com",
        "https://music-app-austru-bucket.s3-website.ap-northeast-2.amazonaws.com",
        "http://43.201.107.123:4000",
        "http://43.201.107.123",
        "https://*.vercel.app",
        "https://*.vercel.app/*"
      ],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"]
    })
  );
  app.use("/audio", audioRouter);
  app.use("/music", musicRouter);
  app.use(express.json(), expressMiddleware(server));
  httpServer.listen(4000, () => {
    console.log("Server is running on http://localhost:4000");
  });
}

startServer();
