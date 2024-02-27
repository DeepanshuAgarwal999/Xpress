import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { IParams } from "@/app/actions/approveListing";

export async function PATCH(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }
  const toggleListing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
  });

  await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      approved: !toggleListing!.approved,
    },
  });

  const updatedListing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
  });

  return NextResponse.json(updatedListing);
}
