"use client";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

interface Props {
  listingId: string;
  approved: boolean;
}
const Approval = ({ listingId, approved }: Props) => {
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
        <Button
          onClick={() => {
            handleApprove();
          }}
        >
          Approve
        </Button>
      )}
    </div>
  );
};

export default Approval;
