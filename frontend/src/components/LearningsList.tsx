/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { IoIosPlayCircle, IoMdStar } from "react-icons/io";
import { toast } from "react-toastify";
import api from "../axios/api";
import ReactPlayer from "react-player";
import { FaRegCirclePlay } from "react-icons/fa6";
import { OnProgressProps } from "react-player/base";
import axios from "axios";
import { LuMoveLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import InstructorsList from "./InstructorsList";
import McqTestTab from "./McqTestTab";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";

interface ILesson {
  _id?: string;
  title: string;
  content: string;
  duration: number | string;
}
interface IMCQ {
  question: string;
  options: string[];
  answer: number;
}
interface IReviews {
  user: { name: string; _id: string };
  rating: number;
  feedback: string;
}
interface ICourse {
  _id: string;
  title: string;
  description: string;
  language: string;
  level: string;
  category: { name: string; _id: string } | string;
  instructor: { name: string; _id?: string } | string;
  cover: string;
  mcq: IMCQ[];
  lessons: ILesson[];
  reviews: IReviews[];
  announcements: string[];
  coupons?: string[];
  price: number;
  offer: number;
  isApproved: boolean;
  isBlock: boolean;
}
interface ILearnings {
  _id: string;
  course: ICourse;
  progress: string[];
  certificate: boolean;
}

function LearningsList() {
  const navigate = useNavigate();
  const user = useSelector(selectUser).user;
  const [learnings, setLearnings] = useState<ILearnings[]>();
  const [view, setView] = useState("courses");
  const [isLearningsView, setIsLearningsView] = useState(false);
  const [isTestView, setIsTestView] = useState(false);
  const [isAnnouncementView, setIsAnnouncementView] = useState(false);
  const [learningsDetails, setLearningsDetails] = useState<ILearnings>();
  const [selectedLesson, setSelectedLesson] = useState<ILesson>();
  const getLearnings = async () => {
    try {
      const res = await api.get("/user/learnings");
      setLearnings(res.data.learnings);
    } catch (error: any) {
      toast(error?.response?.data?.message);
      window.location.href = "http://localhost:5174/";
    }
  };
  const handleProgress = async (progress: OnProgressProps) => {
    // console.log(progress);
    const isExist = learningsDetails?.progress.find(
      (lesson) => lesson == selectedLesson?._id
    );
    if (!isExist) {
      if (progress.played > 0.7) {
        try {
          await api.patch("/user/learnings/progress", {
            courseId: learningsDetails?.course._id,
            lessonId: selectedLesson?._id,
          });
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            toast(error?.response?.data?.message);
          } else {
            toast("An unexpected error occurred");
          }
        }
      }
    }
  };
  useEffect(() => {
    getLearnings();
  }, []);
  return (
    <div className="px-10">
      {isTestView ? (
        <>
          <div className="flex justify-start px-4 pb-2">
            <button
              type="button"
              className="border flex items-center gap-1 rounded px-2 font-medium bg-gray-300 text-gray-800 hover:bg-gray-500 hover:text-white"
              onClick={() => {
                setIsTestView(false);
              }}
            >
              <LuMoveLeft /> Back
            </button>
          </div>
          <McqTestTab learning={learningsDetails as ILearnings} />
        </>
      ) : isLearningsView ? (
        <>
          <div className="flex justify-start px-4 pb-2">
            <button
              type="button"
              className="border flex items-center gap-1 rounded px-2 font-medium bg-gray-300 text-gray-800 hover:bg-gray-500 hover:text-white"
              onClick={() => {
                setIsLearningsView(false);
                setLearningsDetails(undefined);
                setSelectedLesson(undefined);
                setIsAnnouncementView(false);
              }}
            >
              <LuMoveLeft /> Back
            </button>
          </div>
          <div className="flex justify-between w-full h-[80vh] gap-4">
            <div className="w-[70%] ">
              <div className="h-[90%] ">
                {selectedLesson ? (
                  <ReactPlayer
                    url={selectedLesson?.content}
                    controls
                    playing={true}
                    light={learningsDetails?.course.cover}
                    width={"100%"}
                    height={"100%"}
                    playIcon={
                      <div className="flex flex-col items-center">
                        <FaRegCirclePlay
                          size={94}
                          className="text-violet-700"
                        />
                        <p className="text-xl text-violet-700/80 font-bold">
                          {selectedLesson?.title}
                        </p>
                      </div>
                    }
                    stopOnUnmount
                    onProgress={(progress) => handleProgress(progress)}
                  />
                ) : (
                  <img
                    src={learningsDetails?.course.cover}
                    alt=""
                    className="h-full w-full rounded-xl shadow-xl shadow-purple-800/30"
                  />
                )}
              </div>
              <div className="flex gap-2 justify-center mt-5">
                <button
                  className={`px-6 py-2 border-2 hover:bg-white hover:text-black ${
                    !isAnnouncementView ? "bg-white text-black" : ""
                  }`}
                  onClick={() => setIsAnnouncementView(false)}
                >
                  Overview
                </button>
                <button
                  className={`px-6 py-2 border-2 hover:bg-white hover:text-black ${
                    isAnnouncementView ? "bg-white text-black" : ""
                  }`}
                  onClick={() => setIsAnnouncementView(true)}
                >
                  Announcements
                </button>
                <button
                  className={`px-6 py-2 border-2 hover:bg-white hover:text-black `}
                  onClick={() => setIsTestView(true)}
                  disabled={learningsDetails?.certificate}
                >
                  Take Certificate
                </button>
              </div>
            </div>
            <div className="flex justify-center w-[30%]  px-5 py-5 text-start">
              <div className="border px-5 py-2 w-full ">
                <p className="text-3xl font-semibold my-2">Course Lessons</p>
                <div className=" mt-5 h-[63vh]  overflow-y-auto overflow-x-hidden ">
                  {learningsDetails?.course.lessons.map((lesson) => (
                    <div
                      className="border px-4 py-2 line-clamp-1 w-full  flex items-center gap-2 mb-2 truncate cursor-pointer"
                      onClick={() => setSelectedLesson(lesson)}
                    >
                      <p className="text-xs font-medium text-violet-500 ">
                        {`${Math.floor(
                          Number(lesson.duration) / 3600
                        )} : ${Math.floor(
                          (Number(lesson.duration) % 3600) / 60
                        )} : ${Number(lesson.duration) % 60}`}
                      </p>
                      <p className="text-lg truncate">{lesson.title}</p>
                    </div>
                  ))}
                  <p className="text-xs text-gray-400 text-center">
                    These are the lessons of this course.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-start mt-10">
            {isAnnouncementView ? (
              <div>
                <p className="text-2xl">Announcements</p>
                <div className="border px-6 py-6 mt-4">
                  {learningsDetails?.course.announcements.map((announce) => (
                    <p className="bg-purple-950/50 px-5 py-2 rounded-xl">
                      {announce}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="pl-4">
                <p className="text-2xl">About This Course</p>
                <dl className="line-clamp-6 mt-4 max-w-4xl">
                  Deescitption Lorem Ipsum is simply dummy text of the printing
                  and typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum
                </dl>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="text-start my-6">
            <p className="text-3xl font-bold">My Learnings</p>
          </div>
          <div className="flex gap-1">
            <button
              type="button"
              className={`border-2 px-4 py-1 text-lg hover:bg-white hover:text-black transition duration-300 ${
                view == "courses" ? "bg-white text-black" : ""
              }`}
              onClick={() => setView("courses")}
            >
              Courses
            </button>
            <button
              type="button"
              className={`border-2 px-4 py-1 text-lg hover:bg-white hover:text-black transition duration-300 ${
                view == "communities" ? "bg-white text-black" : ""
              }`}
              onClick={() => setView("communities")}
            >
              Communities
            </button>
            <button
              type="button"
              className={`border-2 px-4 py-1 text-lg hover:bg-white hover:text-black transition duration-300 ${
                view == "instructors" ? "bg-white text-black" : ""
              }`}
              onClick={() => setView("instructors")}
            >
              Instructors
            </button>
            <button
              type="button"
              className={`border-2 px-4 py-1 text-lg hover:bg-white hover:text-black transition duration-300 ${
                view == "certificates" ? "bg-white text-black" : ""
              }`}
              onClick={() => setView("certificates")}
            >
              Certificates
            </button>
          </div>
          <div className="">
            {view == "communities" ? (
              <div className="px-10">
                <div className="text-2xl font-semibold my-3">
                  <p>My Communites</p>
                </div>
                <div className="max-h-[60vh] overflow-y-auto overflow-x-hidden ">
                  {learnings?.map((comm) => (
                    <div
                      className="flex items-center gap-4 bg-purple-900/60 rounded-3xl mb-2 py-2 px-8  text-start hover:cursor-pointer hover:bg-purple-900/80 cursor-pointer"
                      onClick={() =>
                        navigate(`/community?courseid=${comm.course._id}`)
                      }
                    >
                      <div className="h-12 w-12 rounded-full">
                        <img
                          src={comm.course.cover}
                          alt=""
                          className="h-full w-full rounded-full"
                        />
                      </div>
                      <p className="text-xl">{comm.course.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : view == "courses" ? (
              <div className="grid mt-5 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-7">
                {learnings?.map((course) => (
                  <div
                    className="text-start rounded-3xl bg-white text-black hover:cursor-pointer"
                    onClick={() => {
                      setIsLearningsView(true);
                      setLearningsDetails(course);
                    }}
                  >
                    <div className="h-[25vh] rounded-t-3xl">
                      <img
                        src={course.course.cover}
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
                            {course.course.lessons
                              ? course.course.lessons.length
                              : ""}
                            x Lesson
                          </p>
                        </div>
                        <div className="flex justify-end">
                          {course.course.reviews.reduce(
                            (sum, review) => sum + review.rating,
                            0
                          ) /
                            course.course.reviews?.length ==
                          1 ? (
                            <div className="flex items-center">
                              <IoMdStar size={18} color="orange" />
                            </div>
                          ) : course.course.reviews.reduce(
                              (sum, review) => sum + review.rating,
                              0
                            ) /
                              course.course.reviews?.length ==
                            2 ? (
                            <div className="flex items-center">
                              <IoMdStar size={18} color="orange" />
                              <IoMdStar size={18} color="orange" />
                            </div>
                          ) : course.course.reviews.reduce(
                              (sum, review) => sum + review.rating,
                              0
                            ) /
                              course.course.reviews?.length ==
                            3 ? (
                            <div className="flex items-center">
                              <IoMdStar size={18} color="orange" />
                              <IoMdStar size={18} color="orange" />
                              <IoMdStar size={18} color="orange" />
                            </div>
                          ) : course.course.reviews.reduce(
                              (sum, review) => sum + review.rating,
                              0
                            ) /
                              course.course.reviews?.length ==
                            4 ? (
                            <div className="flex items-center">
                              <IoMdStar size={18} color="orange" />
                              <IoMdStar size={18} color="orange" />
                              <IoMdStar size={18} color="orange" />
                              <IoMdStar size={18} color="orange" />
                            </div>
                          ) : course.course.reviews.reduce(
                              (sum, review) => sum + review.rating,
                              0
                            ) /
                              course.course.reviews?.length ==
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
                          {course.course.level == "2"
                            ? "Intermediate"
                            : course.course.level == "3"
                            ? "Advanced"
                            : "Beginner"}
                        </p>
                        <p className="line-clamp-2  font-bold font-serif">
                          {course.course.title}
                        </p>
                      </div>
                      <p className="text-xs line-clamp-1  text-gray-600">
                        {course.course.description}
                      </p>
                    </div>
                    <div className="flex items-center  my-2 px-3 ">
                      <div className="mt-1 rounded-full bg-gray-500 w-full">
                        <p
                          className="bg-purple-600 text-white rounded-full  text-center font-medium"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.floor(
                                (course.progress.length /
                                  course.course.lessons.length) *
                                  100
                              )
                            )}%`,
                          }}
                        >
                          {`${Math.min(
                            100,
                            Math.floor(
                              (course.progress.length /
                                course.course.lessons.length) *
                                100
                            )
                          )}%`}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : view == "instructors" ? (
              <InstructorsList />
            ) : (
              <div className="px-10">
                <div className="text-2xl font-semibold my-3">
                  <p>My Certificates</p>
                </div>
                <div className=" max-h-[60vh] overflow-y-auto overflow-x-hidden grid grid-cols-2 gap-4">
                  {learnings?.map(
                    (learning) =>
                      learning.certificate && (
                        <div className="border-2  text-start flex rounded-lg">
                          <div className="h-64 w-96">
                            <img
                              src={learning.course.cover}
                              alt=""
                              className="h-full w-full rounded-l-lg"
                            />
                          </div>
                          <div className="px-4 py-2 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-end">
                                {learning.course.reviews.reduce(
                                  (sum, review) => sum + review.rating,
                                  0
                                ) /
                                  learning.course.reviews?.length ==
                                1 ? (
                                  <div className="flex items-center">
                                    <IoMdStar size={18} color="orange" />
                                  </div>
                                ) : learning.course.reviews.reduce(
                                    (sum, review) => sum + review.rating,
                                    0
                                  ) /
                                    learning.course.reviews?.length ==
                                  2 ? (
                                  <div className="flex items-center">
                                    <IoMdStar size={18} color="orange" />
                                    <IoMdStar size={18} color="orange" />
                                  </div>
                                ) : learning.course.reviews.reduce(
                                    (sum, review) => sum + review.rating,
                                    0
                                  ) /
                                    learning.course.reviews?.length ==
                                  3 ? (
                                  <div className="flex items-center">
                                    <IoMdStar size={18} color="orange" />
                                    <IoMdStar size={18} color="orange" />
                                    <IoMdStar size={18} color="orange" />
                                  </div>
                                ) : learning.course.reviews.reduce(
                                    (sum, review) => sum + review.rating,
                                    0
                                  ) /
                                    learning.course.reviews?.length ==
                                  4 ? (
                                  <div className="flex items-center">
                                    <IoMdStar size={18} color="orange" />
                                    <IoMdStar size={18} color="orange" />
                                    <IoMdStar size={18} color="orange" />
                                    <IoMdStar size={18} color="orange" />
                                  </div>
                                ) : learning.course.reviews.reduce(
                                    (sum, review) => sum + review.rating,
                                    0
                                  ) /
                                    learning.course.reviews?.length ==
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
                              <div className="py-2">
                                <button className="w-full bg-pink-600 rounded-full hover:bg-pink-600/80">
                                  Download Certificate
                                </button>
                              </div>
                              <p className="text-2xl truncate font-semibold font-serif">
                                {learning.course.title}
                              </p>
                              <div className="flex justify-between items-end gap-2">
                                <p className="text-lg">Certification Test: </p>
                                <span className="text-pink-600 font-semibold text-xl">
                                  Completed
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <p>Attendee name:</p>
                                <span className="font-medium">
                                  {user?.name.toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <div>
                              <p>Course Progress:</p>
                              <div className="flex items-center  my-2 px-3 ">
                                <div className="mt-1 rounded-full bg-gray-500 w-full">
                                  <p
                                    className="bg-pink-600 text-white rounded-full  text-center font-medium text-xs"
                                    style={{
                                      width: `${Math.min(
                                        100,
                                        Math.floor(
                                          (learning.progress.length /
                                            learning.course.lessons.length) *
                                            100
                                        )
                                      )}%`,
                                    }}
                                  >
                                    {`${Math.min(
                                      100,
                                      Math.floor(
                                        (learning.progress.length /
                                          learning.course.lessons.length) *
                                          100
                                      )
                                    )}%`}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default LearningsList;
