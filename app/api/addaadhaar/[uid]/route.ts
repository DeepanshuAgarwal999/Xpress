import { NextResponse } from "next/server";
import getUser from "@/app/actions/getUserbyId";

interface IParams {
  uid?: string;
}

export async function GET( request:Request ,{ params }: { params: IParams }) {
    try {
      console.log(params)
      const {uid} = params;
      const currentUser = await getUser(uid!); // Get the user with id
      if (!currentUser) {
        return NextResponse.error();
      }
      return NextResponse.json(currentUser);
    } catch (error) {
      console.log(error);
    }
  }