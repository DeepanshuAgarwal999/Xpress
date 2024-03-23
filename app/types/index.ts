import { Listing, Reservation, User } from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export declare type SafeReservation = Omit<Reservation, "createdAt" | "listing"> & {
  createdAt: string;
  startDate: string[];
  startTime: string[];
  listing: SafeListing;
};
export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
