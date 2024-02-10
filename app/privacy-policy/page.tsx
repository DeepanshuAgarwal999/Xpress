"use client";

import Link from "next/link";

export default function Component() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="py-10">
        <div className="container px-4 md:px-6">
          <div className="flex items-center space-x-4">
            <Link
              className="flex items-center space-x-2 text-lg font-medium"
              href="#"
            >
              <FlagIcon className="h-6 w-6" />
              <span className="sr-only">Home</span>
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                Privacy Policy
              </h1>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container space-y-8 px-4 md:px-6">
          <div className="space-y-2 text-sm">
            <p>
              This Privacy Policy applies to{" "}
              <a
                href="https://welcome.thexpresssalon.com"
                className="text-blue-800"
              >
                https://thexpresssalon.com
              </a>
              in recognizes the importance of maintaining your privacy.
            </p>
            <p>
              We value your privacy and appreciate your trust in us. This Policy
              describes how we treat user information we collect on
              <a
                href="https://welcome.thexpresssalon.com"
                className="text-blue-800"
              >
                {" "}
                https://thexpresssalon.com{" "}
              </a>{" "}
              and other offline sources. This Privacy Policy applies to current
              and former visitors to our website and to our online customers. By
              visiting and/or using our website, you agree to this Privacy
              Policy.
            </p>
            <p>
              <a
                href="https://welcome.thexpresssalon.com"
                className="text-blue-800"
              >
                https://thexpresssalon.com{" "}
              </a>{" "}
              is a property of The Xpress Salon Pvt. Ltd., an Indian Company
              registered under the Companies Act, 2013 having its registered
              office at H NO. 245, Abhinav Changil S/o Ravinder Kumar, VPO
              Saimpal, Kalanaur, Rohtak – 124113.
            </p>
            <p>
              We don't share any personally identifying information publicly or
              with third-parties, except when required to by law.
            </p>
          </div>
        </div>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col gap-2 py-10 px-4 md:px-6">
          <div className="space-y-2 text-sm">
            <h3 className="font-bold">Contact Us</h3>
            <a href="mailto:thexpresssalon@gmail.com" className="text-sm text-gray-500 dark:text-gray-400">
              Email: thexpresssalon@gmail.com
            </a>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Phone: +91 8199859921
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FlagIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}
