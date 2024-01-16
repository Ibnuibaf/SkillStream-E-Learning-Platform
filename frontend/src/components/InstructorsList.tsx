/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../axios/api";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";
// import { loadStripe } from "@stripe/stripe-js";
interface Instructor {
  name: string;
  _id?: string;
  avatar: string;
}
interface IChat {
  user: string;
  message: string;
  image: string;
}

interface IPersonalChat {
  student: string;
  instructor: string;
  chats: IChat[];
  validity: Date;
}
function InstructorsList() {
  const navigate = useNavigate();

  const user = useSelector(selectUser).user;
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [personalChats, setPersonalChats] = useState<IPersonalChat[]>([]);

  const token = localStorage.getItem("SkillStreamToken");
  const makePayment = async (instructor: string) => {
    if (token) {
      try {
        //   const stripe = await loadStripe(
        //     "pk_test_51OPOXKSEJEe9TfyNNyag37yMF9bIEKeA4GFHqqwArgo7rYKFRMDYYNtg34XPUTqfL7ICfxkGbC7EzA5vtkxqApHj00TZwZYdyU"
        //   );
        const res = await api.post("/user/subscribe-session", {
          instructor: instructor,
          student: user?._id,
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
      toast("Login to purchase course");
    }
  };
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
  const getPersonalChats = async () => {
    try {
      const res = await api.get("/personal");
      setPersonalChats(res.data.personalchats);
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
    getPersonalChats();
  }, []);
  return (
    <div className="lg:px-10 px-3">
      <div className="text-lg md:text-xl lg:text-2xl font-semibold my-3">
        <p>My Instructors</p>
      </div>
      <div className=" max-h-[60vh] overflow-y-auto overflow-x-hidden grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 lg:gap-4 gap-2">
        {instructors?.map(
          (instructor) =>
            instructor._id != user?._id &&
            (personalChats.find((chat) => chat.instructor == instructor._id) ? (
              <div
                className="flex flex-col items-center justify-between gap-2 bg-purple-500 rounded-3xl mb-2 px-4 lg:py-5 py-2   text-start "
                // onClick={() =>
                //   navigate(`/personal/chat?instructor=${instructor._id}`)
                // }
              >
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
                {personalChats.some(
                  (chat) =>
                    chat.instructor === instructor._id &&
                    new Date(chat.validity) < new Date()
                )}
                <div className="flex flex-col w-full">
                  <div className="font-medium text-lg">
                    <p className="text-sm text-start ">Validity upto </p>
                    <p className="text-center">
                      {new Date(
                        personalChats.find(
                          (chat) => chat.instructor == instructor._id
                        )?.validity as Date
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  {personalChats.some(
                    (chat) =>
                      chat.instructor === instructor._id &&
                      new Date(chat.validity) < new Date()
                  ) ? (
                    <button
                      type="button"
                      onClick={() => makePayment(instructor._id as string)}
                      className="bg-white text-purple-500 px-4 py-1 rounded-3xl hover:bg-purple-800 hover:text-white cursor-pointer"
                    >
                      Renew
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/personal/chat?instructor=${instructor._id}`)
                      }
                      disabled={personalChats.some(
                        (chat) =>
                          chat.instructor === instructor._id &&
                          new Date(chat.validity) < new Date()
                      )}
                      className="bg-white text-purple-500 px-4 py-1 rounded-3xl hover:bg-purple-800 hover:text-white cursor-pointer"
                    >
                      Chat
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div
                className="flex flex-col items-center justify-between gap-2 bg-purple-500 rounded-3xl mb-2 px-4 lg:py-5 py-2 text-start "
                // onClick={() =>
                //   navigate(`/personal/chat?instructor=${instructor._id}`)
                // }
              >
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
                    onClick={() => makePayment(instructor._id as string)}
                    className="bg-white text-purple-500 px-4 py-1 rounded-3xl hover:bg-purple-800 hover:text-white cursor-pointer"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default InstructorsList;
