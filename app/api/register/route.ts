import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';
import { sendEmail } from '@/app/helpers/mailer';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password, phoneNumber } = body;

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        {email: email},
        {phoneNumber: phoneNumber}
      ],
    },
  });

  if(existingUser){
    return NextResponse.json({error: "User already registered with this email or phone number."})
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
      phoneNumber,
    },
  });
  
  await sendEmail({email,emailType:'VERIFY',userId:user.id})

  return NextResponse.json(user);
}
