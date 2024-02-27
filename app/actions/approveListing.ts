
import prisma from "@/app/libs/prismadb";

export interface IParams {
  listingId?: string;
}

export async function approveListing(params: IParams) {
  try {
    const { listingId } = params;
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: { user: true },
    });

    // Check if listing exists
    if (!listing) {
      throw new Error("Listing not found");
    }
    // Update the listing in the database
    const updatedListingInDB = await prisma.listing.update({
      where: { id: listingId },
      data: { approved: true },
      include: { user: true },
    });

    return updatedListingInDB;
  } catch (error:any) {
    throw new Error(error);
  }
}
