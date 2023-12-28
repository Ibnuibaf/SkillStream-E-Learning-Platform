/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../axios/api";
interface Instructor {
  name: string;
  _id?: string;
  avatar:string
}

function InstructorsList() {
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  const getInstructors =async () => {
    try {
        const res=await api.get('/user/instructors')
        setInstructors(res.data.instructors) 
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
      <div className="max-h-[60vh] overflow-y-auto overflow-x-hidden grid grid-cols-7">
        {instructors?.map((instructor) => (
          <div
            className="flex flex-col items-center justify-between gap-4 bg-purple-500 rounded-3xl mb-2 px-4 py-5 h-[30vh]  text-start "
            onClick={() => navigate(`/community?courseid=${"comm.course._id"}`)}
          >
            <div className="flex flex-col  items-center">
              <div className="h-12 w-12 rounded-full">
                <img
                  src={
                    instructor.avatar
                  }
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
              <button className="bg-white text-purple-500 px-4 py-1 rounded-3xl hover:bg-purple-800 hover:text-white cursor-pointer">
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
