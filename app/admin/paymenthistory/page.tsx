import { getPaymentHistory } from "@/app/actions/getpaymenthistory";
import EmptyState from "@/app/components/EmptyState";
import React, { useEffect } from "react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
const PaymentHistory = async () => {
  const history = await getPaymentHistory();
  if (!history)
    return (
      <div>
        <EmptyState title="No payment history to show" />
      </div>
    );
  console.log(history);

  return (
    <div className="py-16 relative">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              History
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A Payment history of all the Buisness.
            </p>
          </div>
        </div>
        <div className="mt-8 ">
          <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8 px-10">
            <div className="inline-block min-w-full py-2 align-middle">
              <table className="min-w-full border-separate border-spacing-0">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="sticky top-0 -z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                    >
                      S.no
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 -z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 -z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                    >
                      title
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 -z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                    >
                      category
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 -z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    >
                      Created AT
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 -z-10 border-b border-gray-300 bg-white bg-opacity-75 py-5.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, Idx) => (
                    <tr key={item.id}>
                      <td
                        className={classNames(
                          Idx !== history.length - 1
                            ? "border-b border-gray-200"
                            : "",
                          "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                        )}
                      >
                        {Idx + 1}
                      </td>
                      <td
                        className={classNames(
                          Idx !== history.length - 1
                            ? "border-b border-gray-200"
                            : "",
                          "whitespace-nowrap  px-3 py-4 text-sm text-gray-500 sm:table-cell"
                        )}
                      >
                        {item.amount}
                      </td>
                      <td
                        className={classNames(
                          Idx !== history.length - 1
                            ? "border-b border-gray-200"
                            : "",
                          "whitespace-nowrap  px-3 py-4 text-sm text-gray-500 lg:table-cell"
                        )}
                      >
                        {item.title}
                      </td>
                      <td
                        className={classNames(
                          Idx !== history.length - 1
                            ? "border-b border-gray-200"
                            : "",
                          "whitespace-nowrap  px-3 py-4 text-sm text-gray-500 lg:table-cell"
                        )}
                      >
                        {item.category}
                      </td>
                      <td
                        className={classNames(
                          Idx !== history.length - 1
                            ? "border-b border-gray-200"
                            : "",
                          "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                        )}
                      >
                        {item.createdAt.toString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
