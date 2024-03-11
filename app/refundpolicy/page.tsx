// src/RefundPolicy.tsx
import React from 'react';

const RefundPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-2xl font-bold text-center mb-4">Refund Policy for The Xpress Salon</h1>
      <p>At The Xpress Salon, we pride ourselves on providing high-quality grooming services and customer satisfaction. We understand that there may be times when your experience does not meet your expectations, or circumstances prevent the delivery of our services as planned. This policy outlines the conditions under which refunds may be granted.</p>
      <ul className="list-disc pl-5 my-4">
        <li><strong>Service Dissatisfaction:</strong> If you are not satisfied with the service received, we encourage you to contact us within [24 hours] of your appointment. We will offer to rectify the issue with a complimentary redo of the service in question, subject to barber availability. If a redo cannot solve the issue, we will assess the situation on a case-by-case basis for a possible partial or full refund.</li>
        <li><strong>Prepaid Appointments:</strong> For appointments prepaid online or via our app and canceled within the allowed cancellation window, a full refund will be issued to the original method of payment within [5-7 business days].</li>
        <li><strong>No-Show and Late Cancellations:</strong> Fees collected for no-shows or late cancellations are non-refundable as they compensate our barbers for their reserved time.</li>
        <li><strong>Barber Cancellation:</strong> If a barber cancels an appointment and we cannot reschedule you to your satisfaction, you will be entitled to a full refund of any prepaid services.</li>
        <li><strong>Product Returns:</strong> If you purchase a product from The Xpress Salon and are not satisfied with it, you may return it within [14 days] of purchase for a full refund, provided it is unopened and in its original packaging. Opened or used products may only be returned if they are defective or damaged, in which case a full refund or exchange will be offered.</li>
        <li><strong>Refund Processing:</strong> All refunds will be processed to the original method of payment. Please allow [5-7 business days] for the refund to appear on your statement.</li>
        <li><strong>Modification of Policy:</strong> The Xpress Salon reserves the right to modify this refund policy at any time. Changes will become effective immediately upon posting on our platform. Your continued use of our services after such changes have been posted signifies your acceptance of the new terms.</li>
      </ul>
      <p>We are committed to ensuring your satisfaction with every visit to The Xpress Salon. If you have any questions or concerns regarding our refund policy, please do not hesitate to contact our customer support team.</p>
      <p>Thank you for choosing The Xpress Salon. We look forward to serving you with excellence.</p>
    </div>
  );
};

export default RefundPolicy;
