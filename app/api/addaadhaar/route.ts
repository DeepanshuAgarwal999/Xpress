import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function PATCH(request: Request) {
  console.log("called");
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }
    const body = await request.json();
    const { aadhaar, aadhaarBackImg, aadhaarFrontImg } = body;
    if (!aadhaar || !aadhaarBackImg || !aadhaarFrontImg)
      throw new Error("Invalid aadhaar");
    if (currentUser.aadhaar) throw new Error("aadhaar already exist");
    await prisma.user.update({
      where: {
        id: currentUser!.id!,
      },
      data: {
        aadhaar,
        aadhaarImgSrcFront: aadhaarFrontImg,
        aadhaarImgSrcBack: aadhaarBackImg,
      },
    });

    const updatedUser = await prisma.user.findUnique({
      where: {
        id: currentUser!.id!,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);
  }
}
export async function GET(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }
    return NextResponse.json(currentUser);
  } catch (error) {
    console.log(error);
  }
}
