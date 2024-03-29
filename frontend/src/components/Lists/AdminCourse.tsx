import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/actions/categoriesActions";
import { AppDispatch } from "../../redux/store";
import { selectCategories } from "../../redux/slices/categorySlice";
import api from "../../axios/api";
import { toast } from "react-toastify";
import { getCourses } from "../../redux/actions/coursesActions";
import { selectcourses } from "../../redux/slices/coursesSlice";
import swal from "sweetalert";
import axios from "axios";
// import { MdDelete } from "react-icons/md";
// import { LuReplace } from "react-icons/lu";
import ReactPlayer from "react-player";
import { FaRegCirclePlay } from "react-icons/fa6";
import { IoMdStar } from "react-icons/io";

interface ICoupon {
  
  code: string;
  value: number;
  from: Date;
  to: Date;
}

interface IMCQ {
  question: string;
  options: string[];
  answer: number;
}

interface ILesson {
  title: string;
  content: string;
  duration: number | string;
}
interface IReviews {
  user: { name: string; _id: string };
  rating: number;
  feedback: string;
}

interface ICourse {
  _id?: string;
  title: string;
  description: string;
  language: string;
  level: string;
  category: { name: string; _id: string } | string;
  cover: string;
  preview?: string;
  mcq: IMCQ[];
  lessons: ILesson[];
  instructor: { name: string; _id?: string } | string;
  announcements: string[];
  coupons: ICoupon[];
  price: number;

