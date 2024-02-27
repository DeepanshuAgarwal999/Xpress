import Link from "next/link";
import getListings, { IListingsParams } from "../actions/getallListings";
import ClientOnly from "../ClientOnly";
import Approval from "./Approval";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 60;

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
interface Props {
  searchParams: IListingsParams;
}

const Admin = async ({ searchParams }: Props) => {
  const listings = await getListings(searchParams);
  console.log(listings);

  if (listings.length === 0)
    return (
      <div className="h-[calc(100vh-300px)] text-xl text-center sm:text-3xl pt-36 font-semibold">
        NO Business Found
      </div>
    );
  return (
    <div>
      <div className="py-16 relative">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                Buisnesses
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the Buisness.
              </p>
            </div>
            <Link href={"/admin/paymenthistory"}>view payment history</Link>
          </div>
          <div className="mt-8">
            <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
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
                        Title
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 -z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 -z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                      >
                        Description
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
                    {listings.map((item, Idx) => (
                      <tr key={item.id}>
                        <td
                          className={classNames(
                            Idx !== listings.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                          )}
                        >
                          {Idx + 1}
                        </td>
                        <td
                          className={classNames(
                            Idx !== listings.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell"
                          )}
                        >
                          {item.title}
                        </td>
                        <td
                          className={classNames(
                            Idx !== listings.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"
                          )}
                        >
                          {item.category}
                        </td>
                        <td
                          className={classNames(
                            Idx !== listings.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          )}
                        >
                          {item.description}
                        </td>
                        <td
                          className={classNames(
                            Idx !== listings.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8"
                          )}
                        >
                          <Approval
                            approved={item.approved}
                            listingId={item.id}
                          />
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
    </div>
  );
};

export default Admin;
