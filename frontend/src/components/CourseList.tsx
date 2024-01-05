import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../redux/slices/categorySlice";
import { selectcourses } from "../redux/slices/coursesSlice";
import { getCourses } from "../redux/actions/coursesActions";
import { getCategories } from "../redux/actions/categoriesActions";
import { AppDispatch } from "../redux/store";
import { IoMdStar, IoIosPlayCircle } from "react-icons/io";
// import { MdSearch } from "react-icons/md";
import api from "../axios/api";
import { toast } from "react-toastify";
import { selectUser } from "../redux/slices/authSlice";
import { MdSearch } from "react-icons/md";
import axios from "axios";
import ReactPlayer from "react-player";
import { FaRegCirclePlay } from "react-icons/fa6";
import swal from "sweetalert";

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
interface IReviews {
  user: { name: string; _id: string };
  rating: number;
  feedback: string;
}
interface ILesson {
  title: string;
  content: string;
  duration: number | string;
}

interface ICourse {
  _id: string;
  title: string;
  description: string;
  language: string;
  level: string;
  category: { name: string; _id: string } | string;
  preview?: string;
  cover: string;
  lessons: ILesson[];
  mcq: IMCQ[];
  instructor: { name: string; _id: string } | string;
  announcements: string[];
  coupons: ICoupon[];
  price: number;
  reviews?: IReviews[];
  offer: number;
  isApproved?: boolean;
  isBlock?: boolean;
}

