import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  selectInstructors,
  setInstructors,
} from "../redux/slices/instructorsSlice";
interface UserType {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  isBlock: boolean;
  verification: object;
}
function InstructorsTable() {
  const token = localStorage.getItem("SkillStreamToken");
  const dispatch = useDispatch();
  const data = useSelector(selectInstructors);
  const [search, setSearch] = useState("");
  const [detailsView, setDetailsview] = useState<UserType>();
  const getUsersList = async () => {
    try {
      const res = await axios.get(
        search
          ? `http://localhost:3000/api/user?role=instructor&search=${search}`
          : `http://localhost:3000/api/user?role=instructor`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res.data.users);
      dispatch(setInstructors(res.data.users));
    } catch (error: any) {
      toast(error.response.data.message);
    }
  };
  useEffect(() => {
    getUsersList();
  }, [dispatch, token]);

  const changeUserStatus = async (id: string, status: boolean) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/user/status?_id=${id}&isBlock=${!status}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast("Changed users status");
      getUsersList();
    } catch (error: any) {
      toast(error.response.data.message);
    }
  };
  return (
    <>
      {detailsView ? (
        <div className="h-screen">
          <div className="flex justify-start p-6">
            <button type="button" className="border rounded px-2 font-medium bg-gray-300 text-gray-800 hover:bg-gray-500 hover:text-white" onClick={() => setDetailsview(undefined)}>
              Back
            </button>
          </div>

          <div className="mt-14 flex justify-center items-center">
            <div className="border rounded max-w-6xl text-start">
              <div className="flex flex-col items-center p-4">
                <img src={detailsView.avatar} alt="" className="h-24" />
                <p>{detailsView.name}</p>
              </div>
              <div className="flex">
                <div>
                  <div className="border flex justify-between p-2 gap-4 m-3">
                    <div className="bg-slate-800 p-2 rounded">
                      <p className="text-lg">Personal Details</p>
                      <p className="bg-slate-600 my-1 pt-2 pr-8 pl-2 rounded-lg">
                        <span className="font-semibold">Email: </span>
                        {detailsView.email}
                      </p>
                      <p className="bg-slate-600 my-1 pt-2 pr-8 pl-2 rounded-lg">
                        <span className="font-semibold">Username: </span>
                        {detailsView.name}
                      </p>
                      <p className="bg-slate-600 my-1 pt-2 pr-8 pl-2 rounded-lg">
                        <span className="font-semibold">Role: </span>
                        <i className="text-orange-700 font-bold">
                          {detailsView.role.toUpperCase()}
                        </i>
                      </p>
                    </div>
                    <div className="bg-slate-800 p-2 rounded">
                      <p className="text-lg">Professional Details</p>
                      <p className="bg-slate-600 my-1 pt-2 pr-8 pl-2 rounded-lg">
                        <span className="font-semibold">
                          Number of courses:{" "}
                        </span>
                        {detailsView.email.length}
                      </p>
                      <p className="bg-slate-600 my-1 pt-2 pr-8 pl-2 rounded-lg">
                        <span className="font-semibold">
                          Number of Students:{" "}
                        </span>
                        {detailsView.email.length}
                      </p>
                      <p className="bg-slate-600 my-1 pt-2 pr-8 pl-2 rounded-lg">
                        <span className="font-semibold">Overall Rating: </span>
                        {detailsView.name.length}
                      </p>
                    </div>
                  </div>
                  <div className="border flex justify-between p-2 gap-4 m-3">
                    <div className="bg-slate-800 p-2 rounded w-full">
                      <p className="text-lg">Bank Details</p>
                      <p className="bg-slate-600 my-1 pt-2 pr-8 pl-2 rounded-lg">
                        <span className="font-semibold">Bank Name: </span>
                        {"Federal Bank"}
                      </p>
                      <p className="bg-slate-600 my-1 pt-2 pr-8 pl-2 rounded-lg">
                        <span className="font-semibold">Account Number: </span>
                        {detailsView._id}
                      </p>
                      <p className="bg-slate-600 my-1 pt-2 pr-8 pl-2 rounded-lg">
                        <span className="font-semibold">Account Name: </span>
                        {detailsView.name.toUpperCase()}
                      </p>
                      <p className="bg-slate-600 my-1 pt-2 pr-8 pl-2 rounded-lg">
                        <span className="font-semibold">IFSC: </span>
                        {"FDRL00153"}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="border flex justify-between p-2 gap-4 m-3">
                    <div className="bg-slate-800 p-2 rounded w-full">
                      <p className="text-lg">Instructor Courses</p>
                      <div className=" max-h-[44vh] overflow-x-auto ">
                        <div className="bg-slate-600 my-1 py-2 px-3  rounded-lg flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            <img
                              src={detailsView.avatar}
                              alt=""
                              className="h-8"
                            />
                            <span className="font-semibold text-md">
                              Course Name,subname,details..{" "}
                            </span>
                          </div>
                          <p className="">
                            {" "}
                            Rating:{" "}
                            <span className="text-yellow-600 font-semibold">
                              4
                            </span>{" "}
                          </p>
                        </div>
                        <div className="bg-slate-600 my-1 py-2 px-3  rounded-lg flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            <img
                              src={detailsView.avatar}
                              alt=""
                              className="h-8"
                            />
                            <span className="font-semibold text-md">
                              Course Name,subname,details..{" "}
                            </span>
                          </div>
                          <p className="">
                            {" "}
                            Rating:{" "}
                            <span className="text-yellow-600 font-semibold">
                              4
                            </span>{" "}
                          </p>
                        </div>
                        <div className="bg-slate-600 my-1 py-2 px-3  rounded-lg flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            <img
                              src={detailsView.avatar}
                              alt=""
                              className="h-8"
                            />
                            <span className="font-semibold text-md">
                              Course Name,subname,details..{" "}
                            </span>
                          </div>
                          <p className="">
                            {" "}
                            Rating:{" "}
                            <span className="text-yellow-600 font-semibold">
                              4
                            </span>{" "}
                          </p>
                        </div>
                        <div className="bg-slate-600 my-1 py-2 px-3  rounded-lg flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            <img
                              src={detailsView.avatar}
                              alt=""
                              className="h-8"
                            />
                            <span className="font-semibold text-md">
                              Course Name,subname,details..{" "}
                            </span>
                          </div>
                          <p className="">
                            {" "}
                            Rating:{" "}
                            <span className="text-yellow-600 font-semibold">
                              4
                            </span>{" "}
                          </p>
                        </div>
                        <div className="bg-slate-600 my-1 py-2 px-3  rounded-lg flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            <img
                              src={detailsView.avatar}
                              alt=""
                              className="h-8"
                            />
                            <span className="font-semibold text-md">
                              Course Name,subname,details..{" "}
                            </span>
                          </div>
                          <p className="">
                            {" "}
                            Rating:{" "}
                            <span className="text-yellow-600 font-semibold">
                              4
                            </span>{" "}
                          </p>
                        </div>
                        <div className="bg-slate-600 my-1 py-2 px-3  rounded-lg flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            <img
                              src={detailsView.avatar}
                              alt=""
                              className="h-8"
                            />
                            <span className="font-semibold text-md">
                              Course Name,subname,details..{" "}
                            </span>
                          </div>
                          <p className="">
                            {" "}
                            Rating:{" "}
                            <span className="text-yellow-600 font-semibold">
                              4
                            </span>{" "}
                          </p>
                        </div>
                        <div className="bg-slate-600 my-1 py-2 px-3  rounded-lg flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            <img
                              src={detailsView.avatar}
                              alt=""
                              className="h-8"
                            />
                            <span className="font-semibold text-md">
                              Course Name,subname,details..{" "}
                            </span>
                          </div>
                          <p className="">
                            {" "}
                            Rating:{" "}
                            <span className="text-yellow-600 font-semibold">
                              4
                            </span>{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex  bg-slate-950 items-center justify-between px-10 sticky top-0 z-40 h-14">
            <div className="flex items-center text-2xl font-semibold">
              <p>Instructors Management</p>
            </div>
            <div className="relative w-[30vw] flex items-center">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full px-4 py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search by student's email"
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
                required
              />
              <button
                type="button"
                onClick={getUsersList}
                className="text-white absolute end-2.5 top-1/2 transform -translate-y-1/2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 dark:bg-gray-600 dark:hover:bg-slate-950 dark:focus:ring-slate-950"
              >
                Search
              </button>
            </div>
          </div>
          <div className="flex justify-center mt-16  w-full">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[70vh] w-[70vw]">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Instructor Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Courses Approved
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Students
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Withdrawable
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((instructor) => (
                    <tr
                      key={instructor._id}
                      onClick={() => setDetailsview(instructor)}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {instructor.email}
                      </td>
                      <td className="px-6 py-4 text-red-600">
                        {instructor.name}
                      </td>
                      <td className="px-6 py-4">{instructor._id.length}</td>
                      <td className="px-6 py-4">{instructor.name.length}</td>
                      <td className="px-6 py-4">
                        {instructor.email.length + instructor._id.length}
                      </td>
                      <td className="px-6 py-4">
                        {instructor.role.toUpperCase()}
                      </td>
                      <td className="flex  items-center px-6 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            changeUserStatus(instructor._id, instructor.isBlock)
                          }
                          className={`border px-3 rounded font-medium text-blue-600 dark:text-blue-500 hover:underline ms-3`}
                        >
                          {instructor.isBlock ? "UnBlock" : "Block"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default InstructorsTable;
