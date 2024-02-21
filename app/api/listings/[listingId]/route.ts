import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
export async function PATCH(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  const body = await request.json();
  const{features}=body;
  if (!currentUser) {
    return NextResponse.error();
  }
  const { listingId } = params;
  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }
  const listing = await prisma.listing.updateMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
    data:{
      features:features
    }
  });
  const updatedListing = await prisma.listing.findUnique({
    where:{
      id:listingId
    }
  })
  
  return NextResponse.json(updatedListing);
}
export async function PUT(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  const body = await request.json();
  if (!currentUser) {
    return NextResponse.error();
  }
  const { listingId } = params;
  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }
  const listing = await prisma.listing.updateMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
    data:{
      approved:true
    }
  });
  const updatedListing = await prisma.listing.findUnique({
    where:{
      id:listingId
    }
  })
  
  return NextResponse.json(updatedListing);
}
