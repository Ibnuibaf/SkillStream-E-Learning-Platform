import React from "react";
import { FaPlus } from "react-icons/fa";
function InstructorCourse() {
  return (
    <div className="border px-5 py-2">
      <div className="flex justify-between px-5">
        <div className="text-start ">
          <p className="text-2xl font-medium mb-2">Your Courses</p>
          <div className="flex gap-3 items-end">
            <div className="flex border ">
              <input
                type="text"
                placeholder="Search your courses.."
                className="bg-transparent text-sm outline-none min-w-[20vw] px-2 py-1 "
              />
              <button className="h-[100%] flex items-end bg-white text-black px-2 py-1 font-medium hover:bg-slate-400 transition duration-300">
                Search
              </button>
            </div>
            <div>
              <select
                name=""
                id=""
                className="w-[10vw] text-black font-medium outline-none py-1 px-2 transition duration-1000 ease-in-out"
              >
                <option value="" selected className="bg-gray-800 text-white ">
                  Latest
                </option>
                <option value="" className="bg-gray-800 text-white ">
                  Top Rated
                </option>
                <option value="" className="bg-gray-800 text-white ">
                  Top Enrolled
                </option>
                <option value="" className="bg-gray-800 text-white ">
                  Top Enrolled
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex items-start">
          <button className="flex items-center gap-1 border-2 border-violet-600 text-violet-600 font-semibold px-8 py-1 hover:bg-violet-600 hover:text-white transition duration-300">
            CREATE <FaPlus size={14} />{" "}
          </button>
        </div>
      </div>
      <div className=" mt-4 h-[70vh] overflow-y-auto overflow-x-hidden">
        <div className="bg-purple-900/30 rounded flex justify-between px-5">
          <div className="text-start flex items-center gap-2">
            <div className="bg-slate-950 rounded-t-lg ">
              <div className="px-2 text-center"><p className="text-green-500 font-medium text-xs">APPROVED</p></div>
              <img
                src="https://tse3.mm.bing.net/th?id=OIP.WXOyi2RkWruFvwKiO-y6ewHaEK&pid=Api&P=0&h=220"
                alt=""
                className="h-[6rem] w-[10rem]"
              />
            </div>
            <div className="">
              <div className="pb-2">
                <p className="text-xl font-medium">
                  React & TypeScript - The Practical Guide
                </p>
                <p className="text-sm">
                  Build type-safe React apps & use TypeScript to enhance your
                  components, state mana....
                </p>
                <p className="italic  w-max  mt-1 py-1">
                  Enrollements :{" "}
                  <b className="text-purple-600 space-x-[0.9px] border p-1">
                    <span className="bg-slate-800 rounded px-1">0</span>
                    <span className="bg-slate-800 rounded px-1">7</span>
                    <span className="bg-slate-800 rounded px-1">8</span>
                  </b>
                </p>
              </div>
              <p className=" text-xs font-light">
                Updated on 05 Oct 7.5 total hours
              </p>
            </div>
          </div>
          <div className="text-end ">
            <p className="text-sm">rating</p>
            <p className="font-semibold text-lg text-purple-600">&#8377; 976.09/-</p>
            <p className="italic text-sm">5% off</p>
            <button className="border rounded-full px-4 py-1 my-3 text-purple-600 border-purple-600 hover:shadow hover:shadow-violet-800 transition duration-300 hover:bg-purple-600 hover:text-white">
              Detail/edit
            </button>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default InstructorCourse;
