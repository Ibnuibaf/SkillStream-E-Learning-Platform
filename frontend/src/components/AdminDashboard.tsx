// import React from 'react'

import { FaUserGraduate } from "react-icons/fa";
import { MdPlayLesson } from "react-icons/md";

function AdminDashboard() {
  return (
    <div className="p-10">
      <div className="flex justify-center px-40">
        <div className="flex justify-between  bg-white text-black px-6 py-2 rounded-2xl w-max text-xl font-medium gap-6 shadow-md shadow-purple-400 ">
          <div className="flex items-center gap-6 truncate ">
            <div className="flex items-center">
              <FaUserGraduate size={34} />
              <p>#1 Instructor</p>
            </div>
            <p className="font-bold text-violet-500 underline text-2xl">
              John Luck{" "}
            </p>
          </div>
          <div className="flex items-center gap-6 truncate  ">
            <div className="flex items-center">
              <MdPlayLesson size={34} />
              <p>#1 Course</p>
            </div>
            <p className="font-bold text-violet-500 underline text-2xl">
              Javascript is Easy in Tuttorial
            </p>
          </div>
        </div>
      </div>
      <div className="px-12 pt-8">
        <div className="border-2 h-[60vh]">
          <p>Enrollement Graph</p>
          <p>Users Graph</p>
        </div>
        <div className="pt-5 text-lg px-9">
          <p>
            Empower your educational realm with our admin dashboard—your gateway
            to insightful metrics and impactful decisions. Seamlessly manage
            courses, track user engagement, and shape the learning landscape
            effortlessly. Your every click fuels a dynamic educational journey,
            making you the catalyst for knowledge evolution.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
