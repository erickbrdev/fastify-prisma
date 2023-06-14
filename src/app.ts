import fastify from "fastify";
import { usersRouter } from "./http/controllers/users/router";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.SECRET_JWT,
  sign: {
    expiresIn: "15m",
  },
});

app.register(usersRouter);
