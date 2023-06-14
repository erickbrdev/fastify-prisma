import { FastifyInstance } from "fastify";
import { register } from "./register";
import { getAll } from "./getAll";
import { auth } from "./auth";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { profile } from "./profile";

export async function usersRouter(app: FastifyInstance) {
  app.get("/users", getAll);
  app.post("/users", register);
  app.post("/sessions", auth);

  app.get("/me", { onRequest: [verifyJWT] }, profile);
}
