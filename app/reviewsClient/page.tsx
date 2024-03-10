"use client";
import React, { useEffect, useRef, useState } from "react";
import EmptyState from "../components/EmptyState";
import axios from "axios";
import { previousDay } from "date-fns";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import timeFormatAgo from "../libs/utils/TimeFormat";
import Button from "../components/Button";

// ... (import statements)

interface ReviewType {
  id: string;
  userId: string;
  listingId: string;
  comment: string | null;
  createdAt: string;
  user: {
    name: string | null;
  };
}

const ReviewsClient = ({
  listingId,
  userId,
}: {
  listingId: string;
  userId: string;
}) => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);

  const handleUpdating = (comment: string, id: string) => {
    ref?.current?.focus();
    setInputValue(comment);
    setIsUpdating(id);
  };

  useEffect(() => {
    const getReviews = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/api/reviews/${listingId}`);
        if (data) setReviews(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (listingId) getReviews();
  }, [listingId]); // Added listingId as a dependency to useEffect;

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (inputValue.length < 3)
        return toast.error("Value must be greater than 3");
      const sendReview = await axios.post(`/api/reviews/${listingId}`, {
        userId: userId,
        comment: inputValue,
      });
      if (sendReview) {
        toast.success("Review added Successfully");
        window.location.href = "";
      } else {
        toast.error("Unable to give review");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setInputValue("");
      setIsLoading(false);
    }
  };

  const handleDelete = async (reviewId: string) => {
    setIsLoading(true);
    try {
      const { data } = await axios.delete(`/api/reviews/${reviewId}`);
      if (data) {
        toast.success("review deleted successfully");
        window.location.href = "";
      } else {
        toast.error("Unable to delete");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleUpdate = async (reviewId: string) => {
    setIsLoading(true);
    try {
      if (inputValue.length < 3)
        return toast.error("Comment must be greater than 3 words");
      const { data } = await axios.patch(`/api/reviews/${reviewId}`, {
        comment: inputValue,
      });
      if (data) {
        toast.success("review updated successfully");
        setIsUpdating(null);
        setInputValue("");
        window.location.href = "";
      } else {
        toast.error("Unable to delete");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  if (!reviews || reviews.length === 0) {
    return (
      <div className="mt-10 text-center">
        <h1 className="text-2xl font-semibold">No Reviews yet!!</h1>
        <p className="text-xl font-semibold my-5">Be the first one To review</p>
        <input
          type="text"
          placeholder="Give a review"
          value={inputValue}
          className="w-full max-w-[300px] md:max-w-[400px] outline-none border-b-2  py-3 px-2 mr-4 "
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="px-4 py-3 bg-black text-white font-semibold rounded-xl"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          Share Review
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mt-10 w-full flex flex-col relative">
        <h1 className="max-sm:text-lg sm:text-xl lg:text-3xl border-b py-2 ">
          Reviews
        </h1>
        <div className="max-h-[300px] overflow-y-scroll no-scrollbar">
          {reviews?.map((review, i) => (
            <div key={i}>
              <div className="flex justify-between items-center max-sm:text-xs max-sm:gap-2 w-full px-2  border-b border-[#27272C] py-2 my-10">
                <div className="flex flex-col gap-2">
                  <h2>
                    Posted By - &nbsp;
                    <span className="font-semibold">
                      {review.user?.name || "Anonymous"}
                    </span>
                  </h2>
                  <h1>{review.comment}</h1>
                </div>
                <div className="flex flex-col gap-1 ">
                  {review.userId === userId ? (
                    <div className="flex gap-2">
                      {isUpdating === review.id ? (
                        <Button
                          disabled={isLoading}
                          label="Save"
                          onClick={() => handleUpdate(review.id)}
                        />
                      ) : (
                        <Button
                          disabled={isLoading}
                          onClick={() =>
                            handleUpdating(review.comment!, review.id)
                          }
                          label="Edit"
                        />
                      )}
                      <Button
                        label="delete"
                        disabled={isLoading}
                        onClick={() => handleDelete(review.id)}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <h3 className="text-xs">
                    Posted - {timeFormatAgo(review.createdAt)}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 justify-between mt-10">
          <input
            type="text"
            placeholder="Give a review"
            value={inputValue}
            className="outline-none border-b-2 py-3 px-2 border-black text-lg "
            onChange={(e) => setInputValue(e.target.value)}
            ref={ref}
          />
          {!isUpdating ? (
            <button
              className="px-4 py-3 bg-black text-white font-semibold rounded-xl"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              Share Review
            </button>
          ) : (
            ""
          )}
        </div>
        {/* {isToggled && <Review onSubmit={addReview} />} */}
      </div>
    </div>
  );
};

export default ReviewsClient;