  reviews?: IReviews[];
  offer: number;
  isApproved?: boolean;
  isBlock?: boolean;
  enrollers?: string[];
}
function AdminCourse() {
  const dispatch: AppDispatch = useDispatch();
  const courses = useSelector(selectcourses).courses;
  const categories = useSelector(selectCategories).categories;
  const [courseDetailView, setCourseDetailview] = useState(false);
  const [search, setSearch] = useState("");
  const [mcqDetails, setMcqDetails] = useState<IMCQ>({
    question: "",
    options: [],
    answer: -1,
  });
  // const [submitStage, setSubmitStage] = useState(false);
  const [courseDetails, setCourseDetails] = useState<ICourse>({
    title: "",
    description: "",
    language: "",
    level: "",
    category: "",
    cover: "",
    mcq: [],
    instructor: "",
    lessons: [],
    announcements: [],
    coupons: [],
    price: 0,
    offer: 0,
  });
  const [step, setStep] = useState(0);
  const [selectedContent, setSelectedContent] = useState<ILesson>({
    content: "",
    duration: 0,
    title: "",
  });

  const updateCourse = async (update: string) => {
    try {
      // setSubmitStage(true);
      if (
        !courseDetails._id ||
        !courseDetails.title ||
        !courseDetails.description ||
        !courseDetails.language ||
        !courseDetails.level ||
        !courseDetails.category ||
        !courseDetails.cover ||
        !courseDetails.price
      ) {
        return toast("Fill necessary fields");
      }
      const confirmed = await swal("Are you sure to Update Changes?", {
        buttons: ["Cancel", true],
      });
      if (confirmed) {
        if (update == "block") {
          setCourseDetails({
            ...courseDetails,
            isBlock: !courseDetails.isBlock,
          });
          console.log(courseDetails);
          await api.patch("/course/update", {
            _id: courseDetails._id,
            isBlock: !courseDetails.isBlock,
          });
        } else if (update == "approve") {
          setCourseDetails({ ...courseDetails, isApproved: true });
          await api.patch("/course/update", {
            _id: courseDetails._id,
            isApproved: !courseDetails.isApproved,
          });
          console.log(courseDetails);
        }

        // setSubmitStage(false);
        setCourseDetailview(false);
        setCourseDetails({
          title: "",
          description: "",
          language: "",
          level: "",
          category: "",
          cover: "",
          mcq: [],
          lessons: [],
          instructor: "",
          announcements: [],
          coupons: [],
          price: 0,
          offer: 0,
          isApproved: false,
          isBlock: false,
        });
        setSelectedContent({
          content: "",
          duration: 0,
          title: "",
        });
        setStep(0);
        dispatch(getCourses({ search, isInstructor: false }));
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error?.response?.data?.message);
      } else {
        toast("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    dispatch(getCourses({ search: "", isInstructor: false }));
    dispatch(getCategories(""));
  }, [dispatch]);

  return (
    <div className="p-3 lg:p-10 min-h-screen">
      {courseDetailView ? (
        <div className="">
          <div className="flex justify-end my-2 gap-2">
            <button
              onClick={() => {
                setCourseDetailview(false);
                setCourseDetails({
                  title: "",
                  description: "",
                  language: "",
                  level: "",
                  category: "",
                  cover: "",
                  lessons: [],
                  mcq: [],
                  announcements: [],
                  instructor: "",
                  coupons: [],
                  price: 0,
                  offer: 0,
                  isApproved: false,
                  isBlock: false,
                });
                setSelectedContent({
                  content: "",
                  duration: 0,
                  title: "",
                });
              }}
              className="border px-2 p-1 bg-gray-700 hover:bg-gray-800 transition duration-300"
            >
              Go Back
            </button>
            <button
              onClick={() => {
                updateCourse("block");
              }}
              className="border px-2 p-1 hover:bg-red-200 hover:text-black font-medium transition duration-300"
            >
              {courseDetails.isBlock ? "UnBlock" : "Block"}
            </button>
            {!courseDetails.isApproved ? (
              <button
                onClick={() => {
                  updateCourse("approve");
                }}
                className="border px-2 p-1 hover:bg-white hover:text-black font-medium transition duration-300"
              >
                Approve
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="flex border  justify-between items-center">
            <div
              className={`border w-full py-2 ${
                step == 0 ? "bg-gray-500 font-medium" : ""
              }`}
            >
              <button onClick={() => setStep(0)}>Details</button>
            </div>
            <div
              className={`border w-full py-2 ${
                step == 1 ? "bg-gray-500 font-medium" : ""
              }`}
            >
              <button onClick={() => setStep(1)}>Lessons</button>
            </div>
            <div
              className={`border w-full py-2 ${
                step == 2 ? "bg-gray-500 font-medium" : ""
              }`}
            >
              <button onClick={() => setStep(2)}>Additional</button>
            </div>
            {/* <div
              className={`border w-full py-2 ${
                step == 3 ? "bg-gray-500 font-medium" : ""
              }`}
            >
              <button onClick={() => setStep(3)}>Promotion</button>
            </div> */}
            <div
              className={`border w-full py-2 ${
                step == 4 ? "bg-gray-500 font-medium" : ""
              }`}
            >
              <button onClick={() => setStep(4)}>MCQ</button>
            </div>
            <div
              className={`border w-full py-2 ${
                step == 5 ? "bg-gray-500 font-medium" : ""
              }`}
            >
              <button onClick={() => setStep(5)}>Pricing</button>
            </div>
            <div
              className={`border w-full py-2 ${
                step == 6 ? "bg-gray-500 font-medium" : ""
              }`}
            >
              <button onClick={() => setStep(6)}>Statistics</button>
            </div>
          </div>
          {step == 1 ? (
            <div className="border p-2 lg:p-5 lg:px-10 mt-6 rounded-lg text-start">
              <div className="lg:flex justify-between items-start">
                <div className="lg:w-[30%] mb-2">
                  <div className="border p-3 mt-2">
                    <div className="flex justify-between items-end gap-2">
                      <p className="text-xl">Lessons List</p>
                      <p className="text-sm text-gray-400 italic">
                        {" "}
                        {courseDetails.lessons.length} Lessons
                      </p>
                    </div>
                    <div className="h-[50vh] mt-2 overflow-y-scroll overflow-x-hidden">
                      {courseDetails.lessons.map((lesson, index) => (
                        <div
                          className="flex gap-2 truncate items-center bg-purple-900/70 rounded-md py-1 px-3 mb-1 cursor-pointer"
                          onClick={() => {
                            setSelectedContent(lesson);
                          }}
                        >
                          <p className="italic text-xs text-gray-400 flex truncate">
                            {Math.floor(Number(lesson.duration) / 3600)} :{" "}
                            {Math.floor((Number(lesson.duration) % 3600) / 60)}{" "}
                            : {Math.floor(Number(lesson.duration) % 60)} hrs
                          </p>
                          <p className="">{`${index + 1} ${lesson.title}`}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    className={`${
                      !selectedContent.content && !selectedContent.content
                        ? "bg-white/80"
                        : ""
                    } h-[30vh] lg:h-[55vh] lg:w-[50vw]`}
                  >
                    {selectedContent.content ? (
                      <ReactPlayer
                        url={selectedContent.content}
                        controls
                        playing={false}
                        light={courseDetails.cover}
                        width={"100%"}
                        height={"100%"}
                        playIcon={
                          <FaRegCirclePlay
                            size={64}
                            className="text-purple-500"
                          />
                        }
                        onDuration={(duration: number) =>
                          setSelectedContent({
                            ...selectedContent,
                            duration: duration,
                          })
                        }
                      />
                    ) : (
                      <div className="flex justify-center items-center h-full">
                        <FaRegCirclePlay
                          size={64}
                          className="text-purple-500"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between mt-3">
                    <div>
                      <p className="text-xl">{selectedContent.title}</p>
                      <p className="text-sm text-gray-300">
                        Duration:{" "}
                        {Math.floor(Number(selectedContent.duration) / 3600)} :{" "}
                        {Math.floor(
                          (Number(selectedContent.duration) % 3600) / 60
                        )}{" "}
                        : {Math.floor(Number(selectedContent.duration) % 60)}{" "}
                        hrs
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="">
                  <p className="font-medium mb-2">Lesson Title</p>
                  <input
                    type="text"
                    disabled
                    className="border bg-transparent pt-2 pb-1 px-2 w-full outline-none"
                    value={selectedContent.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSelectedContent({
                        ...selectedContent,
                        title: e.target.value,
                      })
                    }
                  />
                  <br />
                  <p className="text-xs text-gray-400 italic">
                    Your title should be a mix of attention-grabbing,
                    informative, and optimized.
                  </p>
                </div>
              </div>
            </div>
          ) : step == 2 ? (
            <div className="border p-5 px-10 mt-6 rounded-lg text-start">
              <div className="">
                <p className="text-xl font-medium mb-2">
                  Announcements of course
                </p>

                <br />
                <p className="text-xs text-gray-400 italic">
                  Course announcement should be a mix of attention-grabbing,
                  informative,
                </p>
              </div>
              <div className="border px-8 py-4 mt-5 h-[45vh] overflow-y-auto overflow-x-hidden">
                {courseDetails.announcements.map((announce) => (
                  <div className="flex justify-between bg-violet-400/40 px-3 py-2 rounded mb-2">
                    <p>{announce}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : step == 3 ? (
            ""
          ) : step == 4 ? (
            <div className="border p-2 lg:p-5 lg:px-10 mt-6 rounded-lg text-start lg:flex justify-between gap-6">
              <div className="border lg:w-[20vw] ">
                <div className="p-1 bg-purple-950 border-b">
                  <p className="text-xl font-medium px-4 ">Questions</p>
                </div>
                <div className=" h-[65vh] px-4 py-2 overflow-y-auto">
                  {courseDetails.mcq.map((mc, index) => (
                    <div
                      className="flex bg-purple-700 px-4 py-1  rounded-md gap-2 cursor-pointer mb-2"
                      onClick={() => {
                        setMcqDetails(mc);
                      }}
                    >
                      <p>{index + 1}.</p>
                      <p className="truncate">{mc.question}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full ">
                <div className="flex justify-center py-2">
                  <p className="text-2xl font-semibold">MCQ to the course</p>
                </div>
                <div>
                  <div>
                    <input
                      type="text"
                      className="bg-transparent border w-full py-1 text-lg px-2 outline-none"
                      value={mcqDetails.question}
                      disabled
                    />
                    <p className="text-violet-300 text-xs">
                      A questions to the row.
                    </p>
                  </div>
                  <div className="p-2 grid grid-cols-1 lg:grid-cols-2 border lg:mx-2 mt-5 gap-3">
                    <div>
                      <input
                        type="text"
                        value={mcqDetails.options[0]}
                        className="bg-transparent border w-full py-1 px-2 outline-none"
                        disabled
                      />
                      <p className="text-violet-300 text-xs">a option No.1</p>
                    </div>
                    <div>
                      <input
                        type="text"
                        value={mcqDetails.options[1]}
                        className="bg-transparent border w-full py-1 px-2 outline-none"
                        disabled
                      />
                      <p className="text-violet-300 text-xs">a option No.2</p>
                    </div>
                    <div>
                      <input
                        type="text"
                        value={mcqDetails.options[2]}
                        className="bg-transparent border w-full py-1 px-2 outline-none"
                        disabled
                      />
                      <p className="text-violet-300 text-xs">a option No.3</p>
                    </div>
                    <div>
                      <input
                        type="text"
                        value={mcqDetails.options[3]}
                        className="bg-transparent border w-full py-1 px-2 outline-none"
                        disabled
                      />
                      <p className="text-violet-300 text-xs">a option No.4</p>
                    </div>
                  </div>
                  <div className="mt-5 flex items-end gap-2">
                    <p>Answer : </p>
                    <input
                      type="text"
                      value={mcqDetails.answer + 1}
                      className="bg-transparent border  py-1 px-2 outline-none"
                      disabled
                    />
                  </div>
                  {/* <div className="flex justify-end mt-3">
                    {selectedMCQ < 0 ? (
                      <button
                        className="border-2 border-pink-500 text-pink-500 px-6 py-1 hover:text-white hover:bg-pink-500 transition duration-300 text-xl"
                        onClick={setMcqToArray}
                      >
                        +Add
                      </button>
                    ) : (
                      <button
                        className="border-2 border-pink-500 text-pink-500 px-6 py-1 hover:text-white hover:bg-pink-500 transition duration-300 text-xl"
                        onClick={updateMcqInArray}
                      >
                        Update
                      </button>
                    )}
                  </div> */}
                </div>
              </div>
            </div>
          ) : step == 5 ? (
            <div className="border p-5 px-10 mt-6 rounded-lg text-start">
              <div className="">
                <p className="text-2xl font-medium mb-2">Pricing</p>
                <p className="text-sm text-gray-200 ">
                  the currency and the price tier for course. If you’d like to
                  offer course for free, it must have a total video length of
                  less than 2 hours. Also, courses with practice tests can not
                  be free.
                </p>
              </div>
              <div className=" mt-5 lg:flex gap-5 ">
                <div className="flex gap-2 items-end mb-2">
                  <p className="text-lg">Course Price : </p>
                  <select
                    name=""
                    id=""
                    value={courseDetails.price}
                    disabled
                    className="bg-transparent font-semibold border px-4 py-2"
                  >
                    <option value={courseDetails.price}>
                      $ {courseDetails.price} /-
                    </option>
                  </select>
                </div>
                <div className="flex gap-2 items-end">
                  <p className="text-lg">
                    Course Offer %<br /> (optional) :{" "}
                  </p>
                  <input
                    type="number"
                    disabled
                    value={courseDetails.offer}
                    className="border bg-transparent px-4 pt-2 pb-1 outline-none"
                    placeholder="%"
                    max={100}
                    min={0}
                  />
                </div>
              </div>
            </div>
          ) : step == 6 ? (
            <>
              <div className="mb-5">
                <p className="text-3xl underline underline-offset-4 font-semibold">
                  Course Statistics
                </p>
              </div>
              <div className="flex">
                <div className="flex rounded items-end  bg-white text-black gap-3 px-10 shadow-md shadow-purple-500">
                  <p className="text-lg font-medium">Total Enrollments:</p>
                  <p className="text-2xl font-medium text-violet-400 bg-gray-700 rounded px-1 my-1">
                    {courseDetails.enrollers?.length}
                  </p>
                </div>
              </div>
              <div className="py-4 px-6 border mt-6">
                <div>
                  <p className="text-xl font-semibold">FeedBacks</p>
                </div>
                <div className="max-h-[50vh] overflow-y-auto overflow-x-hidden grid grid-cols-3 gap-2 mt-5">
                  {courseDetails.reviews?.length ? (
                    courseDetails.reviews?.map((review) => (
                      <div className="bg-purple-900 rounded-xl p-2 h-[15vh]">
                        <div className="flex justify-between">
                          <p className="text-lg font-medium truncate">
                            {review.user.name}
                          </p>
                          <div className="flex items-center text-orange-500">
                            {review.rating == 1 ? (
                              <IoMdStar />
                            ) : review.rating == 2 ? (
                              <>
                                <IoMdStar />
                                <IoMdStar />
                              </>
                            ) : review.rating == 3 ? (
                              <>
                                <IoMdStar />
                                <IoMdStar />
                                <IoMdStar />
                              </>
                            ) : review.rating == 4 ? (
                              <>
                                <IoMdStar />
                                <IoMdStar />
                                <IoMdStar />
                                <IoMdStar />
                              </>
                            ) : review.rating == 5 ? (
                              <>
                                <IoMdStar />
                                <IoMdStar />
                                <IoMdStar />
                                <IoMdStar />
                                <IoMdStar />
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="line-clamp-3">
                          <p>{review.feedback}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-300">No Reviews yet.</p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="border p-5 px-10 mt-6 rounded-lg text-start">
              <div className="">
                <p className="text-xl font-medium mb-2">Course Title</p>
                <input
                  type="text"
                  className="border bg-transparent pt-2 pb-1 px-2 w-full outline-none"
                  placeholder="Insert your course title.."
                  value={courseDetails.title}
                  disabled
                />
                <br />
                <p className="text-xs text-gray-400 italic">
                  Course title should be a mix of attention-grabbing,
                  informative, and optimized.
                </p>
              </div>
              <div className="mt-5">
                <p className="text-xl font-medium mb-2">Course Description</p>
                <textarea
                  className="border bg-transparent pt-2 pb-1 px-2 w-full outline-none resize-none"
                  placeholder="Insert your course title.."
                  rows={5}
                  value={courseDetails.description}
                  disabled
                ></textarea>
                <br />
                <p className="text-xs text-gray-400 italic">
                  Course description should be a mix of attention-grabbing,
                  informative, and optimized.
                </p>
              </div>
              <div className="mt-5">
                <p className="text-xl font-medium mb-2">Basic Info</p>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    name=""
                    id=""
                    className="border bg-transparent py-2 px-3"
                    value={courseDetails.language}
                    disabled
                  >
                    <option value="English">English</option>
                    <option value="Malayalam">Malayalam</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Arabic">Arabic</option>
                  </select>
                  <select
                    name=""
                    id=""
                    className="border bg-transparent py-2 px-3"
                    value={
                      typeof courseDetails.category === "object"
                        ? courseDetails.category.name
                        : courseDetails.category
                    }
                    disabled
                  >
                    {categories.map((cat) =>
                      !cat.block ? (
                        <option value={`${cat._id}`}>{cat.name}</option>
                      ) : (
                        ""
                      )
                    )}
                  </select>
                  <select
                    name=""
                    id=""
                    className="border bg-transparent py-2 px-3"
                    value={courseDetails.level}
                    disabled
                  >
                    <option value={1}>Beginner</option>
                    <option value={2}>Intermediate</option>
                    <option value={3}>Advanced</option>
                  </select>
                </div>
                <p className="text-xs text-gray-400 italic">
                  Course title should be a mix of attention-grabbing,
                  informative, and optimized.
                </p>
              </div>
              <div className="flex justify-between">
                <div className="mt-5 w-full">
                  <p className="text-xl font-medium mb-2">Cover Image</p>
                  <div className="">
                    {courseDetails.cover ? (
                      <div className="h-52 w-[60%] flex items-start gap-2">
                        <img
                          src={`${courseDetails.cover}`}
                          alt=""
                          className="h-full"
                        />
                      </div>
                    ) : (
                      <div className="flex justify-between">
                        <div className="border bg-transparent pt-2 pb-1 px-2 w-full outline-none flex justify-between items-center">
                          <input id="upload" type="file" disabled />
                          <label
                            className="button bg-white text-black px-3 py-1 hover:cursor-pointer"
                            htmlFor="upload"
                          >
                            Upload File
                          </label>
                        </div>
                        <button
                          disabled
                          className="border px-4 py-1 bg-slate-600 hover:bg-slate-600/30"
                        >
                          Upload
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-5 w-full">
                  <p className="text-xl font-medium mb-2">Preview Video</p>
                  <div className="">
                    <div className="h-52 w-96 flex items-start gap-2">
                      <ReactPlayer
                        url={courseDetails.preview}
                        controls
                        playing={false}
                        width={"100%"}
                        height={"100%"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="border lg:px-5 py-2">
          <div className="flex justify-between px-5">
            <div className="text-start ">
              <p className="text-2xl font-medium mb-2">SkillStream Courses</p>
              <div className="flex gap-3 items-end">
                <div className="flex border ">
                  <input
                    type="text"
                    placeholder="Search skillstream courses.."
                    value={search}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSearch(e.target.value)
                    }
                    className="bg-transparent text-sm outline-none min-w-[20vw] px-2 py-1 "
                  />
                  <button
                    onClick={() => {
                      dispatch(getCourses({ search, isInstructor: false }));
                      setSearch("");
                    }}
                    className="h-[100%] flex items-end bg-white text-black px-2 py-1 font-medium hover:bg-slate-400 transition duration-300"
                  >
                    Search
                  </button>
                </div>
                {/* <div>
                  <select
                    name=""
                    id=""
                    className="w-[10vw] text-black font-medium outline-none py-1 px-2 transition duration-1000 ease-in-out"
                  >
                    <option
                      value=""
                      selected
                      className="bg-gray-800 text-white "
                    >
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
                </div> */}
              </div>
            </div>
          </div>
          <div className=" mt-4 h-[70vh] overflow-y-auto overflow-x-hidden">
            {courses.map((course) => (
              <div className="bg-purple-900/30 rounded overflow-hidden sm:flex mb-2">
                <div className="bg-slate-950 rounded-t-lg sm:w-1/3">
                  <div className="px-2 text-center">
                    <p
                      className={`${
                        course.isBlock
                          ? "text-blue-800"
                          : course.isApproved
                          ? "text-green-500"
                          : "text-red-600"
                      } font-medium text-sm py-0.5 `}
                    >
                      {course.isBlock
                        ? "BLOCKED"
                        : course.isApproved
                        ? "APPROVED"
                        : "PENDING"}
                    </p>
                  </div>
                  <div className="flex justify-center h-40 ">
                    <img
                      src={course.cover}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="sm:w-2/3 px-4 py-2">
                  <div className=" text-start">
                    <p className="text-xl font-medium">{course.title}</p>
                    <p className="text-sm truncate line-clamp-3">
                      {course.description}
                    </p>
                    <p className="italic mt-1 py-1">
                      Enrollments :{" "}
                      <b className="text-purple-600 space-x-[0.9px] border p-1">
                        <span className="bg-slate-800 rounded px-1">
                          {course.enrollers.length}
                        </span>
                      </b>
                    </p>
                  </div>
                  <div className="text-start ">
                    <div>
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
                    <div className="text-purple-600 text-lg font-semibold">
                      $ {course.price}/- &nbsp;
                      {course.offer && (
                        <span className="italic text-sm">
                          {course.offer}% off
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setCourseDetailview(true);
                        setCourseDetails(course);
                      }}
                      className="border rounded-full px-4 py-1 my-3 text-purple-600 border-purple-600 hover:shadow hover:shadow-violet-800 transition duration-300 hover:bg-purple-600 hover:text-white"
                    >
                      Detail/edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCourse;
