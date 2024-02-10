'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const Footer = () => {
  const router = useRouter();

  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center">

      <div className="flex items-center mb-6 md:mb-0">
          <Image
            src="/images/companylogo.png"
            height="200"
            width="200"
            alt="Logo"
          /> 
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-xl mb-2">Loveland, CO</span>
          <address className="not-italic">
            6045 Sky Pond Dr.<br/>
            Loveland, CO 80538<br/>
            Suite R100
          </address>
          <a href="#" className="text-blue-300 hover:text-blue-500">Get Directions</a>
          <a href="tel:970-669-4836" className="text-blue-300 hover:text-blue-500">Phone: 8130350091</a>
        </div>

        <div className="flex flex-col">
          <span className="font-bold text-xl mb-2">Our Services</span>
          <a href="#" className="text-blue-300 hover:text-blue-500">Salon</a>
          <a href="#" className="text-blue-300 hover:text-blue-500">Med Aesthetics</a>
          <a href="#" className="text-blue-300 hover:text-blue-500">Spa</a>
          <a href="#" className="text-blue-300 hover:text-blue-500">Massage</a>
          <a href="#" className="text-blue-300 hover:text-blue-500">Nail Spa</a>
        </div>

        <div className="flex flex-col">
          <span className="font-bold text-xl mb-2">Company</span>
          <a href="#" className="text-blue-300 hover:text-blue-500">Location & Hours</a>
          <a href="#" className="text-blue-300 hover:text-blue-500">About Us</a>
          <a href="#" className="text-blue-300 hover:text-blue-500">Our Team</a>
          <a href="#" className="text-blue-300 hover:text-blue-500">Careers</a>
          <div onClick={()=> router.push('/privacy-policy')} className="text-blue-300 hover:text-blue-500 cursor-pointer">Policies</div>
        </div>

        <div className="flex flex-col">
          <span className="font-bold text-xl mb-2">Stay Updated</span>
          <a href="#" className="text-blue-300 hover:text-blue-500">Facebook</a>
          <a href="#" className="text-blue-300 hover:text-blue-500">Instagram</a>
        </div>
      </div>

      <div className="text-center text-sm mt-8">
        © {new Date().getFullYear()}, TheXpressSalon. All Rights Reserved.
      </div>

     </footer>
  );
};

export default Footer;
