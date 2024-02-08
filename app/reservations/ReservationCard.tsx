"use client";

import Image from "next/image";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef,  useCallback, useMemo, useState } from "react";
import { format } from "date-fns";

import Button from "../components/Button";
import toast from "react-hot-toast";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  handleVerify: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  handleVerify,
  disabled,
  actionId = "",
  actionLabel,
  currentUser,
}) => {
  const router = useRouter();
  const [otpInput, setOtpInput] = useState(new Array(6).fill(""));
  const [open, setOpen] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newOtpValue = e.target.value;
  
    // Updating the state only if the new value is a single digit or empty (for backspace)
    if (/^[0-9]$/.test(newOtpValue) || newOtpValue === "") {
      const newOtpInput = [...otpInput];
      newOtpInput[index] = newOtpValue;
      setOtpInput(newOtpInput);
  
      // If a value is entered, move to the next field
      if (newOtpValue && index < otpInput.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  useEffect(() => {
    // Clear OTP input when modal is closed
    if (!open) {
      setOtpInput(new Array(6).fill(""));
    }
  }, [open]);

  // Function to verify the OTP
  const verifyOtp = () => {
    const otp = otpInput.join("");
    if (Number(otp) === reservation?.otp) {
      handleVerify(reservation.id);
      handleClose();
    } else {
      toast.error("Wrong OTP");
    }
  };

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }
      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data?.price;
  }, [reservation, data?.price]);

  const otp = "otp :" + reservation?.otp;
  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const startTime = new Date(reservation.startTime);
    const date = new Date(reservation.startDate);
    if (startTime) {
      return `${format(startTime, "PPpp")}`;
    } else return `${format(date, "PPpp")}`;
  }, [reservation]);
  return (
    <>
      <div className="col-span-1 cursor-pointer group">
        <div className="flex flex-col gap-1 w-full">
          <div
            onClick={() => router.push(`/listings/${data.id}`)}
            className="w-full  relative overflow-hidden rounded-xl aspect-square"
          >
            <Image
              src={data.imageSrc}
              alt="image"
              className="h-full w-full object-cover group-hover:scale-110 transition"
              fill
            />
          </div>
          <div
            onClick={() => router.push(`/listings/${data.id}`)}
            className=" font-semibold text-lg"
          >
            {reservationDate || data.category}{" "}
            {currentUser?.id != data.userId && reservation?.totalPrice && otp}
          </div>
          <div
            onClick={() => router.push(`/listings/${data.id}`)}
            className="font-semibold text-neutral-500"
          >
            {data.title}
          </div>
          <div
            onClick={() => router.push(`/listings/${data.id}`)}
            className=" text-sm flex gap-2"
          >
          </div>
          <div className="flex  flex-row items-center gap-1">
            <div className="font-bold text-lg">₹ {price}</div>
          </div>
          {onAction && actionLabel && (
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          )}
          {!(currentUser?.id != data.userId && reservation?.totalPrice) && (
            <>
              <Button onClick={handleOpen} label="enter otp"></Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div className="flex flex-row justify-center items-center space-x-2 my-6">
                    {otpInput.map((_, index) => {
                      return (
                        <React.Fragment>
                          <input
                          key={index}
                          ref={el => inputRefs.current[index] = el}
                          maxLength={1}
                          value={otpInput[index]}
                            onChange={(e) => {
                              handleOtpChange(e,index);
                            }}
                            type="text"
                            className="w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-gray-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition"
                            onKeyUp={(e)=>{
                              if (e.key === "Backspace" && index > 0 && otpInput[index] === '') {
                                inputRefs.current[index - 1]?.focus();
                              }
                            }}
                          />
                          {index === otp.length - 1 ? null : (
                            <span className="w-2 py-0.5 bg-gray-400" />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                  <Button
                    disabled={disabled}
                    small
                    label="Verify"
                    onClick={verifyOtp}
                  />
                </Box>
              </Modal>
              {console.log(reservation?.otp)}{" "}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ListingCard;
