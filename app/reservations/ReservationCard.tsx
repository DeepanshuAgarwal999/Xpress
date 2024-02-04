'use client';

import Image from 'next/image';
import { CiLocationOn } from 'react-icons/ci';
import useCountries from '@/app/hooks/useCountries';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { format } from 'date-fns';

import Button from '../components/Button';
import toast from 'react-hot-toast';
import { verify } from 'crypto';

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  handleVerify: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null  ;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  handleVerify,
  disabled,
  actionId = '',
  actionLabel,
  currentUser,
}) => {
  const [otps,setOtps] = useState("")
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data?.locationValue);

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
      return `${format(startTime, 'PPpp')}`;
    } else return `${format(date, 'PPpp')}`;
  }, [reservation]);
  return (
    <>
    <div 
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-1 w-full">
        <div onClick={() => router.push(`/listings/${data.id}`)} className="w-full  relative overflow-hidden rounded-xl aspect-square">
          <Image
            src={data.imageSrc}
            alt="image"
            className="h-full w-full object-cover group-hover:scale-110 transition"
            fill
          />
          
        </div>
        <div onClick={() => router.push(`/listings/${data.id}`)} className=" font-semibold text-lg">
          {reservationDate || data.category}  {(currentUser?.id != data.userId && reservation?.totalPrice) && otp } 
        </div>
        <div onClick={() => router.push(`/listings/${data.id}`)} className="font-semibold text-neutral-500">
          {data.title}
        </div>
        <div onClick={() => router.push(`/listings/${data.id}`)} className=" text-sm flex gap-2">
          <CiLocationOn size={15} /> {location?.label}, {location?.region}
        </div>
        {/* <div>
          {data.features.map(value => (
            // eslint-disable-next-line react/jsx-key
            <div className="flex  flex-row items-center gap-1">
              <div className="font-bold text-lg">{value.service}</div>
            </div>
          ))}
        </div> */}
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
        {!(currentUser?.id != data.userId && reservation?.totalPrice) && <>
        
        <input
        onChange={((e)=>{setOtps(e.target.value)})}
           placeholder='OTP' type="text" className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full"' />
        <Button
            disabled={disabled}
            small
            label="Verify"
            onClick={()=>{
              if(Number(otps)===reservation?.otp){
                handleVerify(reservation.id)
              }
              else{
                toast.error("Wrong OTP")
                }
              }
            }
          /> </>} 
      </div>
    </div>

    </>
  );
};

export default ListingCard;