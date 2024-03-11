// src/CancellationPolicy.tsx
import React from 'react';

const CancellationPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-2xl font-bold text-center mb-4">Cancellation Policy for The Xpress Salon</h1>
      <p>Welcome to The Xpress Salon, where we connect clients with top-quality barbers across the city. To ensure that both clients and barbers have an exceptional experience, we have established the following cancellation policy. Please take a moment to review these guidelines carefully:</p>
      <ul className="list-disc pl-5 my-4">
        <li><strong>Cancellation Window:</strong> Appointments must be canceled or rescheduled at least 24 hours in advance of the scheduled appointment time. This allows our barbers enough time to fill the appointment slot with another client.</li>
        <li><strong>Late Cancellations:</strong> Cancellations made less than 24 hours before the scheduled appointment time will incur a cancellation fee of 50% of the service cost. This fee compensates our barbers for the time they have set aside for your appointment.</li>
        <li><strong>No-Shows:</strong> Clients who fail to show up for their scheduled appointment without prior notice will be charged a no-show fee equivalent to 100% of the service cost. Repeated no-shows may result in a temporary or permanent suspension from booking future appointments on The Xpress Salon.</li>
        <li><strong>How to Cancel or Reschedule:</strong> To cancel or reschedule your appointment, please use our mobile app or website, or contact your barber directly through their profile page on The Xpress Salon. Please note that cancellation fees (if applicable) will be automatically charged to the payment method on file.</li>
        <li><strong>Late Arrivals:</strong> We understand that sometimes being late is outside your control. We will do our best to accommodate late arrivals within a 15-minute grace period of the scheduled appointment time. However, arrival beyond this grace period may require rescheduling your appointment, subject to availability and potentially incurring a late cancellation fee.</li>
        <li><strong>Barber Cancellations:</strong> On rare occasions, a barber may need to cancel an appointment due to unforeseen circumstances. In such cases, we will notify you as soon as possible and assist you in rescheduling your appointment with either the same barber at a later time or with another professional of your choice.</li>
        <li><strong>Refunds:</strong> Cancellation fees are non-refundable, except in the case where a barber cancels an appointment and no suitable rescheduling options are available. In such cases, a full refund of any pre-paid service will be issued.</li>
        <li><strong>Modifications to the Policy:</strong> The Xpress Salon reserves the right to modify this cancellation policy at any time. Such modifications are effective immediately upon posting on our platform. Your continued use of our services constitutes your agreement to abide by the updated policy.</li>
      </ul>
      <p>We appreciate your understanding and cooperation with these policies, designed to ensure that both clients and barbers have a positive and productive experience with The Xpress Salon. If you have any questions or concerns about our cancellation policy, please contact our support team.</p>
      <p>Thank you for choosing The Xpress Salon for your grooming needs. We look forward to serving you.</p>
    </div>
  );
};

export default CancellationPolicy;