function CourseList() {
  const token = localStorage.getItem("SkillStreamToken");
  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector(selectCategories).categories;
  const user = useSelector(selectUser).user;
  let courses = useSelector(selectcourses).courses;
  const [selectedCategory, setSelectedCategory] = useState({
    id: "",
    name: "",
  });
  const [courseDetails, setCourseDetails] = useState<ICourse>({
    _id: "",
    title: "",
    description: "",
    language: "",
    level: "",
    category: "",
    cover: "",
    lessons: [],
    mcq: [],
    instructor: "",
    announcements: [],
    coupons: [],
    price: 0,
    offer: 0,
  });
  const [selectedCourse, setSelectedCourse] = useState("");
  const [search, setSearch] = useState("");
  const [review, setReview] = useState({
    user: "",
    rating: "",
    feedback: "",
  });
  const submitReview = async () => {
    if (token) {
      if (user?._id) {
        await setReview({ ...review, user: user?._id });
      }
      const isExist = courseDetails.reviews?.find(
        (revi) => (revi.user._id as string) == user?._id
      );
      if (isExist) {
        setReview({
          user: "",
          rating: "",
          feedback: "",
        });
        return toast("Already updated feedback");
      }
      const isPurchased = user?.learnings.find(
        (learn) => learn.course == courseDetails._id
      );
      if (!isPurchased) {
        setReview({
          user: "",
          rating: "",
          feedback: "",
        });
        return toast("purchase course first to review course");
      }

      if (!review.feedback || !review.rating || !review.user) {
        return toast("Enter necessary Details");
      }
      swal("Are your sure to update review ?", {
        buttons: ["Cancel", true],
      }).then(async (confirm) => {
        if (confirm) {
          try {
            await api.patch("/course/review", {
              user: review.user,
              feedback: review.feedback,
              rating: review.rating,
              courseId: courseDetails._id,
            });
            toast("Review submitted, updated after a while.");
          } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
              toast(error?.response?.data?.message);
            } else {
              toast("An unexpected error occurred");
            }
          }
        }
      });
    } else {
      toast("Login to your account to review on course");
    }
    setReview({
      user: "",
      rating: "",
      feedback: "",
    });
  };
  const makePayment = async () => {
    if (token) {
      const isExist = user?.learnings.find(
        (learn: { course: string; progress: string[] }) =>
          learn.course == courseDetails._id
      );
      if (!isExist) {
        try {
          //   const stripe = await loadStripe(
          //     "pk_test_51OPOXKSEJEe9TfyNNyag37yMF9bIEKeA4GFHqqwArgo7rYKFRMDYYNtg34XPUTqfL7ICfxkGbC7EzA5vtkxqApHj00TZwZYdyU"
          //   );
          const res = await api.post("/order/checkout-session", {
            course: courseDetails,
            userId: user?._id,
          });

          if (res.data.url) {
            window.location.href = res.data.url;
          }
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            toast(error?.response?.data?.message);
          } else {
            toast("An unexpected error occurred");
          }
        }
      } else {
        toast("Already purchased, Check your Learnings");
      }
    } else {
      toast("Login to purchase course");
    }
  };
  const searchCourse = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (search.length > 3) {
      dispatch(getCourses({ search, isInstructor: false }));
    }
  };
  useEffect(() => {
    dispatch(getCategories(""));
    dispatch(getCourses({ search: "", isInstructor: false }));
  }, [dispatch]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    courses = courses.filter(
      (course) => course.category == selectedCategory.id
    );
  }, [selectCategories]);
  useEffect(() => {
    console.log(review);
  }, [review]);
  return (
    <div>
      <div className=" flex  bordre-2 bg-slate-900 justify-between text-md overflow-x-auto font-medium">
        <button
          className="border min-w-[15vw] w-full py-2 "
          onClick={() => {
            setSelectedCategory({ id: "", name: "" });
            setSelectedCourse("");
          }}
        >
          All Category
        </button>
        {categories.map((cat) => (
          <button
            className="border min-w-[15vw] w-full py-2 "
            onClick={() => {
              setSelectedCategory({ id: cat._id, name: cat.name });
              setSelectedCourse("");
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>
      {selectedCourse ? (
        <div className="mb-10">
          <div className="text-start mt-3 mx-6">
            <button
              className="border rounded-md px-6 py-1 hover:bg-slate-500 transition duration-300"
              onClick={() => setSelectedCourse("")}
            >
              Back
            </button>
          </div>
          <div className="flex px-10 mt-6 justify-center items-center gap-10">
            <div className="w-[50vw] h-[60vh]  rounded-3xl">
              <ReactPlayer
                url={courseDetails.preview}
                controls
                light={courseDetails.cover}
                // playing={false}
                width={"100%"}
                height={"100%"}
                playIcon={
                  <FaRegCirclePlay size={84} className="text-gray-300" />
                }
              />
            </div>
            <div className="flex justify-center px-10 text-start">
              <div className="h-max border-2 p-6 w-[30vw]">
                <p className="text-2xl font-bold line-clamp-2">
                  {courseDetails.title}
                </p>
                <div className=" px-2 py-1">
                  <p className="text-sm  font-medium">
                    Course By:{" "}
                    <b className="text-lg">
                      {(courseDetails.instructor as { name: string }).name}
                    </b>
                  </p>
                  <p className="text-sm text-gray-300 font-semibold">
                    Course Level:{" "}
                    {courseDetails.level == "1"
                      ? "Beginner"
                      : courseDetails.level == "2"
                      ? "Intermediate"
                      : "Advanced"}
                  </p>
                  <div className="flex items-center gap-2">
                    <p>Rating:</p>{" "}
                    <div className="text-orange-500 flex gap-0.5 ">
                      <IoMdStar size={18} />
                      <IoMdStar size={18} />
                      <IoMdStar size={18} />
                      <IoMdStar size={18} />
                      <IoMdStar size={18} />
                    </div>
                  </div>
                </div>
                <div className="px-2 py-1 border my-5">
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-medium">Price: </p>
                    <b className="text-2xl">&#8377; {courseDetails.price} /-</b>
                  </div>
                  {courseDetails.offer ? (
                    <div className="flex items-center justify-between ">
                      <p className=" ">Offer: </p>
                      <p className="text-xl font-medium text-pink-600">
                        {courseDetails.offer}% Off
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex gap-3 items-center justify-between">
                  <div className="flex gap-3">
                    <button className="border-2 border-pink-500 text-pink-500 px-4 py-1 text-lg hover:bg-pink-500 hover:text-white transition duration-300">
                      Add to Wishlist
                    </button>
                    <button
                      onClick={() => makePayment()}
                      className="border-2 border-purple-500 text-purple-500 px-4 py-1 text-lg hover:bg-purple-500 hover:text-white transition duration-300"
                    >
                      Buy Now
                    </button>
                  </div>
                  <div className="w-20  mt-2">
                    <img src="/stripe.png" alt="" className="w-full h-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-28 mt-10 text-start">
            <div className="my-3 flex justify-center ">
              <div className="border w-[50%] px-5 py-2">
                <p className="text-xl font-bold">
                  What you will learn in this Course
                </p>
                <p className="font-semibold">
                  Course By{" "}
                  {(courseDetails.instructor as { name: string }).name}
                </p>
                <p className=" mt-2 px-5">{courseDetails.description}</p>
              </div>
            </div>
            <div className="mt-3 border-2 px-6 py-2">
              <p className="text-2xl font-medium">Course Content</p>
              <div className="my-2 max-h-[50vh] overflow-y-auto overflow-x-hidden">
                {courseDetails.lessons.map((lesson, index) => (
                  <p className="border px-10 py-2 text-lg">
                    {`${index + 1}. `}
                    {lesson.title.toUpperCase()}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-5 ">
              <div>
                <div className="flex w-full border justify-between ">
                  <div className="flex w-full">
                    <input
                      type="text"
                      name=""
                      id=""
                      value={review.feedback}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setReview({ ...review, feedback: e.target.value })
                      }
                      className="bg-transparent py-2 px-4 w-full outline-none"
                      placeholder="Enter your feedback about this course.."
                    />
                    <div className="flex items-center px-2 gap-1">
                      <p>
                        <IoMdStar size={28} className="text-orange-500" />
                      </p>
                      <select
                        name=""
                        id=""
                        value={review.rating}
                        className="text-black px-4"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          setReview({ ...review, rating: e.target.value })
                        }
                      >
                        <option value="1">1 </option>
                        <option value="2">2 </option>
                        <option value="3">3 </option>
                        <option value="4">4 </option>
                        <option value="5">5 </option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={submitReview}
                    className="bg-purple-700 px-4 hover:bg-purple-700/80"
                  >
                    Review
                  </button>
                </div>
                <p className="text-gray-300 text-xs">
                  Update your review about this course
                </p>
              </div>
              <p className="text-xl font-medium">Reviews</p>
              <div className="flex min-h-[18vh] w-full overflow-x-auto gap-2">
                {courseDetails.reviews?.map((review) => (
                  <div className="bg-purple-900/30 rounded-2xl px-5 py-2 w-[20vw]">
                    <div className="flex justify-between">
                      <p className="font-semibold">
                        By{" "}
                        {typeof review.user == "object"
                          ? review.user?.name
                          : review.user}
                      </p>
                      <div className="flex items-center text-orange-500">
                        {review.rating == 1 ? (
                          <IoMdStar size={18} />
                        ) : review.rating == 2 ? (
                          <>
                            <IoMdStar size={18} />
                            <IoMdStar size={18} />
                          </>
                        ) : review.rating == 3 ? (
                          <>
                            <IoMdStar size={18} />
                            <IoMdStar size={18} />
                            <IoMdStar size={18} />
                          </>
                        ) : review.rating == 4 ? (
                          <>
                            <IoMdStar size={18} />
                            <IoMdStar size={18} />
                            <IoMdStar size={18} />
                            <IoMdStar size={18} />
                          </>
                        ) : review.rating == 5 ? (
                          <>
                            <IoMdStar size={18} />
                            <IoMdStar size={18} />
                            <IoMdStar size={18} />
                            <IoMdStar size={18} />
                            <IoMdStar size={18} />
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <p className="text-gray-300 ">{review.feedback}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-20">
          <div className="flex justify-between py-5">
            <p className="text-2xl font-semibold">
              {selectedCategory.id
                ? `${selectedCategory?.name.toUpperCase()}`
                : "All Categories"}
            </p>
            <div className="border w-[50vw] h-min pt-1 pb-1 px-4 flex justify-between">
              <input
                type="text"
                value={search}
                className="bg-transparent w-full outline-none"
                placeholder="Search your intreseted courses.."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  searchCourse(e)
                }
              />
              <button
                onClick={() => {
                  dispatch(getCourses({ search, isInstructor: false }));
                }}
              >
                <MdSearch size={24} />
              </button>
            </div>
            <div>{/* <button>Filter</button> */}</div>
          </div>
          <div className="grid mt-5 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-7">
            {selectedCategory.id
              ? courses.map((course) =>
                  (typeof courseDetails.category === "object"
                    ? courseDetails.category._id
                    : courseDetails.category) == selectedCategory.id &&
                  !course.isBlock &&
                  course.isApproved ? (
                    <div
                      className="text-start rounded-3xl bg-white text-black hover:cursor-pointer"
                      onClick={() => {
                        setSelectedCourse(course._id);
                        setCourseDetails(course);
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
                              {course.lessons.length}x Lesson
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
                      <div className="flex items-center justify-between border-t my-2 px-3 ">
                        <div>
                          <img src="" alt="" />
                          <div className="space-y-[-4px]">
                            <p className="text-lg">
                              {typeof courseDetails.instructor == "object"
                                ? courseDetails.instructor.name
                                : courseDetails.instructor}
                            </p>
                            <p className="text-xs italic">English Teacher</p>
                          </div>
                        </div>
                        <div>
                          <p
                            className={`${
                              Math.random() >= 0.5
                                ? "bg-blue-500"
                                : "bg-pink-500"
                            } px-2 rounded-full text-white text-xs py-1 font-medium`}
                          >
                            {typeof courseDetails.category === "object"
                              ? courseDetails.category.name
                              : courseDetails.category}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )
                )
              : courses.map((course) =>
                  !course.isBlock && course.isApproved ? (
                    <div
                      className="text-start rounded-3xl bg-white text-black hover:cursor-pointer"
                      onClick={() => {
                        setSelectedCourse(course._id);
                        setCourseDetails(course);
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
                              {course.lessons.length}x Lesson
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
                      <div className="flex items-center justify-between border-t my-2 px-3 ">
                        <div>
                          <img src="" alt="" />
                          <div className="space-y-[-4px]">
                            <p className="text-lg">
                              {typeof courseDetails.instructor == "object"
                                ? courseDetails.instructor.name
                                : courseDetails.instructor}
                            </p>

                            <p className="text-xs italic">English Teacher</p>
                          </div>
                        </div>
                        <div>
                          <p
                            className={`${
                              Math.random() >= 0.5
                                ? "bg-blue-500"
                                : "bg-pink-500"
                            } px-2 rounded-full text-white text-xs py-1 font-medium`}
                          >
                            {typeof courseDetails.category === "object"
                              ? courseDetails.category.name
                              : courseDetails.category}
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
      )}
    </div>
  );
}

export default CourseList;
