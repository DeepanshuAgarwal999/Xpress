"use client";
//@tx-nocheck
import { Range } from "react-date-range";
import { useCallback, useMemo, useState } from "react";
import { categories } from "@/app/components/navbar/Categories";
import { SafeListing, SafeUser, SafeReservation } from "@/app/types";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { Feature } from "@prisma/client";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  listing: SafeListing & { user: SafeUser };
  currentUser?: SafeUser | null;
  reserved?: SafeReservation[];
}

declare global {
  interface Window {
    Razorpay: any; // Specify the correct type for Razorpay if possible
  }
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reserved = [],
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: Date) => {
    setSelectedTime(time);
  };

  const disableDates = useMemo(() => {
    const disabledDates: Date[] = reserved.map(
      (reservation: any) => new Date(reservation.startDate)
    );
    return disabledDates;
  }, [reserved]);

  const [isLoading, setIsLoading] = useState(false);
  const taxRate = 0.02;
  const taxPrice = listing.price * taxRate;
  const total = (listing?.price + taxPrice).toFixed(2);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>([]);
  const [editFeatures, setEditFeatures] = useState(
    listing.features.map((feature) => ({
      service: feature.service,
      price: feature.price,
    }))
  );
  const removeEditfeature = async (index: number) => {
    let f = [];
    for (let i = 0; i < editFeatures.length; i++) {
      if (index !== i) {
        console.log(i);
        console.log(index);
        f.push({
          service: editFeatures[i].service,
          price: editFeatures[i].price,
        });
      }
    }
    await setEditFeatures(f);
    console.log(editFeatures);
  };
  const addEditfeature = async (s: string, p: number) => {
    let f = editFeatures;
    await f.push({
      service: s,
      price: p,
    });
    await setEditFeatures(f);
    console.log(editFeatures);
  };
  const updateEditfeature = async (s: string, p: number, i: number) => {
    let f = editFeatures;
    f[i].service = s;
    f[i].price = p;
    await setEditFeatures(f);
    console.log(editFeatures);
  };

  const applyEdits = () => {
    axios
      .patch(`/api/listings/${listing.id}`, {
        features: editFeatures,
      })
      .then((e) => {
        console.log(e.data);
      })
      .catch((error) => {
        toast.error("Something Went Wrong : " + error);
      })
      .finally(() => {
        window.location.reload();
      });
  };

  // const onCreateReservation = useCallback(() => {
  //   const total = selectedFeatures.reduce(
  //     (previous, current) => previous + current.price,
  //     0
  //   );
  //   const totalPriceAfterTax = (total + total * taxRate).toFixed(2);
  //   console.log({
  //     totalPrice: totalPriceAfterTax,
  //     startDate: selectedDate,
  //     startTime: selectedTime,
  //     listingId: listing?.id,
  //     features: selectedFeatures,
  //   })
  //   if (!currentUser) {
  //     return loginModal.onOpen();
  //   }
  //   setIsLoading(true);
  //   axios
  //     .post("/api/reservations", {
  //       totalPrice: parseInt(totalPriceAfterTax),
  //       startDate: selectedDate,
  //       startTime: selectedTime,
  //       listingId: listing?.id,
  //       features: selectedFeatures,
  //     })
  //     .then(() => {
  //       const makePayment = async () => {
  //         // "use server"
  //         // console.log("2")
  //         try {
  //           const key = process.env.RAZORPAY_API_KEY;
  //           console.log(key);
  //           // Make API call to the serverless API
  //           const data = await fetch("http://localhost:3000/api/razorpay", {
  //             method: "POST",
  //             body: JSON.stringify({
  //               totalPriceAfterTaxid: parseInt(totalPriceAfterTax),
  //             }),
  //           });
  //           console.log(data);
  //           const { order } = await data.json();
  //           console.log(order.id);
  //           const options = {
  //             key: key as string,
  //             name: "Xpress",
  //             currency: order.currency,
  //             amount: order.amount,
  //             order_id: order.id,
  //             description: "Understanding RazorPay Integration",
  //             // image: logoBase64,
  //             handler: async function (response: {
  //               razorpay_payment_id: string;
  //               razorpay_order_id: any;
  //               razorpay_signature: any;
  //             }) {
  //               console.log("HERE" + response);
  //               const data = await fetch(
  //                 "http://localhost:3000/api/paymentverify",
  //                 {
  //                   method: "POST",
  //                   body: JSON.stringify({
  //                     razorpay_payment_id: response.razorpay_payment_id,
  //                     razorpay_order_id: response.razorpay_order_id,
  //                     razorpay_signature: response.razorpay_signature,
  //                   }),
  //                 }
  //               );

  //               const res = await data.json();

  //               console.log("response verify==", res);

  //               if (res?.message == "success") {
  //                 console.log("redirected.......");
  //                 toast.success("Success");
  //                 setDateRange(initialDateRange);
  //                 router.refresh();
  //                 router.push("/upcoming");
  //                 const res = await fetch(
  //                   "http://localhost:3000/api/paymentregister",
  //                   {
  //                     method: "POST",
  //                     body: JSON.stringify({
  //                       listingId: listing.id!,
  //                       price: totalPriceAfterTax,
  //                     }),
  //                   }
  //                 );
  //                 if (!res) throw new Error();
  //               }
  //             },
  //             prefill: {
  //               name: "Xpress",
  //               email: currentUser?.email || "",
  //               contact: currentUser?.phoneNumber,
  //             },
  //           };
  //           const paymentObject = new window.Razorpay(options);
  //           paymentObject.open();
  //           paymentObject.on("payment.failed", function () {
  //             toast.error("Something went wrong");
  //           });
  //         } catch (err) {
  //           console.log(err);
  //           toast.error("Something went wrong");
  //         }
  //       };
  //       makePayment();
  //     })
  //     .catch(() => toast.error("Something went wrong"))
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, [
  //   totalPrice,
  //   selectedTime,
  //   selectedDate,
  //   router,
  //   currentUser,
  //   loginModal,
  //   listing?.id,
  // ]);

  const onCreateReservation = useCallback(() => {
    const total = selectedFeatures.reduce(
      (previous, current) => previous + current.price,
      0
    );
    const totalPriceAfterTax = (total + total * taxRate).toFixed(2);
    console.log({
      totalPrice: totalPriceAfterTax,
      startDate: selectedDate,
      startTime: selectedTime,
      listingId: listing?.id,
      features: selectedFeatures,
    });
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);
    try {
      const paymentHistory = async () => {
        const res = await axios.post("/api/reservations", {
          totalPrice: parseInt(totalPriceAfterTax),
          startDate: selectedDate,
          startTime: selectedTime,
          listingId: listing?.id,
          features: selectedFeatures,
        });
        console.log(res);
      };

      paymentHistory()
        .then(() => {
          fetch("http://localhost:3000/api/paymentregister", {
            method: "POST",
            body: JSON.stringify({
              listingId: listing?.id,
              price: totalPriceAfterTax,
              title: listing?.title,
              category: listing?.category,
            }),
          })
            .then((res) => {
              if (res) {
                toast.success("Reserved Successfully");
                window.location.href = "/upcoming";
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  }, [
    totalPrice,
    selectedTime,
    selectedDate,
    router,
    currentUser,
    loginModal,
    listing?.id,
  ]);

  const cate = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  const [featureVisibility, setFeatureVisibility] = useState<boolean[]>(
    listing.features.map(() => true)
  );
  const addSelectedFeatures = (featureIndex: number) => {
    const selectedFeature = listing.features[featureIndex];
    if (selectedFeature && !selectedFeatures.includes(selectedFeature)) {
      setSelectedFeatures((prevSelectedFeatures) => [
        ...prevSelectedFeatures,
        selectedFeature,
      ]);
      setFeatureVisibility((prevVisibility) =>
        prevVisibility.map((isVisible, index) =>
          index === featureIndex ? false : isVisible
        )
      );
    }
  };

  const removeFeature = (featureIndex: number) => {
    const featureNameToRemove = selectedFeatures[featureIndex].service;

    setSelectedFeatures((prevFeatures) =>
      prevFeatures.filter((_, index) => index !== featureIndex)
    );

    setFeatureVisibility((prevVisibility) =>
      prevVisibility.map((isVisible, index) => {
        const currentFeature = listing.features[index];
        return currentFeature && currentFeature.service === featureNameToRemove
          ? true
          : isVisible;
      })
    );
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex flex-col gap-6">
        <ListingHead
          title={listing.title}
          imageSrc={listing.imageSrc}
          id={listing.id}
          currentUser={currentUser}
          listing={listing}
          user={listing.user}
          category={cate}
        />

        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-4 px-8 sm:px-24">
          <ListingInfo
            currentUser={currentUser}
            features={listing.features}
            addFeature={addSelectedFeatures}
            editFeatures={editFeatures}
            addEditFeature={addEditfeature}
            removeEditFeature={removeEditfeature}
            updateEditFeature={updateEditfeature}
            applyEdits={applyEdits}
            user={listing.user}
            category={cate}
            description={listing.description}
            // locationValue={listing.locationValue}
            featureVisibility={featureVisibility}
          />
          <div className="order-first mb-10 md:order-last md:col-span-3">
            <ListingReservation
              removeFeature={removeFeature}
              features={selectedFeatures}
              price={listing.price}
              time={listing.time}
              totalPrice={totalPrice}
              onChangeDate={(value) => setDateRange(value)}
              dateRange={dateRange}
              onSubmit={onCreateReservation}
              disabled={isLoading}
              disableDates={disableDates}
              onSelect={handleDateSelect}
              handleTimeSelect={handleTimeSelect}
              reserved={reserved}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingClient;
