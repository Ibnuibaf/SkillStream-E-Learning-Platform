// import React from 'react'
import { FaAddressCard } from "react-icons/fa6";
import { MdPlayLesson } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";

function InstructorDashboard() {
    const user=useSelector(selectUser).user
  return (
    <div className="p-10 min-h-screen">
      <div className="flex justify-center px-40">
        <div className="flex justify-between  bg-white text-black px-6 py-2 rounded-2xl w-max text-xl font-medium gap-6 shadow-md shadow-purple-400 ">
          <div className="flex items-center gap-6 truncate ">
            <div className="flex items-center gap-1">
              <FaAddressCard size={34} />
              <p>Total Enrollers</p>
            </div>
            <p className="font-bold text-violet-500 underline text-2xl">89 </p>
          </div>
          <div className="flex items-center gap-6 truncate  ">
            <div className="flex items-center gap-1">
              <MdPlayLesson size={34} />
              <p>Total Courses</p>
            </div>
            <p className="font-bold text-violet-500 underline text-2xl">14</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 pt-5 h-[60vh]">
        <div className=" border rounded-md">
          <div className="flex items-center border rounded-t-md py-2 px-6 text-lg font-medium text-purple-600 ">
            <p>Revenue Analyse</p>
          </div>
          <div>
            <p>yes</p>
          </div>
        </div>
        <div className=" border rounded-md">
          <div className="flex items-center border rounded-t-md py-2 px-6 text-lg font-medium text-purple-600 ">
            <p>Enrollement Analyse</p>
          </div>
          <div>
            <p>yes</p>
          </div>
        </div>
      </div>
      <div className="mt-5 px-28">
        <p>
          Welcome, <span className="font-medium text-purple-500 text-lg">{user?.name} !</span>  Your dedication to education drives our
          platform's success. Navigate seamlessly through your courses, engage
          with your students, and watch your impact unfold. Thank you for being
          a vital part of our e-learning community.
        </p>
      </div>
    </div>
  );
}

export default InstructorDashboard;
