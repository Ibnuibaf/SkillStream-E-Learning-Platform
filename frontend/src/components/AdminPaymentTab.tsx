/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import api from "../axios/api";
import { toast } from "react-toastify";
import swal from "sweetalert";
// import { FaCalendar } from "react-icons/fa";

interface IPayment {
  _id: string;
  user: { _id: string; name: string };
  amount: number;
  date: Date;
  checked: boolean;
}

function AdminPaymentTab() {
  const [paymentsList, setPaymentsList] = useState<IPayment[]>();
  //   const [search, setSearch] = useState("");
  const getPayments = async () => {
    try {
      const res = await api.get(`/payment`);
      setPaymentsList(res.data.payments);
    } catch (error: any) {
      toast(error?.response?.data?.message);
    }
  };
  const proceedPayment = async (id: string) => {
    const confirmed = await swal("Are you sure to Proceed Payment?", {
      buttons: ["Cancel", true],
    });
    if (confirmed) {
      try {
        const res = await api.patch("/payment/proceed", { id });
        await api.patch("/user/wallet/withdraw", {
          user: res.data.payment.user,
          amount: res.data.payment.amount,
        });
        await getPayments();
      } catch (error: any) {
        toast(error?.response?.data?.message);
      }
    }
  };
  useEffect(() => {
    getPayments();
  }, []);
  return (
    <div>
      <div className="flex  bg-slate-950 items-center justify-between px-10 sticky top-0 z-40 h-14">
        <div className="flex items-center text-2xl font-semibold">
          <p>Payments Management</p>
        </div>
        {/* <div className="relative w-[30vw] flex items-center">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <FaCalendar />
          </div>
          <input
            type="date"
            id="default-search"
            className="block w-full px-4 py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by Date"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearch(e.target.value);
              getPayments();
            }}
          />
          <button
            type="button"
            onClick={getPayments}
            className="text-white absolute end-2.5 top-1/2 transform -translate-y-1/2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 dark:bg-gray-600 dark:hover:bg-slate-950 dark:focus:ring-slate-950"
          >
            Search
          </button>
        </div> */}
      </div>
      <div className="flex justify-center mt-16  w-full">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-[75vh] w-[50vw]">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Instructor
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            {paymentsList && (
              <tbody>
                {paymentsList.map((payment) => (
                  <tr
                    key={payment._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white hover:cursor-pointer">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-red-600">
                      {payment.user.name}
                    </td>
                    <td className="px-6 py-4">{payment.amount}</td>
                    <td className="flex  items-center px-6 py-4">
                      {!payment.checked && (
                        <button
                          type="button"
                          onClick={() => proceedPayment(payment._id)}
                          className={`border px-3 rounded font-medium text-pink-600 dark:text-pink-500 hover:underline ms-3`}
                        >
                          Proceed
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPaymentTab;
