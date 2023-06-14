import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { hash } from "bcrypt";

interface IRegisterUseCase {
  name: string;
  email: string;
  password: string;
}

export async function registerUseCase({
  name,
  email,
  password,
}: IRegisterUseCase) {
  const password_hash = await hash(password, 4);

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error("User already exists");
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  });
}
