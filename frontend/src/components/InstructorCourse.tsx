import React, { ChangeEvent, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
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

interface ICoupon {
  code: string;
  value: number;
  from: Date;
  to: Date;
}

interface ILesson {
  title: string;
  content: string;
  duration: string;
}

interface ICourse {
  _id?:string
  title: string;
  description: string;
  language: string;
  level: string;
  category: string;
  cover: string;
  lessons: ILesson[];
  announcements: string[];
  coupons: ICoupon[];
  price: number;
  offer: number;
  isApproved: boolean;
  isBlock: boolean;
}
function InstructorCourse() {
  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector(selectCategories).categories;
  const courses = useSelector(selectcourses).courses;
  const [courseDetailView, setCourseDetailview] = useState(false);
  const [newCourse, setNewCourse] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitStage, setSubmitStage] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const [courseDetails, setCourseDetails] = useState<ICourse>({
    title: "",
    description: "",
    language: "",
    level: "",
    category: "",
    cover: "",
    lessons: [],
    announcements: [],
    coupons: [],
    price: 0,
    offer: 0,
    isApproved: false,
    isBlock: false,
  });
  const [step, setStep] = useState(0);

  const createCourse = async () => {
    try {
      setSubmitStage(true);
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
      const confirmed = await swal("Are you sure create course with this details?", {
        buttons: ["Cancel", true],
      });
      if(confirmed){
        await api.post("/course/create", courseDetails);
        setSubmitStage(false);
        setCourseDetailview(false);
        setCourseDetails({
          title: "",
          description: "",
          language: "",
          level: "",
          category: "",
          cover: "",
          lessons: [],
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
        dispatch(getCourses(search));
      }
    } catch (error: any) {
      toast(error.response.data.message);
    }
  };
  const updateCourse = async () => {
    try {
      setSubmitStage(true);
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
      if(confirmed){
        await api.patch("/course/update", courseDetails);
        setSubmitStage(false);
        setCourseDetailview(false);
        setCourseDetails({
          title: "",
          description: "",
          language: "",
          level: "",
          category: "",
          cover: "",
          lessons: [],
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
        dispatch(getCourses(search));
      }
    } catch (error: any) {
      toast(error.response.data.message);
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
        console.log(res);
        const { secure_url } = res.data;
        setCourseDetails({ ...courseDetails, cover: secure_url });
        setCoverImage(null);
        console.log(courseDetails);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        toast("error");

        toast(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    dispatch(getCategories(""));
    dispatch(getCourses(search));
  }, []);

  // useEffect(() => {
  // }, [courseDetails]);
  return (
    <>
      {courseDetailView ? (
        <div className="">
          <div className="flex justify-end my-2 gap-2">
            <button
              onClick={() => setCourseDetailview(false)}
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
            <div
              className={`border w-full py-2 ${
                step == 3 ? "bg-gray-500 font-medium" : ""
              }`}
            >
              <button onClick={() => setStep(3)}>Promotion</button>
            </div>
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
            ""
          ) : // <div className="border p-5 px-10 mt-6 rounded-lg text-start">
          //   <div className="flex justify-between items-start">
          //     <div className="w-[30%]">
          //       <div className=" text-end">
          //         <button className="border-2 px-6 py-1 border-violet-500 text-violet-500 font-medium ">
          //           Add Lesson
          //         </button>
          //       </div>
          //       <div className="border p-3 mt-2">
          //         <div className="flex justify-between items-end gap-2">
          //           <p className="text-xl">Lessons List</p>
          //           <p className="text-sm text-gray-400 italic"> 10 Lessons</p>
          //         </div>
          //         <div className="h-[50vh] mt-2 overflow-y-scroll overflow-x-hidden">
          //           <div className="flex gap-2 items-center bg-purple-900/70 rounded-md py-1 px-3 mb-1">
          //             <p className="italic text-xs text-gray-400">21:12</p>
          //             <p>1. Introduction to JS</p>
          //           </div>
          //           <div className="flex gap-2 items-center bg-purple-900/70 rounded-md py-1 px-3 mb-1">
          //             <p className="italic text-xs text-gray-400">21:12</p>
          //             <p>1. Introduction to JS</p>
          //           </div>
          //           <div className="flex gap-2 items-center bg-purple-900/70 rounded-md py-1 px-3 mb-1">
          //             <p className="italic text-xs text-gray-400">21:12</p>
          //             <p>1. Introduction to JS</p>
          //           </div>
          //           <div className="flex gap-2 items-center bg-purple-900/70 rounded-md py-1 px-3 mb-1">
          //             <p className="italic text-xs text-gray-400">21:12</p>
          //             <p>1. Introduction to JS</p>
          //           </div>
          //           <div className="flex gap-2 items-center bg-purple-900/70 rounded-md py-1 px-3 mb-1">
          //             <p className="italic text-xs text-gray-400">21:12</p>
          //             <p>1. Introduction to JS</p>
          //           </div>
          //           <div className="flex gap-2 items-center bg-purple-900/70 rounded-md py-1 px-3 mb-1">
          //             <p className="italic text-xs text-gray-400">21:12</p>
          //             <p>1. Introduction to JS</p>
          //           </div>
          //           <div className="flex gap-2 items-center bg-purple-900/70 rounded-md py-1 px-3 mb-1">
          //             <p className="italic text-xs text-gray-400">21:12</p>
          //             <p>1. Introduction to JS</p>
          //           </div>
          //           <div className="flex gap-2 items-center bg-purple-900/70 rounded-md py-1 px-3 mb-1">
          //             <p className="italic text-xs text-gray-400">21:12</p>
          //             <p>1. Introduction to JS</p>
          //           </div>
          //         </div>
          //       </div>
          //     </div>
          //     <div>
          //       <div className="bg-white h-[55vh] w-[50vw]">
          //         <embed src="" type="" />
          //       </div>
          //       <div className="flex justify-between mt-3">
          //         <div>
          //           <p className="text-xl">Introduction to JS on part 1</p>
          //           <p className="text-sm text-gray-300">
          //             Duration: 00:15:27 hrs
          //           </p>
          //         </div>
          //         <div className="flex gap-2 px-6 h-max">
          //           <button
          //             className="flex gap-1 py-1 border-2 border-red-800 px-3 text-red-800 hover:bg-red-800 hover:text-white"
          //             title="Delete"
          //           >
          //             <MdDelete size={24} />{" "}
          //           </button>
          //           <button
          //             className="flex gap-1 py-1 border-2 border-violet-500 px-3 text-violet-500 hover:bg-violet-500 hover:text-white"
          //             title="Replace"
          //           >
          //             <LuReplace size={24} />{" "}
          //           </button>
          //         </div>
          //       </div>
          //       <div className="text-end mt-2">
          //         <button className="border-2 text-purple-900 border-purple-900 hover:bg-purple-900 hover:text-white px-4 py-1">
          //           Save changes
          //         </button>
          //       </div>
          //     </div>
          //   </div>
          //   <div>
          //     <div className="">
          //       <p className="font-medium mb-2">Lesson Title</p>
          //       <input
          //         type="text"
          //         className="border bg-transparent pt-2 pb-1 px-2 w-full outline-none"
          //         placeholder="Insert your lesson title.."
          //       />
          //       <br />
          //       <p className="text-xs text-gray-400 italic">
          //         Your title should be a mix of attention-grabbing, informative,
          //         and optimized.
          //       </p>
          //     </div>
          //     <div className="">
          //       <p className="font-medium mb-2">Lesson Position</p>
          //       <select name="" id="" className="border bg-transparent py-2 px-3">
          //         <option value="" selected className="text-black">
          //           --Select Lesson position After--
          //         </option>
          //         <option value="" className="text-black">
          //           --At last--
          //         </option>
          //         <option value="" className="text-black">
          //           -- 1 --
          //         </option>
          //         <option value="" className="text-black">
          //           -- 1 --
          //         </option>
          //         <option value="" className="text-black">
          //           -- 1 --
          //         </option>
          //       </select>
          //       <p className="text-xs text-gray-400 italic">
          //         Your title should be a mix of attention-grabbing, informative,
          //         and optimized.
          //       </p>
          //     </div>
          //   </div>
          // </div>
          step == 2 ? (
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
            ""
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
                <div className="flex justify-end text-end">
                  <button className="flex gap-1 items-center rounded-md bg-purple-600/30 hover:bg-purple-600/70 transition duration-300 px-4 py-1">
                    Save
                  </button>
                </div>
              </div>
              <div className=" mt-5 flex gap-5">
                <div className="flex gap-2 items-end">
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
                      &#8377; 199/-
                    </option>
                    <option value="299" className="text-black">
                      &#8377; 299/-
                    </option>
                    <option value="399" className="text-black">
                      &#8377; 399/-
                    </option>
                    <option value="459" className="text-black">
                      &#8377; 459/-
                    </option>
                    <option value="499" className="text-black">
                      &#8377; 499/-
                    </option>
                    <option value="599" className="text-black">
                      &#8377; 599/-
                    </option>
                    <option value="639" className="text-black">
                      &#8377; 639/-
                    </option>
                    <option value="699" className="text-black">
                      &#8377; 699/-
                    </option>
                    <option value="799" className="text-black">
                      &#8377; 799/-
                    </option>
                    <option value="809" className="text-black">
                      &#8377; 809/-
                    </option>
                    <option value="1549" className="text-black">
                      &#8377; 1549/-
                    </option>
                    <option value="1909" className="text-black">
                      &#8377; 1909/-
                    </option>
                    <option value="2109" className="text-black">
                      &#8377; 2109/-
                    </option>
                  </select>
                </div>
                <div className="flex gap-2 items-end">
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
            ""
          ) : (
            <div className="border p-5 px-10 mt-6 rounded-lg text-start">
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
                <div className="grid grid-cols-2 gap-2">
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
                    value={courseDetails.category}
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
                        />
                        <label
                          className="button bg-white text-black px-3 py-1 hover:cursor-pointer"
                          htmlFor="upload"
                        >
                          Upload File
                        </label>
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
            </div>
          )}
        </div>
      ) : (
        <div className="border px-5 py-2">
          <div className="flex justify-between px-5">
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
                      dispatch(getCourses(search));
                      setSearch("");
                    }}
                    className="h-[100%] flex items-end bg-white text-black px-2 py-1 font-medium hover:bg-slate-400 transition duration-300"
                  >
                    Search
                  </button>
                </div>
                <div>
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
                </div>
              </div>
            </div>
            <div className="flex items-start">
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
              <div className="bg-purple-900/30 rounded flex justify-between px-5 mb-2">
                <div className="text-start flex items-center gap-2">
                  <div className="bg-slate-950 rounded-t-lg ">
                    <div className="px-2 text-center">
                      <p
                        className={`${
                          course.isApproved
                            ? "text-green-500"
                            : course.isBlock
                            ? "text-blue-800"
                            : "text-red-600"
                        } font-medium text-xs`}
                      >
                        {course.isApproved
                          ? "APPROVED"
                          : course.isBlock
                          ? "BLOCKED"
                          : "PENDING"}
                      </p>
                    </div>
                    <img
                      src={course.cover}
                      alt=""
                      className="h-[6rem] w-[10rem]"
                    />
                  </div>
                  <div className="">
                    <div className="pb-2">
                      <p className="text-xl font-medium">{course.title}</p>
                      <p className="text-sm">{course.description}</p>
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
                  <p className="font-semibold text-lg text-purple-600">
                    &#8377; {course.price}/-
                  </p>
                  {course.offer ? (
                    <p className="italic text-sm">{course.offer}% off</p>
                  ) : (
                    ""
                  )}
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
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default InstructorCourse;
