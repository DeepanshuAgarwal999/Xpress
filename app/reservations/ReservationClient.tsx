'use client';

import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { SafeReservation, SafeUser } from '@/app/types';
import Heading from '@/app/components/Heading';
import Container from '@/app/components/Container';
import ListingCard from '@/app/reservations/ReservationCard';

interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');
  const [otpVis,setOtpVis] = useState(false)
  const [otp,setOtp] = useState()
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Booking cancelled');
          router.refresh();
        })
        .catch(() => {
          toast.error('Something went wrong.');
        })
        .finally(() => {
          setDeletingId('');
        });
    },
    [router]
  );
  const verifyOTP= async (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Booking Verified');
          router.refresh();
        })
        .catch(() => {
          toast.error('Something went wrong.');
        })
        .finally(() => {
          setDeletingId('');
          window.location.reload()
        });
    }
  
 

  return (
    <>
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your business" />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            handleVerify={verifyOTP} 
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
    </>
  );
};

export default ReservationsClient;
