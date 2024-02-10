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
              This Privacy Policy applies to <a href="https://thexpresssalon.com" className="text-blue-800">https://thexpresssalon.com</a>
              in recognizes the importance of
              maintaining your privacy.
            </p>
            <p>
              We only ask for personal information when we truly need it to
              provide a service to you. We collect it by fair and lawful means,
              with your knowledge and consent. We also let you know why we're
              collecting it and how it will be used.
            </p>
            <p>
              We only retain collected information for as long as necessary to
              provide you with your requested service. What data we store, we'll
              protect within commercially acceptable means to prevent loss and
              theft, as well as unauthorized access, disclosure, copying, use or
              modification.
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
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Email: contact@example.com
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Phone: +1 234-567-8901
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
