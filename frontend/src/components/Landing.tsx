// import React from 'react'

import { IoIosPlayCircle, IoMdStar } from "react-icons/io";

function Landing() {
  return (
    <div className=" ">
      {/* <h1 className="text-3xl font-bold underline ">Hello world!</h1> */}
      <div className="flex justify-center h-[80vh] items-center">
        <div className="border-8 rounded-3xl max-w-5xl h-max p-14 ">
          <div className="flex">
            <div className="">
              <div className="h-20 w-20">
                <img src="/graphics-1.png" alt="" className="h-full w-full" />
              </div>
            </div>
            <p className="text-7xl font-serif">
              Teaching in the Internet age means we must teach{" "}
              <span className="text-violet-600">
                tomorrow’s skills <span className="text-pink-500">today.</span>
              </span>
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between ">
            <div className="h-20 w-20">
              <img
                src="/graphics-1.png"
                alt=""
                className="h-full w-full rotate-90"
              />
            </div>
            <div className="flex justify-center gap-10">
              <button className="bg-purple-700 px-10 py-3 text-xl font-semibold rounded-full hover:bg-purple-700/60">
                Join as Instructor
              </button>
              <button className="bg-pink-700 px-10 py-3 text-xl font-semibold rounded-full hover:bg-pink-700/60">
                Join as Student
              </button>
            </div>
            <div className="h-20 w-20">
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
        <div className="text-start bg-purple-950/70 px-28 py-4">
          <p className="text-2xl font-medium ">Our Most Popular Courses</p>
        </div>
        <div className="grid mt-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7 px-28">
          <div
            className="text-start rounded-3xl bg-white text-black hover:cursor-pointer"
            // onClick={() => {
            //   setSelectedCourse(course._id);
            //   setCourseDetails(course);
            // }}
          >
            <div className="h-[25vh] rounded-t-3xl">
              <img
                src={"course.cover"}
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
                    {/* {course.lessons.length}x Lesson */}4x Lesson
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
                  {/* {course.level == "2"
                            ? "Intermediate"
                            : course.level == "3"
                            ? "Advanced"
                            : "Beginner"} */}
                </p>
                <p className="line-clamp-2  font-bold font-serif">
                  {"course.title"}
                </p>
              </div>
              <p className="text-xs line-clamp-1  text-gray-600">
                {"course.description"}
              </p>
            </div>
            <div className="flex items-center justify-between border-t my-2 px-3 ">
              <div>
                <img src="" alt="" />
                <div className="space-y-[-4px]">
                  <p className="text-lg">
                    {/* {typeof courseDetails.instructor == "object"
                              ? courseDetails.instructor.name
                              : courseDetails.instructor} */}
                  </p>

                  <p className="text-xs italic">English Teacher</p>
                </div>
              </div>
              <div>
                <p
                  className={`${
                    Math.random() >= 0.5 ? "bg-blue-500" : "bg-pink-500"
                  } px-2 rounded-full text-white text-xs py-1 font-medium`}
                >
                  {/* {typeof courseDetails.category === "object"
                            ? courseDetails.category.name
                            : courseDetails.category} */}
                </p>
              </div>
            </div>
          </div>
          <div
            className="text-start rounded-3xl bg-white text-black hover:cursor-pointer"
            // onClick={() => {
            //   setSelectedCourse(course._id);
            //   setCourseDetails(course);
            // }}
          >
            <div className="h-[25vh] rounded-t-3xl">
              <img
                src={"course.cover"}
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
                    {/* {course.lessons.length}x Lesson */}4x Lesson
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
                  {/* {course.level == "2"
                            ? "Intermediate"
                            : course.level == "3"
                            ? "Advanced"
                            : "Beginner"} */}
                </p>
                <p className="line-clamp-2  font-bold font-serif">
                  {"course.title"}
                </p>
              </div>
              <p className="text-xs line-clamp-1  text-gray-600">
                {"course.description"}
              </p>
            </div>
            <div className="flex items-center justify-between border-t my-2 px-3 ">
              <div>
                <img src="" alt="" />
                <div className="space-y-[-4px]">
                  <p className="text-lg">
                    {/* {typeof courseDetails.instructor == "object"
                              ? courseDetails.instructor.name
                              : courseDetails.instructor} */}
                  </p>

                  <p className="text-xs italic">English Teacher</p>
                </div>
              </div>
              <div>
                <p
                  className={`${
                    Math.random() >= 0.5 ? "bg-blue-500" : "bg-pink-500"
                  } px-2 rounded-full text-white text-xs py-1 font-medium`}
                >
                  {/* {typeof courseDetails.category === "object"
                            ? courseDetails.category.name
                            : courseDetails.category} */}
                </p>
              </div>
            </div>
          </div>
          <div
            className="text-start rounded-3xl bg-white text-black hover:cursor-pointer"
            // onClick={() => {
            //   setSelectedCourse(course._id);
            //   setCourseDetails(course);
            // }}
          >
            <div className="h-[25vh] rounded-t-3xl">
              <img
                src={"course.cover"}
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
                    {/* {course.lessons.length}x Lesson */}4x Lesson
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
                  {/* {course.level == "2"
                            ? "Intermediate"
                            : course.level == "3"
                            ? "Advanced"
                            : "Beginner"} */}
                </p>
                <p className="line-clamp-2  font-bold font-serif">
                  {"course.title"}
                </p>
              </div>
              <p className="text-xs line-clamp-1  text-gray-600">
                {"course.description"}
              </p>
            </div>
            <div className="flex items-center justify-between border-t my-2 px-3 ">
              <div>
                <img src="" alt="" />
                <div className="space-y-[-4px]">
                  <p className="text-lg">
                    {/* {typeof courseDetails.instructor == "object"
                              ? courseDetails.instructor.name
                              : courseDetails.instructor} */}
                  </p>

                  <p className="text-xs italic">English Teacher</p>
                </div>
              </div>
              <div>
                <p
                  className={`${
                    Math.random() >= 0.5 ? "bg-blue-500" : "bg-pink-500"
                  } px-2 rounded-full text-white text-xs py-1 font-medium`}
                >
                  {/* {typeof courseDetails.category === "object"
                            ? courseDetails.category.name
                            : courseDetails.category} */}
                </p>
              </div>
            </div>
          </div>
          <div
            className="text-start rounded-3xl bg-white text-black hover:cursor-pointer"
            // onClick={() => {
            //   setSelectedCourse(course._id);
            //   setCourseDetails(course);
            // }}
          >
            <div className="h-[25vh] rounded-t-3xl">
              <img
                src={"course.cover"}
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
                    {/* {course.lessons.length}x Lesson */}4x Lesson
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
                  {/* {course.level == "2"
                            ? "Intermediate"
                            : course.level == "3"
                            ? "Advanced"
                            : "Beginner"} */}
                </p>
                <p className="line-clamp-2  font-bold font-serif">
                  {"course.title"}
                </p>
              </div>
              <p className="text-xs line-clamp-1  text-gray-600">
                {"course.description"}
              </p>
            </div>
            <div className="flex items-center justify-between border-t my-2 px-3 ">
              <div>
                <img src="" alt="" />
                <div className="space-y-[-4px]">
                  <p className="text-lg">
                    {/* {typeof courseDetails.instructor == "object"
                              ? courseDetails.instructor.name
                              : courseDetails.instructor} */}
                  </p>

                  <p className="text-xs italic">English Teacher</p>
                </div>
              </div>
              <div>
                <p
                  className={`${
                    Math.random() >= 0.5 ? "bg-blue-500" : "bg-pink-500"
                  } px-2 rounded-full text-white text-xs py-1 font-medium`}
                >
                  {/* {typeof courseDetails.category === "object"
                            ? courseDetails.category.name
                            : courseDetails.category} */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-10">
        <div className="px-28 py-4">
          <p className="text-2xl font-medium ">Explore Top Categories</p>
        </div>
        <div className="px-10 overflow-x-auto flex items-center gap-4">
          <div
            className={`border rounded p-4 h-max flex flex-col justify-between items-center gap-1`}
          >
            <div className="h-12 w-12">
              <img src="/graphics-1.png" alt="" className="h-full w-full" />
            </div>
            <b className="truncate ">
              {" "}
              {"category.name.toUpperCase()"}
            </b>
          </div>
          <div
            className={`border rounded p-4 h-max flex flex-col justify-between items-center gap-1`}
          >
            <div className="h-12 w-12">
              <img src="/graphics-1.png" alt="" className="h-full w-full" />
            </div>
            <b className="truncate ">
              {" "}
              {"category.name.toUpperCase()"}
            </b>
          </div>
          <div
            className={`border rounded p-4 h-max flex flex-col justify-between items-center gap-1`}
          >
            <div className="h-12 w-12">
              <img src="/graphics-1.png" alt="" className="h-full w-full" />
            </div>
            <b className="truncate ">
              {" "}
              {"category.name.toUpperCase()"}
            </b>
          </div>
          <div
            className={`border rounded p-4 h-max flex flex-col justify-between items-center gap-1`}
          >
            <div className="h-12 w-12">
              <img src="/graphics-1.png" alt="" className="h-full w-full" />
            </div>
            <b className="truncate ">
              {" "}
              {"category.name.toUpperCase()"}
            </b>
          </div>
          <div
            className={`border rounded p-4 h-max flex flex-col justify-between items-center gap-1`}
          >
            <div className="h-12 w-12">
              <img src="/graphics-1.png" alt="" className="h-full w-full" />
            </div>
            <b className="truncate ">
              {" "}
              {"category.name.toUpperCase()"}
            </b>
          </div>
          <div
            className={`border rounded p-4 h-max flex flex-col justify-between items-center gap-1`}
          >
            <div className="h-12 w-12">
              <img src="/graphics-1.png" alt="" className="h-full w-full" />
            </div>
            <b className="truncate ">
              {" "}
              {"category.name.toUpperCase()"}
            </b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
