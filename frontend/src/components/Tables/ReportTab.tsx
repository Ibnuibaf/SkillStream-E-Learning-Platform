/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import api from "../../axios/api";
import { toast } from "react-toastify";
interface IEnrollement {
  _id: string;
  userId: { name: string; _id: string };
  courseId: { title: string; _id: string };
  price: number;
  date: Date;
}
function ReportTab() {
  //   const [search, setSearch] = useState("");
  const [enrollementsList, setEnrollementsList] = useState<IEnrollement[]>([]);
  const getEnrollmentReports = async () => {
    try {
      const res = await api.get(`/order`);
      
      console.log(res.data.orders);
      setEnrollementsList(res.data.orders);
    } catch (error: any) {
      toast(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    getEnrollmentReports();
  }, []);
  return (
    <div className="min-h-screen">
      <div className="flex bg-slate-950 items-center justify-between px-4 md:px-10 sticky top-0 z-40 h-14">
        <div className="flex items-center text-2xl font-semibold">
          <p>Enrollment Management</p>
        </div>
      </div>
      <div className="flex justify-center mt-4 md:mt-16 w-full">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full md:max-w-7xl">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
              <tr>
                <th scope="col" className="px-4 md:px-6 py-3">
                  Enrollment Id
                </th>
                <th scope="col" className="px-4 md:px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-4 md:px-6 py-3">
                  Course
                </th>
                <th scope="col" className="px-4 md:px-6 py-3">
                  User
                </th>
                <th scope="col" className="px-4 md:px-6 py-3">
                  Total Amount
                </th>
                <th scope="col" className="px-4 md:px-6 py-3">
                  Profit
                </th>
              </tr>
            </thead>
            {enrollementsList && (
              <tbody>
                {enrollementsList.map((enroll) => (
                  <tr
                    key={enroll._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-4 md:px-6 py-4">
                      {"Enr00098734" + enroll._id}
                    </td>
                    <td className="px-4 md:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white hover:cursor-pointer">
                      {new Date(enroll.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      {enroll.courseId.title}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-red-600">
                      {enroll.userId.name}
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      $ {enroll.price}/-
                    </td>
                    <td className="px-4 md:px-6 py-4 text-pink-700 font-bold">
                      $ {Math.floor(0.2 * enroll.price)}/-
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

export default ReportTab;
