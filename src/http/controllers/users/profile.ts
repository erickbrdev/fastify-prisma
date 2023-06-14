import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(req: FastifyRequest, reply: FastifyReply) {
  const userId = req.user.sign.sub;

  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      name: true,
      email: true
    }
  })

  return reply.status(200).send({
    user
  })
}
