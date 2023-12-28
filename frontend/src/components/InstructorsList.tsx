/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../axios/api";
// import { useSelector } from "react-redux";
// import { selectUser } from "../redux/slices/authSlice";
// import { loadStripe } from "@stripe/stripe-js";
interface Instructor {
  name: string;
  _id?: string;
  avatar: string;
}

function InstructorsList() {
  //   const navigate = useNavigate();
//   const user = useSelector(selectUser).user;
  const [instructors, setInstructors] = useState<Instructor[]>([]);
//   const token = localStorage.getItem("SkillStreamToken");
//   const makePayment = async (instructor: any) => {
    // if (token) {
    //   try {
    //     //   const stripe = await loadStripe(
    //     //     "pk_test_51OPOXKSEJEe9TfyNNyag37yMF9bIEKeA4GFHqqwArgo7rYKFRMDYYNtg34XPUTqfL7ICfxkGbC7EzA5vtkxqApHj00TZwZYdyU"
    //     //   );
    //     const res = await api.post("/user/payment", {
    //       instructor: instructor._id,
    //       user: user?._id,
    //     });

    //     const stripe = await loadStripe(
    //       "pk_test_51OPOXKSEJEe9TfyNNyag37yMF9bIEKeA4GFHqqwArgo7rYKFRMDYYNtg34XPUTqfL7ICfxkGbC7EzA5vtkxqApHj00TZwZYdyU"
    //     );
    //     const Element = stripe?.elements({
    //       clientSecret: res.data.clientSecret,
    //     });
    //     const payElement = Element?.create("payment", {
    //       layout: "tabs",
    //     });
    //     payElement?.mount(Element);
    //   } catch (error: unknown) {
    //     if (axios.isAxiosError(error)) {
    //       toast(error?.response?.data?.message);
    //     } else {
    //       toast("An unexpected error occurred");
    //     }
    //   }
    // } else {
    //   toast("Login to purchase course");
    // }
//   };
  const getInstructors = async () => {
    try {
      const res = await api.get("/user/instructors");
      setInstructors(res.data.instructors);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error?.response?.data?.message);
      } else {
        toast("An unexpected error occurred");
      }
    }
  };
  useEffect(() => {
    getInstructors();
  }, []);
  return (
    <div className="px-10">
      <div className="text-2xl font-semibold my-3">
        <p>My Instructors</p>
      </div>
      <div className=" max-h-[60vh] overflow-y-auto overflow-x-hidden grid grid-cols-7 gap-4">
        {instructors?.map((instructor) => (
          <div className="flex flex-col items-center justify-between gap-4 bg-purple-500 rounded-3xl mb-2 px-4 py-5 h-[32vh]  text-start ">
            <div className="flex flex-col  items-center">
              <div className="h-16 w-16 rounded-full">
                <img
                  src={instructor.avatar}
                  alt=""
                  className="h-full w-full rounded-full"
                />
              </div>
              <p className="text-xl mt-5">{instructor.name}</p>
            </div>
            <div className="flex flex-col w-full">
              <div className="font-medium text-lg">
                <p className="text-sm text-start ">Subscribe for </p>
                <p className="text-center">&#8377; 130/month</p>
              </div>
              <button
                type="button"
                // onClick={() => makePayment(instructor)}
                className="bg-white text-purple-500 px-4 py-1 rounded-3xl hover:bg-purple-800 hover:text-white cursor-pointer"
              >
                Subscribe
              </button>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default InstructorsList;
