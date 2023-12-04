// import React from "react";
import { Link } from "react-router-dom";
import {
  MdDashboard,
  MdPlayLesson,
  MdOutlineMarkUnreadChatAlt,
  MdNotifications,
  MdLogout,
} from "react-icons/md";

function InstructorSideBar() {
  return (
    <>
      <div className="flex flex-col w-60 bg-gradient-to-r from-gray-900 to-slate-950 rounded-r-3xl overflow-hidden">
        <div className="flex items-center  h-16 shadow-md">
          <div className="text-3xl flex items-center font-semibold">
            <img
              src="../../public/SkillStream-Logo.png"
              alt=""
              className="h-12"
            />
            <p>SkillStream</p>
          </div>
        </div>
        <ul className="flex flex-col py-4">
          <li>
            <Link
              to={"/instructor"}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-300"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-gray-300">
                <MdDashboard size={24} />
              </span>
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/instructor/courses"}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-300"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-gray-300">
                <MdPlayLesson size={24} />
              </span>
              <span className="text-sm font-medium">Courses</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/instructor/communities"}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-300"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-gray-300">
                <MdOutlineMarkUnreadChatAlt size={24} />
              </span>
              <span className="text-sm font-medium">Communities</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/instructor/notifications"}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-300"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-gray-300">
                <MdNotifications size={24} />
              </span>
              <span className="text-sm font-medium">Notifications</span>
              <span className="ml-auto mr-6 items-center text-[10px] font-medium bg-red-500 rounded-full p-2 py-px text-red-100">
                5
              </span>
            </Link>
          </li>
          <li>
            <Link
              to={"/profile"}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-300"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-gray-300">
                <img
                  src="https://cdn0.iconfinder.com/data/icons/user-interface-vol-3-12/66/68-512.png"
                  alt=""
                  className="h-6"
                />
              </span>
              <span className="text-sm font-medium">Profile</span>
            </Link>
          </li>
          <li>
            <button className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-red-700">
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-red-700">
                <MdLogout size={24} />
              </span>
              <span className="text-sm font-medium">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default InstructorSideBar;
