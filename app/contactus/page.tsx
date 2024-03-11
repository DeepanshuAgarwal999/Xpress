// src/ContactUs.tsx
import React from 'react';

const ContactUs: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-2xl font-bold text-center mb-4">Contact Us at The Xpress Salon</h1>
      <p>We're here to help you look and feel your best. If you have any questions, concerns, or feedback, our team at The Xpress Salon is eager to hear from you. Your satisfaction is our top priority, and we strive to provide an exceptional grooming experience.</p>
      
      <h2 className="text-xl font-semibold mt-5 mb-2">Reach Out to Us Through the Following Channels:</h2>
      <ul className="list-disc pl-5 my-4">
        <li><strong>Phone:</strong> For immediate assistance or to book an appointment over the phone, please call us at +91 81998 59921. Our friendly staff is available from 11 am all days.</li>
        <li><strong>Email:</strong> For inquiries, feedback, or concerns, please email us at thexpresssalon@gmail.com. We aim to respond to all email communications within 72 hours, excluding weekends and holidays.</li>
        <li><strong>Online Booking:</strong> Visit our website at <a href="http://www.thexpresssalon.com/" className="text-blue-500">www.thexpresssalon.com</a> to book appointments, view our services, and check availability in real time.</li>
        <li><strong>Social Media:</strong> Follow us on social media for the latest updates, promotions, and more. Connect with us on Instagram at <a href="https://www.instagram.com/thexpresssalon?utm_source=qr&igsh=MWZpYWUxemRvdjlhbg==" className="text-blue-500">https://www.instagram.com/thexpresssalon</a>.</li>
      </ul>
      
      <h2 className="text-xl font-semibold mt-5 mb-2">For Press and Partnership Inquiries:</h2>
      <p>Please direct all press and partnership inquiries to Abhinav Changil at +91 81998 59921. We look forward to exploring opportunities to collaborate and grow together.</p>
      
      <p className="mt-5">Thank you for choosing The Xpress Salon. We're dedicated to providing you with an unparalleled grooming experience and look forward to serving you.</p>
    </div>
  );
};

export default ContactUs;
