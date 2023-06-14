import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function auth(req: FastifyRequest, reply: FastifyReply) {
  const authBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(4),
  });

  const { email, password } = authBodySchema.parse(req.body);

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const comparePassword = await compare(password, user.password_hash);

  if (!comparePassword) {
    throw new Error("Invalid credentials");
  }

  const token = await reply.jwtSign({
    sign: {
      sub: user.id,
    },
  });

  return {
    token,
  };
}
