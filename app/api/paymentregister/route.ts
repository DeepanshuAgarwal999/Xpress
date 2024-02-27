import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

interface Props {
  listingId: string;
  price: string;
  title: string;
  category: string;
}
export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const body: unknown = await request.json();
  const { listingId, price, title, category } = body as Props;
  if (!currentUser) {
    return NextResponse.error();
  }
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }
  const payment: unknown = await prisma?.paymentHistory.create({
    data: {
      listingId,
      amount: parseInt(parseFloat(price)),
      userId: currentUser.id,
      title,
      category,
    },
  });
  if (!payment) {
    return NextResponse.error();
  }
  return NextResponse.json({
    status: 200,
    message: "payment history saved",
  });
}
