import prisma from "@/app/libs/prismadb";

export default async function getReviews(listingId: string) {
  try {
    const data = await prisma?.review.findMany({
      where: {
        listingId,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    return data;
  } catch (error: any) {
    throw new Error("Id is not valid", error);
  }
}
