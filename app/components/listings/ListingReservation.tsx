"use client";

import { useState } from "react";
import { Range } from "react-date-range";
import {
  addDays,
  addHours,
} from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

import Button from "../Button";
import { Feature } from "@prisma/client";
import { SafeReservation } from "@/app/types";
import ListingReservationModal from "./ListingReservationModal";

interface TimeOption {
  value: string;
  label: string;
}

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disableDates: Date[];
  onSelect: (date: Date) => void;
  handleTimeSelect: (time: Date) => void;
  reserved: SafeReservation[];
  features: Feature[];
  offTime: string[];
  removeFeature: (featureIndex: number) => void;
  time: string;
  selectedTimeFeature: Date[]
  selectedDate: Date;
  setSelectedDate: (date: Date) => void
  setSelectedTimeFeature: (date: Date[]) => void | Date[]
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  onSubmit,
  onSelect,
  disabled,
  handleTimeSelect,
  reserved = [],
  features,
  removeFeature,
  time,
  offTime,
  selectedDate,
  setSelectedDate,
  selectedTimeFeature,
  setSelectedTimeFeature,
}) => {
  const [index, setIndex] = useState<number | null>(null);


  let nextDay = addHours(addDays(new Date().setMinutes(0), 0), 2);
  let test = new Date();
  if (test.getHours() > 19) {
    nextDay = addHours(nextDay, 24 - test.getHours() + 8);
  } else if (test.getHours() < 10) {
    nextDay = addHours(nextDay, 8 - test.getHours());
  }

  const taxRate = 0.02;
  const total = features.reduce(
    (previous, current) => previous + current.price,
    0
  );
  const totalPriceAfterTax = (total + total * taxRate).toFixed(2);
  const taxPrice = total * taxRate;

  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      {features.length > 0 && <h1 className="text-xl font-semibold  p-2">Select Time</h1>}
      {features.map((feature, index) => (
        <div key={index} className="feature grid grid-cols-3 py-2 ">
          <h1 className="text-lg font-semibold px-2 italic capitalize" > {feature.service}</h1>
          <div className="">₹{feature.price}</div>
          <button className="text-red-400" onClick={() => removeFeature(index)}>
            Cancel
          </button>
          <button onClick={() => setIndex(index)}>
            {selectedTimeFeature[index]?.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
          </button>
        </div>
      ))}
      <hr />
      {index != null && (
        <ListingReservationModal
          time={time}
          offTime={offTime}
          selectedDate={selectedDate}
          reserved={reserved}
          features={features}
          handleTimeSelect={handleTimeSelect}
          setSelectedDate={setSelectedDate}
          onSelect={onSelect}
          modalKey={index}
          setIndex={setIndex}
          setSelectedTimeFeature={setSelectedTimeFeature}
        />
      )}
      <hr />
      <div className="flex flex-col p-2">
        <div className="px-2 font-semibold text-sm ">
          {features.map((feature, index) => (
            <div key={index} className="feature grid grid-cols-3 py-2">
              {feature.service}
              <div className="">₹{feature.price}</div>
              <button
                className="text-red-400"
                onClick={() => removeFeature(index)}
              >
                Cancel
              </button>
            </div>
          ))}
          <div className="grid grid-cols-3">
            <div>Tax(2%)</div>
            <div>₹{taxPrice.toFixed(2)}</div>
          </div>
        </div>

        <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg ">
          <div>Total</div>
          <div>₹{totalPriceAfterTax}</div>
        </div>

        <Button label="Reserve" disabled={disabled} onClick={onSubmit} />
      </div>
    </div>
  );
};

export default ListingReservation;
