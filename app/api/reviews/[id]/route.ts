import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReviews from "@/app/actions/getReviews";
interface IParams {
  id: string;
}
// listing id

interface IRequestBody {
  userId: string;
  comment: string;
}
export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    const { id } = params;
    const reviews = await getReviews(id); // Get the user with id
    if (!reviews) {
      return NextResponse.json("No review to show");
    }
    return NextResponse.json(reviews);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "User Not authorized" }, { status: 401 });
  }
  try {
    const { id } = params;
    const body = await request.json();
    const { userId, comment } = body;

    if (!userId || !comment || !id) {
      return NextResponse.json("All fields are required");
    }

    const review = await prisma.review.create({
      data: {
        userId,
        listingId: id,
        comment,
      },
    });

    return NextResponse.json({ message: "Review posted successfully", review });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "An error occurred while posting the review." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { error: "User Not authorized" },
        { status: 401 }
      );
    }
    const { id } = params;
    if (!id) {
      return NextResponse.json("Review ID is required");
    }

    // Check if the review exists
    const existingReview = await prisma.review.findUnique({
      where: {
        id,
      },
    });

    if (!existingReview) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    // Check if the current user is the owner of the review
    if (existingReview.userId !== currentUser.id) {
      return NextResponse.json(
        { error: "User is not authorized to delete this review" },
        { status: 403 }
      );
    }

    // Delete the review
    await prisma.review.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "An error occurred while deleting the review." },
      { status: 500 }
    );
  }
}

interface IPatchRequestBody {
  comment: string;
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { error: "User Not authorized" },
        { status: 401 }
      );
    }
    const { id } = params;

    if (!id) {
      return NextResponse.json("review ID is required");
    }

    const body = await request.json();
    const { comment } = body;
    if (!comment) {
      return NextResponse.json("At least one field is required for updating");
    }
    // Check if the review exists
    const existingReview = await prisma.review.findUnique({
      where: {
        id,
      },
    });

    if (!existingReview) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }
    // Check if the current user is the owner of the review
    if (existingReview.userId !== currentUser?.id) {
      return NextResponse.json(
        { error: "User is not authorized to update this review" },
        { status: 403 }
      );
    }

    // Update the review
    const updatedReview = await prisma.review.update({
      where: {
        id,
      },
      data: {
        comment,
      },
    });

    return NextResponse.json({
      message: "Review updated successfully",
      review: updatedReview,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "An error occurred while updating the review." },
      { status: 500 }
    );
  }
}
