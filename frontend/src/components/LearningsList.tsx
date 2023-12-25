/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useEffect, useState } from "react";
import { IoIosPlayCircle, IoMdStar } from "react-icons/io";
import { toast } from "react-toastify";
import api from "../axios/api";
// import { useNavigate } from "react-router-dom";

interface ILearnings {
  _id: string;
  title: string;
  description: string;
  language: string;
  level: string;
  category: string;
  cover: string;
  lessons?: string[];
  announcements: string[];
  coupons?: string[];
  price: number;
  offer: number;
  isApproved: boolean;
  isBlock: boolean;
}

function LearningsList() {
  // const navigate=useNavigate()
  const [learnings, setLearnings] = useState<ILearnings[]>();
  const [viewCommunity, setViewCommunity] = useState(false);
  const getLearnings = async () => {
    try {
      const res = await api.get("/user/learnings");

      setLearnings(res.data.learnings);
    } catch (error: any) {
      toast(error?.response?.data?.message);
      window.location.href='http://localhost:5174/'
    }
  };
  useEffect(() => {
    getLearnings();
  }, []);
  return (
    <div className="px-10">
      <div className="text-start my-6">
        <p className="text-3xl font-bold">My Learnings</p>
      </div>
      <div className="flex gap-1">
        <button
          type="button"
          className={`border-2 px-4 py-1 text-lg hover:bg-white hover:text-black transition duration-300 ${
            !viewCommunity ? "bg-white text-black" : ""
          }`}
          onClick={() => setViewCommunity(false)}
        >
          Courses
        </button>
        <button
          type="button"
          className={`border-2 px-4 py-1 text-lg hover:bg-white hover:text-black transition duration-300 ${
            viewCommunity ? "bg-white text-black" : ""
          }`}
          onClick={() => setViewCommunity(true)}
        >
          Communities
        </button>
      </div>
      <div className="">
        {viewCommunity ? (
          <div className="px-10">
            <div className="text-2xl font-semibold my-3">
              <p>My Communites</p>
            </div>
            <div className="max-h-[60vh] overflow-y-auto overflow-x-hidden ">
              {learnings?.map((comm) => (
                <div className="flex items-center gap-4 bg-purple-900/60 rounded-3xl mb-2 py-2 px-8  text-start hover:cursor-pointer hover:bg-purple-900/80">
                  <div className="h-12 w-12 rounded-full">
                    <img
                      src={comm.cover}
                      alt=""
                      className="h-full w-full rounded-full"
                    />
                  </div>
                  <p className="text-xl">{comm.title}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid mt-5 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-7">
            {learnings?.map((course) => (
              <div
                className="text-start rounded-3xl bg-white text-black hover:cursor-pointer"
                onClick={() => {
                  //   setSelectedCourse(course._id);
                  //   setCourseDetails(course);
                }}
              >
                <div className="h-[25vh] rounded-t-3xl">
                  <img
                    src={course.cover}
                    alt=""
                    className="h-full w-full rounded-t-3xl"
                  />
                </div>
                <div className="px-4 py-1">
                  <div className="flex items-start justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <IoIosPlayCircle
                        size={16}
                        color={Math.random() >= 0.5 ? "red" : "blue"}
                      />
                      <p className="text-xs font-medium">
                        {course.cover.length}x Lesson
                      </p>
                    </div>
                    <div className="flex items-center">
                      <IoMdStar size={16} color="orange" />
                      <IoMdStar size={16} color="orange" />
                      <IoMdStar size={16} color="orange" />
                      <IoMdStar size={16} color="orange" />
                    </div>
                  </div>
                  <div className="min-h-[8vh] pt-1">
                    <p className="text-xs text-gray-600 ">
                      {course.level == "2"
                        ? "Intermediate"
                        : course.level == "3"
                        ? "Advanced"
                        : "Beginner"}
                    </p>
                    <p className="line-clamp-2  font-bold font-serif">
                      {course.title}
                    </p>
                  </div>
                  <p className="text-xs line-clamp-1  text-gray-600">
                    {course.description}
                  </p>
                </div>
                <div className="flex items-center  my-2 px-3 ">
                  <div className="mt-1 rounded-full  bg-gray-500  w-full">
                    <p
                      className={`bg-blue-600 rounded-full px-4 w-[${60}%] line-clamp-1 text-center font-medium`}
                    >
                      {" "}
                      60%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LearningsList;
