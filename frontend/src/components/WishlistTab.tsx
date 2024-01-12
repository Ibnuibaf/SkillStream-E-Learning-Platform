/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useEffect, useState } from "react";
import api from "../axios/api";
import { toast } from "react-toastify";
import { IoIosPlayCircle, IoMdStar } from "react-icons/io";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";
import axios from "axios";
import swal from "sweetalert";
import { LuHeart } from "react-icons/lu";

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
  user: string;
  rating: number;
  feedback: string;
}
interface ICourse {
  _id: string;
  title: string;
  description: string;
  language: string;
  level: string;
  category: string;
  instructor: string;
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
function WishlistTab() {
  const [wishlist, setWishlist] = useState<ICourse[]>();
  const token = localStorage.getItem("SkillStreamToken");
  const user = useSelector(selectUser).user;
  const getWishlist = async () => {
    try {
      const res = await api.get("/user/wishlist");
      setWishlist(res.data.wishlist);
    } catch (error: any) {
      toast(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    getWishlist();
  }, []);
  const removeFromWishlist = async (course: string) => {
    try {
      const confirmed = await swal("Are you sure to remove from wishlist?", {
        buttons: ["Cancel", true],
      });
      if (confirmed) {
        await api.patch("/user/wishlist/remove", { course });
        await getWishlist();
      }
    } catch (error: any) {
      toast(error?.response?.data?.message);
    }
  };
  const makePayment = async (course:ICourse) => {
    if (token) {
      const isExist = user?.learnings.find(
        (learn: { course: string; progress: string[] }) => learn.course == course._id
      );
      if (!isExist) {
        try {
          //   const stripe = await loadStripe(
          //     "pk_test_51OPOXKSEJEe9TfyNNyag37yMF9bIEKeA4GFHqqwArgo7rYKFRMDYYNtg34XPUTqfL7ICfxkGbC7EzA5vtkxqApHj00TZwZYdyU"
          //   );
          const res = await api.post("/order/checkout-session", {
            course: course,
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
  return (
    <div className="py-5">
      <div className="flex justify-center">
        <p className="border rounded-full text-2xl px-20 bg-pink-700 shadow-md shadow-pink-500 flex items-center gap-2 py-0.5"><LuHeart size={28}></LuHeart> My Wishlist</p>
      </div>
      <div className="grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-7 mt-16">
        {wishlist?.map((course) => (
          <div className="text-start rounded-3xl bg-white text-black hover:cursor-pointer">
            <div className="h-[25vh] rounded-t-3xl">
              <img
                src={course.cover}
                alt=""
                className="h-full w-full rounded-t-3xl"
              />
            </div>
            <div className="px-4 py-1">
              <div className="flex justify-between items-start gap-1 ">
                <div className="truncate">
                  <div className="flex items-start gap-1 text-sm">
                    <IoIosPlayCircle
                      size={16}
                      color={Math.random() >= 0.5 ? "red" : "blue"}
                    />
                    <p className="text-xs font-medium">
                      {course.lessons ? course.lessons.length : ""}x Lesson
                    </p>
                  </div>

                  <div className="min-h-[8vh] pt-1 truncate">
                    <p className="text-xs text-gray-600 ">
                      {course.level == "2"
                        ? "Intermediate"
                        : course.level == "3"
                        ? "Advanced"
                        : "Beginner"}
                    </p>
                    <p className="line-clamp-2  font-bold font-serif truncate">
                      {course.title}
                    </p>
                  </div>
                  <p className="text-xs line-clamp-1  text-gray-600">
                    {course.description}
                  </p>
                </div>
                <div className="text-end">
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
                  <div className="p-1">
                    <p className="text-purple-900 font-semibold text-xl">
                      &#8377;{course.price}/-
                    </p>
                    <p className="text-sm italic">
                      Off{" "}
                      <span className="font-bold text-pink-700">
                        {course.offer}%
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1 items-center justify-between px-4 py-2">
              <button
                className="border-2 border-pink-500 text-pink-500 px-4 py-1  hover:bg-pink-500 hover:text-white transition duration-300"
                onClick={() => removeFromWishlist(course._id)}
              >
                Remove
              </button>
              <button
                onClick={() => makePayment(course)}
                className="border-2 border-purple-500 text-purple-500 px-4 py-1  hover:bg-purple-500 hover:text-white transition duration-300"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishlistTab;
