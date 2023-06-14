import { prisma } from "@/lib/prisma";
import { registerUseCase } from "@/use-cases/users/register";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(4),
  });

  const { name, email, password } = registerBodySchema.parse(req.body);

  try {
    registerUseCase({ name, email, password });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
