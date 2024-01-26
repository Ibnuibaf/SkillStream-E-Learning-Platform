import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
import { LuReplace } from "react-icons/lu";
import { RiDragDropLine } from "react-icons/ri";
import { MdDelete, MdWarningAmber } from "react-icons/md";
import { IoIosClose, IoMdStar } from "react-icons/io";
import { FaRegCirclePlay } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/actions/categoriesActions";
import { AppDispatch } from "../redux/store";
import { selectCategories } from "../redux/slices/categorySlice";
import api from "../axios/api";
import { toast } from "react-toastify";
import axios from "axios";
import { getCourses } from "../redux/actions/coursesActions";
import { selectcourses } from "../redux/slices/coursesSlice";
import swal from "sweetalert";
import { selectUser } from "../redux/slices/authSlice";
import ReactPlayer from "react-player";


interface ICoupon {
  code: string;
  value: number;
  from: Date;
  to: Date;
}

interface IReviews {
  user: { name: string; _id: string };
  rating: number;
  feedback: string;
}
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
interface ICourse {
  _id?: string;
  title: string;
  description: string;
  language: string;
  level: string;
  category: { name: string; _id: string } | string;
  instructor: { name: string; _id?: string } | string;
  cover: string;
  preview?: string;
  reviews?: IReviews[];
  mcq: IMCQ[];
  lessons: ILesson[];
  announcements: string[];
  coupons: ICoupon[];
  price: number;
  offer: number;
  isApproved: boolean;
  isBlock: boolean;
  enrollers?: string[];
}
function InstructorCourse() {
  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector(selectCategories).categories;
  const courses = useSelector(selectcourses).courses;
  const user = useSelector(selectUser).user;
  const [courseDetailView, setCourseDetailview] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  // const [submitStage, setSubmitStage] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<File | null>(null);
  const [lesson, setLesson] = useState<File | null>(null);
  const [selectedContent, setSelectedContent] = useState<ILesson>({
    content: "",
    duration: 0,
    title: "",
  });
  const [isLessonUpdate, setIsLessonUpdate] = useState<number | null>(null);
  const [mcqDetails, setMcqDetails] = useState<IMCQ>({
    question: "",
    options: [],
    answer: -1,
  });
  const [selectedMCQ, setSelectedMCQ] = useState(-1);
  const [announcement, setAnnouncement] = useState("");
  const [selectedPosOption, setSelectedPosOption] = useState("");
  const [courseDetails, setCourseDetails] = useState<ICourse>({
    title: "",
    description: "",
    language: "",
    level: "",
    category: "",
    cover: "",
    lessons: [],
    instructor: "",
    mcq: [],
    announcements: [],
    coupons: [],
    price: 0,
    offer: 0,
    isApproved: false,
    isBlock: false,
  });
  const [step, setStep] = useState(0);
  // const [selectedContentPos, setSelectedContentPos] = useState(
  //   courseDetails.lessons.length
  // );

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    setLesson(droppedFiles[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setLesson(selectedFile || null);
  };
  const handleOptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { options } = mcqDetails;
    options[index] = e.target.value;
    setMcqDetails({ ...mcqDetails });
    // console.log(mcqDetails);
  };
  const setMcqToArray = () => {
    if (
      !mcqDetails.question ||
      !mcqDetails.options[0] ||
      !mcqDetails.options[1] ||
      !mcqDetails.options[2] ||
      !mcqDetails.options[3] ||
      mcqDetails.answer < 0
    ) {
      // console.log(mcqDetails);
      // console.log(!mcqDetails.question);
      // console.log(!(mcqDetails.options.length > 3));
      // console.log(mcqDetails.answer < 0);

      toast("Enter necessary details");
    } else {
      const mcqs = courseDetails.mcq;
      const newMCQArr: IMCQ[] = [];
      mcqs.forEach((mcq) => {
        newMCQArr.push(mcq);
      });
      newMCQArr.push(mcqDetails);
      setCourseDetails({ ...courseDetails, mcq: newMCQArr });
      setMcqDetails({
        question: "",
        options: ["", "", "", ""],
        answer: -1,
      });
    }
  };
  const updateMcqInArray = () => {
    if (
      !mcqDetails.question ||
      !mcqDetails.options[0] ||
      !mcqDetails.options[1] ||
      !mcqDetails.options[2] ||
      !mcqDetails.options[3] ||
      mcqDetails.answer < 0
    ) {
      toast("Enter necessary details");
    } else {
      const mcqs = courseDetails.mcq;
      const newMCQArr: IMCQ[] = [];
      mcqs.forEach((mcq, index) => {
        if (index == selectedMCQ) {
          mcq = mcqDetails;
          // console.log(mcq,"Here its is");
        }
        newMCQArr.push(mcq);
      });
      // console.log(newMCQArr,"Updates mcqs");
      setCourseDetails({ ...courseDetails, mcq: newMCQArr });
      // console.log(courseDetails.mcq);
      setMcqDetails({
        question: "",
        options: ["", "", "", ""],
        answer: -1,
      });
      setSelectedMCQ(-1);
    }
  };
  const setLessonToArray = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedContent.content && selectedContent.title) {
      try {
        setCourseDetails((prevDetails) => {
          const { lessons } = prevDetails;

          if (isLessonUpdate !== null) {
            if (isLessonUpdate !== parseInt(e.target.value)) {
              const updatedLessons = [...lessons];

              for (let i = isLessonUpdate + 1; i < updatedLessons.length; i++) {
                updatedLessons[i - 1] = updatedLessons[i];
              }
              updatedLessons.pop();
              for (
                let i = updatedLessons.length;
                i > parseInt(e.target.value);
                i--
              ) {
                updatedLessons[i] = updatedLessons[i - 1];
              }
              updatedLessons[parseInt(e.target.value)] = selectedContent;

              setIsLessonUpdate(parseInt(e.target.value));
              return { ...prevDetails, lessons: updatedLessons };
            } else {
              const updatedLessons = [...lessons];
              updatedLessons[isLessonUpdate] = selectedContent;

              return { ...prevDetails, lessons: updatedLessons };
            }
          } else {
            const updatedLessons = [...lessons];
            for (
              let i = updatedLessons.length;
              i > parseInt(e.target.value);
              i--
            ) {
              updatedLessons[i] = updatedLessons[i - 1];
            }
            updatedLessons[parseInt(e.target.value)] = selectedContent;

            setIsLessonUpdate(parseInt(e.target.value));
            return { ...prevDetails, lessons: updatedLessons };
          }
        });

        setSelectedPosOption(e.target.value);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const createCourse = async () => {
    try {
      // setSubmitStage(true);
      if (
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
      const confirmed = await swal(
        "Are you sure create course with this details?",
        {
          buttons: ["Cancel", true],
        }
      );
      if (confirmed) {
        if (user && user._id) {
          setCourseDetails({
            ...courseDetails,
            instructor: user._id as string,
          });
        }
        console.log(courseDetails);

        await api.post("/course/create", courseDetails);
        // setSubmitStage(false);
        setCourseDetailview(false);
        setCourseDetails({
          title: "",
          description: "",
          language: "",
          level: "",
          category: "",
          instructor: "",
          cover: "",
          lessons: [],
          mcq: [],
          announcements: [],
          coupons: [],
          price: 0,
          offer: 0,
          isApproved: false,
          isBlock: false,
        });
        setCoverImage(null);
        setStep(0);
        setAnnouncement("");
        setNewCourse(false);
        dispatch(getCourses({ search, isInstructor: true }));
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error?.response?.data?.message);
      } else {
        toast("An unexpected error occurred");
      }
    }
  };
  const updateCourse = async () => {
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
        await api.patch("/course/update", courseDetails);
        // setSubmitStage(false);
        setCourseDetailview(false);
        setCourseDetails({
          title: "",
          description: "",
          language: "",
          level: "",
          category: "",
          cover: "",
          lessons: [],
          instructor: "",
          announcements: [],
          mcq: [],
          coupons: [],
          price: 0,
          offer: 0,
          isApproved: false,
          isBlock: false,
        });
        setCoverImage(null);
        setStep(0);
        setAnnouncement("");
        setNewCourse(false);
        dispatch(getCourses({ search, isInstructor: true }));
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error?.response?.data?.message);
      } else {
        toast("An unexpected error occurred");
      }
    }
  };
  const uploadVideo = async () => {
    if (lesson) {
      setLoading(true);
      const data = new FormData();
      data.append("file", lesson);
      data.append("upload_preset", "video_preset");
      try {
        const cloudName = "dshijvj8y";

        const api = `https://api.cloudinary.com/v1_1/${cloudName}/${"video"}/upload`;
        const res = await axios.post(api, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // console.log(res);
        const { secure_url } = res.data;
        setSelectedContent({ ...selectedContent, content: secure_url });
        setLoading(false);
      } catch (error: unknown) {
        setLoading(false);
        if (axios.isAxiosError(error)) {
          toast(error?.response?.data?.message);
        } else {
          toast("An unexpected error occurred");
        }
      }
    }
  };
  const uploadPreview = async () => {
    if (preview) {
      setLoading(true);
      const data = new FormData();
      data.append("file", preview);
      data.append("upload_preset", "video_preset");
      try {
        const cloudName = "dshijvj8y";

        const api = `https://api.cloudinary.com/v1_1/${cloudName}/${"video"}/upload`;
        const res = await axios.post(api, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // console.log(res);
        const { secure_url } = res.data;
        setCourseDetails({ ...courseDetails, preview: secure_url });
        setLoading(false);
      } catch (error: unknown) {
        setLoading(false);
        if (axios.isAxiosError(error)) {
          toast(error?.response?.data?.message);
        } else {
          toast("An unexpected error occurred");
        }
      }
    }
  };
  const uploadImage = async () => {
    if (coverImage) {
      setLoading(true);
      const data = new FormData();
      data.append("file", coverImage);
      data.append("upload_preset", "image_preset");
      try {
        const cloudName = "dshijvj8y";

        const api = `https://api.cloudinary.com/v1_1/${cloudName}/${"image"}/upload`;
        const res = await axios.post(api, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // console.log(res);
        const { secure_url } = res.data;
        setCourseDetails({ ...courseDetails, cover: secure_url });
        setCoverImage(null);
        console.log(courseDetails);
        setLoading(false);
      } catch (error: unknown) {
        setLoading(false);
        if (axios.isAxiosError(error)) {
          toast(error?.response?.data?.message);
        } else {
          toast("An unexpected error occurred");
        }
      }
    }
  };

  useEffect(() => {
    dispatch(getCategories(""));
    dispatch(getCourses({ search: "", isInstructor: true }));
  }, [dispatch]);

  // useEffect(() => {
  // }, [courseDetails]);
  return (
    <div className="lg:p-10 min-h-screen">
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
                  instructor: "",
                  lessons: [],
                  mcq: [],
                  announcements: [],
                  coupons: [],
                  price: 0,
                  offer: 0,
                  isApproved: false,
                  isBlock: false,
                });
                setIsLessonUpdate(null);
                setSelectedContent({
                  content: "",
                  duration: 0,
                  title: "",
                });
              }}
              className="border px-2 p-1 bg-gray-700 hover:bg-gray-800 transition duration-300"
            >
              Discard Changes
            </button>
            <button
              onClick={() => (newCourse ? createCourse() : updateCourse())}
              className="border px-2 p-1 hover:bg-white hover:text-black font-medium transition duration-300"
            >
              Save Changes
            </button>
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
            <div className="border p-5 px-10 mt-6 rounded-lg text-start">
              <div className="lg:flex justify-between items-start">
                <div className="lg:w-[30%]">
                  <div className=" text-end flex gap-1 justify-between items-end">
                    <p className="text-lg font-medium">Add Lessons: </p>
                    {!selectedContent.content && (
                      <button
                        className="block border-2 px-6 py-1 border-violet-500 text-violet-500 font-medium"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Video
                      </button>
                    )}
                    {/* <button
                      className="block border-2 px-6 py-1 border-violet-500 text-violet-500 font-medium"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Document
                    </button> */}

                    {isModalOpen && (
                      <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-30 flex items-center justify-center">
                        <div className="p-8 max-w-2xl mx-auto rounded-lg">
                          <div className="relative p-4 w-full max-w-2xl max-h-full">
                            <div className="relative rounded-lg shadow dark:bg-purple-900">
                              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t gap-1 dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                  Upload Your Lesson Here
                                </h3>
                                <button
                                  type="button"
                                  disabled={loading}
                                  className="end-2.5 text-gray-400 bg-transparent hover:bg-purple-500/30 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-purple-500/30 dark:hover:text-white"
                                  onClick={() => {
                                    setIsModalOpen(false);
                                    setLesson(null);
                                  }}
                                >
                                  <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                  >
                                    <path
                                      stroke="currentColor"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                  </svg>
                                  <span className="sr-only">Close modal</span>
                                </button>
                              </div>
                              {/* <!-- Modal body --> */}
                              <div className="p-4 md:p-5 text-start">
                                <div className="space-y-4">
                                  <div>
                                    <label
                                      htmlFor=""
                                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                      Your Content
                                    </label>
                                    <div
                                      id="drop-area"
                                      className="bg-gray-50 text-center border px-30 py-20 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                      onDrop={handleDrop}
                                      onDragOver={(e) => e.preventDefault()}
                                    >
                                      {loading ? (
                                        <div className="flex justify-center">
                                          <div
                                            role="status"
                                            className="flex flex-col items-center gap-3"
                                          >
                                            <svg
                                              aria-hidden="true"
                                              className="w-8 h-8 text-gray-200 animate-spin-slow-10 dark:text-gray-300 fill-violet-600 font-extrabold"
                                              viewBox="0 0 100 101"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"
                                              />
                                              <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill"
                                              />
                                            </svg>
                                            <span className="sr-only">
                                              Loading...
                                            </span>
                                            <p className="animate-pulse">
                                              Uploading...
                                            </p>
                                          </div>
                                        </div>
                                      ) : lesson ? (
                                        <div className="flex items-center justify-between gap-3 bg-violet-800 px-4 py-2 rounded-lg">
                                          <p>{lesson?.name}</p>
                                          {!selectedContent.content && (
                                            <button
                                              className=""
                                              onClick={() => setLesson(null)}
                                            >
                                              <IoIosClose
                                                size={24}
                                                className="hover:text-red-600 font-bold "
                                              />
                                            </button>
                                          )}
                                        </div>
                                      ) : (
                                        <label
                                          htmlFor="file-input"
                                          className="h-full cursor-pointer"
                                        >
                                          <b className="text-gray-400 mb-3 flex items-center">
                                            <RiDragDropLine size={60} /> Drag &
                                            drop your file here or click to
                                            select
                                          </b>
                                          <input
                                            type="file"
                                            name="file-input"
                                            accept="video/*"
                                            className=""
                                            // value={files[0].name}
                                            id="file-input"
                                            onChange={handleInputChange}
                                          />
                                        </label>
                                      )}
                                    </div>
                                  </div>

                                  <div className="mt-2">
                                    <button
                                      type="button"
                                      className="w-full flex justify-center text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800  disabled:bg-purple-700/30"
                                      onClick={uploadVideo}
                                      disabled={
                                        selectedContent.content || loading
                                          ? true
                                          : false
                                      }
                                    >
                                      {loading ? (
                                        <div
                                          role="status"
                                          className="flex items-center gap-2"
                                        >
                                          <svg
                                            aria-hidden="true"
                                            className="w-4 h-4 text-gray-200 animate-spin-slow-10 dark:text-gray-300 fill-violet-600 font-extrabold"
                                            viewBox="0 0 100 101"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                              fill="currentColor"
                                            />
                                            <path
                                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                              fill="currentFill"
                                            />
                                          </svg>
                                          <span className="sr-only">
                                            Loading...
                                          </span>
                                          <p className="animate-pulse">
                                            Uploading...
                                          </p>
                                        </div>
                                      ) : (
                                        "Upload Content"
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="text-end py-2 px-4">
                                <button
                                  className="text-white bg-violet-800 hover:bg-violet-800/80 px-4 py-1 rounded"
                                  disabled={loading}
                                  onClick={() => {
                                    setIsModalOpen(false);
                                    setLesson(null);
                                  }}
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
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
                          className="flex gap-2 items-center bg-purple-900/70 rounded-md py-1 px-3 mb-1 cursor-pointer"
                          onClick={() => {
                            setSelectedContent(lesson);
                            setIsLessonUpdate(index);
                          }}
                        >
                          <p className="italic text-xs text-gray-400">
                            {Math.floor(Number(lesson.duration) / 3600)} :{" "}
                            {Math.floor((Number(lesson.duration) % 3600) / 60)}{" "}
                            : {Math.floor(Number(lesson.duration) % 60)} hrs
                          </p>
                          <p>{`${index + 1} ${lesson.title}`}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-3 lg:mt-0">
                  <div
                    className={`${
                      !selectedContent.content && !selectedContent.content
                        ? "bg-white/80"
                        : ""
                    } h-[30vh] lg:h-[55vh] lg:w-[50vw] `}
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
                    <div className="flex gap-2  h-max">
                      {/* <button
                        className="flex gap-1 py-1 border-2 border-red-800 px-3 text-red-800 hover:bg-red-800 hover:text-white"
                        title="Delete"
                        disabled={selectedContent.content ? false : true}
                        onClick={() => {
                          swal("Are you sure to replace content?", {
                            buttons: ["Cancel", true],
                          }).then((confirm) => {
                            if (confirm) {
                              setSelectedContent({
                                ...selectedContent,
                                content: "",
                              });
                            }
                          });
                        }}
                      >
                        <MdDelete size={24} />{" "}
                      </button> */}
                      <button
                        className="flex gap-1 py-1 border-2 border-violet-500 px-3 text-violet-500 hover:bg-violet-500 hover:text-white"
                        title="Replace"
                        disabled={selectedContent.content ? false : true}
                        onClick={() => {
                          swal("Are you sure to replace content?", {
                            buttons: ["Cancel", true],
                          }).then((confirm) => {
                            if (confirm) {
                              setSelectedContent({
                                ...selectedContent,
                                content: "",
                              });
                            }
                          });
                        }}
                      >
                        <LuReplace size={24} />
                        {" Replace"}
                      </button>
                    </div>
                  </div>
                  <div className="text-end mt-2">
                    <button
                      onClick={() => {
                        if (selectedContent.title && selectedContent.content) {
                          if (isLessonUpdate != null) {
                            swal("Are you sure to save changes?", {
                              buttons: ["Cancel", true],
                            }).then((confirm) => {
                              if (confirm) {
                                const { lessons } = courseDetails;
                                lessons[isLessonUpdate] = selectedContent;
                                console.log(lessons);
                                setSelectedContent({
                                  content: "",
                                  duration: 0,
                                  title: "",
                                });
                                setIsLessonUpdate(null);
                                setSelectedPosOption("");
                              }
                            });
                          } else {
                            toast("Select lesson position");
                          }
                        } else {
                          toast("Fill every necessary fields");
                        }
                      }}
                      className="border-2 text-purple-900 border-purple-900 hover:bg-purple-900 hover:text-white px-4 py-1"
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className="">
                  <p className="font-medium mb-2">Lesson Title</p>
                  <input
                    type="text"
                    className="border bg-transparent pt-2 pb-1 px-2 w-full outline-none"
                    placeholder="Insert your lesson title.."
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
                <div className="">
                  <p className="font-medium mb-2">Lesson Position</p>
                  <select
                    name=""
                    id=""
                    value={selectedPosOption}
                    className="border bg-transparent py-2 px-3"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setLessonToArray(e)
                    }
                  >
                    <option value="" disabled selected className="text-black">
                      --Select Lesson position After--
                    </option>
                    <option
                      value={courseDetails.lessons.length || 0}
                      className="text-black"
                    >
                      --At last--
                    </option>
                    {courseDetails.lessons.map((_, index) =>
                      isLessonUpdate !== null &&
                      (isLessonUpdate - 1 == index ||
                        isLessonUpdate == index) ? (
                        ""
                      ) : (
                        <option
                          key={index}
                          value={index + 1}
                          className="text-black"
                        >
                          After {index + 1}
                        </option>
                      )
                    )}
                  </select>
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
                <input
                  type="text"
                  value={announcement}
                  className="border bg-transparent pt-2 pb-1 px-2 w-full outline-none"
                  placeholder="Insert the announcement content.."
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAnnouncement(e.target.value)
                  }
                />
                <br />
                <p className="text-xs text-gray-400 italic">
                  Your announcement should be a mix of attention-grabbing,
                  informative,
                </p>
                <div className="flex justify-end text-end">
                  <button
                    onClick={() => {
                      if (announcement) {
                        setCourseDetails({
                          ...courseDetails,
                          announcements: [
                            ...courseDetails.announcements,
                            announcement,
                          ],
                        });
                        setAnnouncement("");
                      }
                    }}
                    className="flex gap-1 items-center rounded-md bg-purple-600/30 hover:bg-purple-600/70 transition duration-300 px-4 py-1"
                  >
                    <GrAnnounce /> Announce
                  </button>
                </div>
              </div>
              <div className="border px-8 py-4 mt-5 h-[45vh] overflow-y-auto overflow-x-hidden">
                {courseDetails.announcements.map((announce) => (
                  <div className="flex justify-between bg-violet-400/40 px-3 py-2 rounded mb-2">
                    <p>{announce}</p>
                    <button
                      onClick={() => {
                        const updatedAnnouncements =
                          courseDetails.announcements.filter(
                            (announcements) => announcements !== announce
                          );
                        setCourseDetails({
                          ...courseDetails,
                          announcements: updatedAnnouncements,
                        });
                      }}
                      className="text-red-600"
                    >
                      <MdDelete size={24} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : step == 3 ? (
            ""
          ) : step == 4 ? (
            <div className="border p-5 px-10 mt-6 rounded-lg text-start lg:flex justify-between gap-6">
              <div className="border lg:max-w-[20vw] ">
                <div className="p-1 bg-purple-950 border-b">
                  <p className="text-xl font-medium px-4 ">Questions</p>
                </div>
                <div className="w-[20vw] h-[65vh] px-4 py-2 overflow-y-auto">
                  {courseDetails.mcq.map((mc, index) => (
                    <div
                      className="flex bg-purple-700 px-4 py-1 rounded-md gap-2 cursor-pointer mb-2"
                      onClick={() => {
                        setMcqDetails(mc);
                        setSelectedMCQ(index);
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
                  <p className="text-2xl font-semibold">
                    Add MCQ to the course
                  </p>
                </div>
                <div>
                  <div>
                    <input
                      type="text"
                      className="bg-transparent border w-full py-1 text-lg px-2 outline-none"
                      placeholder="Enter the question for mcq.."
                      value={mcqDetails.question}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setMcqDetails({
                          ...mcqDetails,
                          question: e.target.value,
                        })
                      }
                    />
                    <p className="text-violet-300 text-xs">
                      Give a questions to the row.
                    </p>
                  </div>
                  <div className="p-2 grid lg:grid-cols-2 border lg:mx-2 mt-5 gap-3">
                    <div>
                      <input
                        type="text"
                        value={mcqDetails.options[0]}
                        className="bg-transparent border w-full py-1 px-2 outline-none"
                        placeholder="Enter the option for question"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleOptionChange(e, 0)
                        }
                      />
                      <p className="text-violet-300 text-xs">
                        Specify a option No.1
                      </p>
                    </div>
                    <div>
                      <input
                        type="text"
                        value={mcqDetails.options[1]}
                        className="bg-transparent border w-full py-1 px-2 outline-none"
                        placeholder="Enter the option for question"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleOptionChange(e, 1)
                        }
                      />
                      <p className="text-violet-300 text-xs">
                        Specify a option No.2
                      </p>
                    </div>
                    <div>
                      <input
                        type="text"
                        value={mcqDetails.options[2]}
                        className="bg-transparent border w-full py-1 px-2 outline-none"
                        placeholder="Enter the option for question"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleOptionChange(e, 2)
                        }
                      />
                      <p className="text-violet-300 text-xs">
                        Specify a option No.3
                      </p>
                    </div>
                    <div>
                      <input
                        type="text"
                        value={mcqDetails.options[3]}
                        className="bg-transparent border w-full py-1 px-2 outline-none"
                        placeholder="Enter the option for question"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleOptionChange(e, 3)
                        }
                      />
                      <p className="text-violet-300 text-xs">
                        Specify a option No.4
                      </p>
                    </div>
                  </div>
                  <div className="mt-5">
                    <select
                      name=""
                      id=""
                      className="bg-transparent border w-full py-1 px-2 outline-none"
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setMcqDetails({
                          ...mcqDetails,
                          answer: Number(e.target.value),
                        })
                      }
                    >
                      <option value="" selected={!mcqDetails.answer}>
                        --Select the right answer--
                      </option>
                      <option value={0} selected={mcqDetails.answer == 0}>
                        1
                      </option>
                      <option value={1} selected={mcqDetails.answer == 1}>
                        2
                      </option>
                      <option value={2} selected={mcqDetails.answer == 2}>
                        3
                      </option>
                      <option value={3} selected={mcqDetails.answer == 3}>
                        4
                      </option>
                    </select>
                  </div>
                  <div className="flex justify-end mt-3">
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
                  </div>
                </div>
              </div>
            </div>
          ) : step == 5 ? (
            <div className="border p-5 px-10 mt-6 rounded-lg text-start">
              <div className="">
                <p className="text-2xl font-medium mb-2">Pricing</p>
                <p className="text-sm text-gray-200 ">
                  Please select the currency and the price tier for your course.
                  If you’d like to offer your course for free, it must have a
                  total video length of less than 2 hours. Also, courses with
                  practice tests can not be free.
                </p>
                {/* <div className="flex justify-end text-end">
                  <button className="flex gap-1 items-center rounded-md bg-purple-600/30 hover:bg-purple-600/70 transition duration-300 px-4 py-1">
                    Save
                  </button>
                </div> */}
              </div>
              <div className=" mt-5 lg:flex gap-5">
                <div className="lg:flex gap-2 items-end">
                  <p className="text-lg">Course Price : </p>
                  <select
                    name=""
                    id=""
                    value={courseDetails.price}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setCourseDetails({
                        ...courseDetails,
                        price: Number(e.target.value),
                      })
                    }
                    className="bg-transparent font-semibold border px-4 py-2"
                  >
                    <option value="" selected className="text-black">
                      --Select Course Price--
                    </option>
                    <option value="199" className="text-black">
                      $ 199/-
                    </option>
                    <option value="299" className="text-black">
                      $ 299/-
                    </option>
                    <option value="399" className="text-black">
                      $ 399/-
                    </option>
                    <option value="459" className="text-black">
                      $ 459/-
                    </option>
                    <option value="499" className="text-black">
                      $ 499/-
                    </option>
                    <option value="599" className="text-black">
                      $ 599/-
                    </option>
                    <option value="639" className="text-black">
                      $ 639/-
                    </option>
                    <option value="699" className="text-black">
                      $ 699/-
                    </option>
                    <option value="799" className="text-black">
                      $ 799/-
                    </option>
                    <option value="809" className="text-black">
                      $ 809/-
                    </option>
                    <option value="1549" className="text-black">
                      $ 1549/-
                    </option>
                    <option value="1909" className="text-black">
                      $ 1909/-
                    </option>
                    <option value="2109" className="text-black">
                      $ 2109/-
                    </option>
                  </select>
                </div>
                <div className="lg:flex gap-2 items-end mt-3 lg:mt-0">
                  <p className="text-lg">Course Offer % (optional) : </p>
                  <input
                    type="number"
                    value={courseDetails.offer}
                    className="border bg-transparent px-4 pt-2 pb-1 outline-none"
                    placeholder="%"
                    max={100}
                    min={0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCourseDetails({
                        ...courseDetails,
                        offer: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            </div>
          ) : step == 6 ? (
            <div className="border p-5 px-10 mt-6 rounded-lg text-start">
              {newCourse ? (
                <div className="flex justify-center items-center h-[70vh]">
                  <div className="border-4 border-pink-600 p-5">
                    <div className="flex justify-between items-center">
                      <p className="text-3xl  font-semibold">
                        Course Statistics
                      </p>
                      <MdWarningAmber size={50} className="text-pink-600" />
                    </div>
                    <p className="mt-5 text-xl font-bold">
                      After Course Created you can see the Statistics
                    </p>
                  </div>
                </div>
              ) : (
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
                      {courseDetails.reviews?.map((review) => (
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
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="border p-5 lg:px-10 mt-6 rounded-lg text-start">
              <div className="">
                <p className="text-xl font-medium mb-2">Course Title</p>
                <input
                  type="text"
                  className="border bg-transparent pt-2 pb-1 px-2 w-full outline-none"
                  placeholder="Insert your course title.."
                  value={courseDetails.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCourseDetails({
                      ...courseDetails,
                      title: e.target.value,
                    })
                  }
                />
                <br />
                <p className="text-xs text-gray-400 italic">
                  Your title should be a mix of attention-grabbing, informative,
                  and optimized.
                </p>
              </div>
              <div className="mt-5">
                <p className="text-xl font-medium mb-2">Course Description</p>
                <textarea
                  className="border bg-transparent pt-2 pb-1 px-2 w-full outline-none resize-none"
                  placeholder="Insert your course title.."
                  rows={5}
                  value={courseDetails.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setCourseDetails({
                      ...courseDetails,
                      description: e.target.value,
                    })
                  }
                ></textarea>
                <br />
                <p className="text-xs text-gray-400 italic">
                  Your title should be a mix of attention-grabbing, informative,
                  and optimized.
                </p>
              </div>
              <div className="mt-5">
                <p className="text-xl font-medium mb-2">Basic Info</p>
                <div className="grid grid-col-1 lg:grid-cols-2 gap-2">
                  <select
                    name=""
                    id=""
                    className="border bg-transparent py-2 px-3"
                    value={courseDetails.language}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setCourseDetails({
                        ...courseDetails,
                        language: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled>
                      --Select Course Language--
                    </option>
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
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setCourseDetails({
                        ...courseDetails,
                        category: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled>
                      --Select Course Category--
                    </option>
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
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setCourseDetails({
                        ...courseDetails,
                        level: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled>
                      --Select Course Level--
                    </option>
                    <option value="1">Beginner</option>
                    <option value="2">Intermediate</option>
                    <option value="3">Advanced</option>
                  </select>
                </div>
                <p className="text-xs text-gray-400 italic">
                  Your title should be a mix of attention-grabbing, informative,
                  and optimized.
                </p>
              </div>
              <div className="mt-5 ">
                <p className="text-xl font-medium mb-2">Cover Image</p>
                <div className="">
                  {loading ? (
                    <div className="flex space-x-2 animate-pulse">
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    </div>
                  ) : courseDetails.cover ? (
                    <div className="h-52 w-[60%] flex items-start gap-2">
                      <button
                        onClick={() =>
                          setCourseDetails({ ...courseDetails, cover: "" })
                        }
                        className="border px-2 py-1 rounded text-red-600 hover:bg-red-600 hover:text-white"
                      >
                        <MdDelete size={24} />
                      </button>
                      <img
                        src={`${courseDetails.cover}`}
                        alt=""
                        className="h-full"
                      />
                    </div>
                  ) : (
                    <div className="flex justify-between">
                      <div className="border bg-transparent pt-2 pb-1 px-2 w-full outline-none flex justify-between items-center">
                        <input
                          id="upload"
                          type="file"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            e.target.files
                              ? setCoverImage(e.target.files[0])
                              : setCoverImage(null)
                          }
                          accept="image/*"
                        />
                      </div>
                      <button
                        onClick={() => uploadImage()}
                        className="border px-4 py-1 bg-slate-600 hover:bg-slate-600/30"
                      >
                        Upload
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-5 ">
                <p className="text-xl font-medium mb-2">Preview Video</p>
                <div className="">
                  {loading ? (
                    <div className="flex space-x-2 animate-pulse">
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    </div>
                  ) : courseDetails.preview ? (
                    <div className="h-52 w-96 flex items-start gap-2">
                      <button
                        onClick={() =>
                          setCourseDetails({ ...courseDetails, preview: "" })
                        }
                        className="border px-2 py-1 rounded text-red-600 hover:bg-red-600 hover:text-white"
                      >
                        <MdDelete size={24} />
                      </button>
                      <ReactPlayer
                        url={courseDetails.preview}
                        controls
                        playing={false}
                        width={"100%"}
                        height={"100%"}
                      />
                    </div>
                  ) : (
                    <div className="flex justify-between">
                      <div className="border bg-transparent pt-2 pb-1 px-2 w-full outline-none flex justify-between items-center">
                        <input
                          id="upload"
                          type="file"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            e.target.files
                              ? setPreview(e.target.files[0])
                              : setPreview(null)
                          }
                          accept="video/*"
                        />
                      </div>
                      <button
                        onClick={() => uploadPreview()}
                        className="border px-4 py-1 bg-slate-600 hover:bg-slate-600/30"
                      >
                        Upload
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="border lg:px-5 py-2 h-full">
          <div className="md:flex  justify-between px-5 ">
            <div className="text-start ">
              <p className="text-2xl font-medium mb-2">Your Courses</p>
              <div className="flex gap-3 items-end">
                <div className="flex border ">
                  <input
                    type="text"
                    placeholder="Search your courses.."
                    value={search}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSearch(e.target.value)
                    }
                    className="bg-transparent text-sm outline-none min-w-[20vw] px-2 py-1 "
                  />
                  <button
                    onClick={() => {
                      dispatch(getCourses({ search, isInstructor: true }));
                      setSearch("");
                    }}
                    className="h-[100%] flex items-end bg-white text-black px-2 py-1 font-medium hover:bg-slate-400 transition duration-300"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-start mt-3 lg:mt-0">
              <button
                onClick={() => {
                  setCourseDetailview(true);
                  setNewCourse(true);
                }}
                className="flex items-center gap-1 border-2 border-violet-600 text-violet-600 font-semibold px-8 py-1 hover:bg-violet-600 hover:text-white transition duration-300"
              >
                CREATE <FaPlus size={14} />{" "}
              </button>
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
                  <div className="flex justify-between">
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
                          setNewCourse(false);
                        }}
                        className="border rounded-full px-4 py-1 my-3 text-purple-600 border-purple-600 hover:shadow hover:shadow-violet-800 transition duration-300 hover:bg-purple-600 hover:text-white"
                      >
                        Detail/edit
                      </button>
                    </div>
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

export default InstructorCourse;
