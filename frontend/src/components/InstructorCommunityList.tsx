/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { getCourses } from "../redux/actions/coursesActions";
import { selectcourses } from "../redux/slices/coursesSlice";
import { useNavigate } from "react-router-dom";


function InstructorCommunityList() {
    const dispatch:AppDispatch=useDispatch()
    const navigate=useNavigate()
    const courses=useSelector(selectcourses).courses
    const [communities,setCommunities]=useState<any>([])
    const getCommunities=async()=>{
        try {
            await dispatch(getCourses({search:"",isInstructor:true}))
            if(courses.length){
                setCommunities(courses)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getCommunities()
    },[])
  return (
    <div className="p-10 h-[95vh] ">
      <div className="px-10">
        <div className="text-2xl font-semibold my-3">
          <p>My Communites</p>
        </div>
        <div className="max-h-[60vh] overflow-y-auto overflow-x-hidden ">
          {communities?.map((comm:any) => (
            <div
              className="flex items-center gap-4 bg-purple-900/60 rounded-3xl mb-2 py-2 px-8  text-start hover:cursor-pointer hover:bg-purple-900/80 cursor-pointer"
              onClick={() => navigate(`/community?courseid=${comm._id}`)}
            >
              <div className="h-12 w-12 rounded-full">
                <img
                  src={comm.cover}
                  alt=""
                  className="h-full w-full rounded-full"
                />
              </div>
              <p className="text-xl">{comm.title}</p>
            </div>
          ))} 
        </div>
      </div>
    </div>
  );
}

export default InstructorCommunityList;
