"use client";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import Link from "next/link";

interface Props {
  listingId: string;
  approved: boolean;
  userId: string;
}
const Approval = ({ listingId, approved, userId }: Props) => {
  const router = useRouter();
  async function handleApprove() {
    try {
      const { data } = await axios.patch(`api/approvelistings/${listingId}`);
      if (data.approved) {
        toast.success("Approved Successfully");
      } else if (data.approved === false) {
        toast.success("Disapproved Successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      router.refresh();
    }
  }

  return (
    <div className="flex gap-2">
      {approved ? (
        <Button
          onClick={() => {
            handleApprove();
          }}
          sx={{ color: "red" }}
        >
          Unapprove
        </Button>
      ) : (
        <div className="flex gap-4 items-center">
          <Button
            onClick={() => {
              handleApprove();
            }}
          >
            Approve
          </Button>
          <Link href={`/admin/verifyaadhaar/${userId}`}>
            <Button>verify Aadhaar</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Approval;
