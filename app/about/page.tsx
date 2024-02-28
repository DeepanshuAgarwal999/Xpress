// AboutUs.tsx
'use client'
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
        Welcome to The Xpress Salon – Where Beauty Meets Convenience!
      </h1>
      <p className="text-gray-600 text-lg mb-6">
        At The Xpress Salon, we believe that beauty should be effortlessly accessible, and our platform is designed with just that in mind. We are a premier pre-booking platform that seamlessly connects salon owners with discerning customers, offering a revolutionary way to book salon services with ease.
      </p>
      <p className="text-gray-600 text-lg mb-6">
        Our mission is to redefine the salon experience by providing a one-stop destination for customers to discover, choose, and pre-book their preferred salon services. For salon owners, The Xpress Salon serves as a dynamic platform to showcase their expertise and attract a wider clientele.
      </p>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Why choose The Xpress Salon?
      </h2>
      <ul className="list-disc pl-5 text-gray-600 text-lg mb-6">
        <li>
          <strong>Time-Saving Convenience:</strong> We understand the value of your time. Say goodbye to long waiting queues and last-minute appointments. With The Xpress Salon, you can effortlessly schedule your salon services in advance, ensuring a hassle-free experience.
        </li>
        <li>
          <strong>Diverse Salon Options:</strong> Explore a diverse range of salons, each with its unique offerings and specialties. Whether you're looking for a trendy hair salon, a rejuvenating spa, or a meticulous nail studio, we've got you covered.
        </li>
        <li>
          <strong>Exclusive Offers:</strong> Pamper yourself without breaking the bank! The Xpress Salon brings you exclusive offers and promotions from our partnered salons, ensuring that you get the best value for your money.
        </li>
        <li>
          <strong>User-Friendly Platform:</strong> Our website is designed with simplicity in mind. Easily navigate through salon profiles, services, and available time slots to find the perfect match for your beauty needs.
        </li>
        <li>
          <strong>Secure and Reliable:</strong> Trust is our foundation. Rest assured that your bookings are secure, and our platform prioritizes the confidentiality of your information.
        </li>
      </ul>
      <p className="text-gray-600 text-lg mb-8">
        Join The Xpress Salon community and experience a new era of salon services. Whether you are a salon owner eager to expand your reach or a customer seeking unparalleled convenience, we invite you to be a part of our beauty revolution.
      </p>
      <p className="text-center text-lg text-gray-600">
        Discover, book, and indulge – The Xpress Salon way!
      </p>
    </div>
  );
};

export default About;
