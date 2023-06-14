import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getAll(_req: FastifyRequest, reply: FastifyReply) {
  const allUsers = await prisma.user.findMany();

  return reply.status(200).send({ allUsers });
}
