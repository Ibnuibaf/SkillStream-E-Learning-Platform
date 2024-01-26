/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react'

import { IoIosPlayCircle, IoMdStar } from "react-icons/io";
import { toast } from "react-toastify";
// import api from "../axios/api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/actions/categoriesActions";
import { selectCategories } from "../../redux/slices/categorySlice";
import { selectcourses } from "../../redux/slices/coursesSlice";
import { getCourses } from "../../redux/actions/coursesActions";
import { selectUser } from "../../redux/slices/authSlice";

function Landing() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const categoriesList = useSelector(selectCategories).categories;
  const courseList = useSelector(selectcourses).courses;
  const user = useSelector(selectUser).user;
  const getLatestCourses = async () => {
    try {
      await dispatch(getCourses({ isInstructor: false, search: "" }));
    } catch (error: any) {
      toast(error?.response?.data?.message);
    }
  };
  const getCategoriesList = async () => {
    try {
      await dispatch(getCategories(""));
    } catch (error: any) {
      toast(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    getLatestCourses();
    getCategoriesList();
  }, []);
  return (
    <div className=" ">
      {/* <h1 className="text-3xl font-bold underline ">Hello world!</h1> */}
      <div className="flex justify-center lg:h-[80vh] items-center py-4 px-4">
        <div className="border-2 md:border-4 lg:border-8 rounded-3xl lg:max-w-5xl h-max p-5 md:p-8 lg:p-14 ">
          <div className="flex">
            <div className="hidden lg:block">
              <div className="h-20 w-20">
                <img src="/graphics-1.png" alt="" className="h-full w-full" />
              </div>
            </div>
            <p className="text-2xl md:text-5xl lg:text-7xl font-serif ">
              Teaching in the Internet age means we must teach{" "}
              <span className="text-violet-600">
                tomorrow’s skills <span className="text-pink-500">today.</span>
              </span>
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between ">
            
            <div className="h-20 w-20 hidden lg:block">
              <img
                src="/graphics-1.png"
                alt=""
                className="h-full w-full rotate-90"
              />
            </div>
            <div className="flex flex-col lg:flex-row justify-center gap-2 lg:gap-10 w-full">
              <button
                className="bg-purple-700 px-10 py-1 lg:py-3 md:text-lg lg:text-xl font-semibold rounded-full hover:bg-purple-700/60 "
                onClick={() => navigate("/login")}
              >
                Join as Student
              </button>
              <button
                className="bg-pink-700 px-10 py-1 lg:py-3 md:text-lg lg:text-xl font-semibold rounded-full hover:bg-pink-700/60 "
                onClick={() => {
                  if (!user) {
                    navigate("/login");
                  } else {
                    navigate("/instructor");
                  }
                }}
              >
                Join as Instructor
              </button>
            </div>
            <div className="h-20 w-20 hidden lg:block">
              <img
                src="/graphics-1.png"
                alt=""
                className="h-full w-full rotate-90"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="text-start bg-purple-950/70 px-4 lg:px-28 py-2 lg:py-4">
          <p className="md:text-xl lg:text-2xl font-medium ">
            Our Latest Courses
          </p>
        </div>
        <div className="grid mt-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7 px-3 lg:px-28">
          {courseList.map((course) =>
            !course.isBlock && course.isApproved ? (
              <div
                className="text-start rounded-3xl bg-white text-black hover:cursor-pointer h-96 flex flex-col justify-between"
                onClick={() => {
                  navigate(`/courses?id=${course._id}`);
                }}
              >
                <div className="h-2/4  rounded-t-3xl">
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
                        {course.lessons.length}x Lesson
                      </p>
                    </div>
                    <div className="flex justify-end">
                      {course.reviews.reduce(
                        (sum, review) => sum + review.rating,
                        0
                      ) /
                        course.reviews?.length ==
                      1 ? (
                        <div className="flex items-center">
                          <IoMdStar size={18} color="orange" />
                        </div>
                      ) : course.reviews.reduce(
                          (sum, review) => sum + review.rating,
                          0
                        ) /
                          course.reviews?.length ==
                        2 ? (
                        <div className="flex items-center">
                          <IoMdStar size={18} color="orange" />
                          <IoMdStar size={18} color="orange" />
                        </div>
                      ) : course.reviews.reduce(
                          (sum, review) => sum + review.rating,
                          0
                        ) /
                          course.reviews?.length ==
                        3 ? (
                        <div className="flex items-center">
                          <IoMdStar size={18} color="orange" />
                          <IoMdStar size={18} color="orange" />
                          <IoMdStar size={18} color="orange" />
                        </div>
                      ) : course.reviews.reduce(
                          (sum, review) => sum + review.rating,
                          0
                        ) /
                          course.reviews?.length ==
                        4 ? (
                        <div className="flex items-center">
                          <IoMdStar size={18} color="orange" />
                          <IoMdStar size={18} color="orange" />
                          <IoMdStar size={18} color="orange" />
                          <IoMdStar size={18} color="orange" />
                        </div>
                      ) : course.reviews.reduce(
                          (sum, review) => sum + review.rating,
                          0
                        ) /
                          course.reviews?.length ==
                        5 ? (
                        <div className="flex items-center">
                          <IoMdStar size={18} color="orange" />
                          <IoMdStar size={18} color="orange" />
                          <IoMdStar size={18} color="orange" />
                          <IoMdStar size={18} color="orange" />
                          <IoMdStar size={18} color="orange" />
                        </div>
                      ) : (
                        ""
                      )}
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
                <div className="flex items-center justify-between border-t my-2 px-3 pt-2 ">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://cdn0.iconfinder.com/data/icons/user-interface-vol-3-12/66/68-512.png"
                      alt=""
                      className="h-7 w-7 hidden lg:block"
                    />
                    <div className=" flex items-center">
                      <p className=" font-semibold truncate">
                        {typeof course.instructor == "object"
                          ? course.instructor.name
                          : course.instructor}
                      </p>
                      {/* <p className="text-xs italic">English Teacher</p> */}
                    </div>
                  </div>
                  <div>
                    <p
                      className={`${
                        Math.random() >= 0.5 ? "bg-blue-500" : "bg-pink-500"
                      } px-2 rounded-full text-white text-xs py-1 font-medium`}
                    >
                      {typeof course.category === "object"
                        ? course.category.name
                        : course.category}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )
          )}
        </div>
      </div>
      <div className="my-10">
        <div className="lg:px-28 py-4">
          <p className="md:text-xl lg:text-2xl font-medium ">Explore Top Categories</p>
        </div>
        <div className="px-10 overflow-x-auto flex items-center gap-4">
          {categoriesList.map((cat) => (
            <div
              className={`border rounded p-4 h-max min-w-[13rem] flex  justify-between items-center gap-1 cursor-pointer`}
              onClick={() => navigate(`/courses?cat=${cat._id}`)}
            >
              <div className="h-12 w-12">
                <img src="/graphics-1.png" alt="" className="h-full w-full" />
              </div>
              <b className="truncate "> {cat.name.toUpperCase()}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Landing;
