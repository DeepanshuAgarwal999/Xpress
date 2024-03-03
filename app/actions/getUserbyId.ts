// import prisma from "@/app/libs/prismadb";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getUser(userId: string) {
    console.log(userId)
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    console.log(getUser);
    
    
    if (!getUser) {
      throw new Error("User not found");
    }

    return getUser;
  } catch (error: any) {
    throw new Error(error);
  }
}
