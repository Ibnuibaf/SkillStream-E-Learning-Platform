import React from "react";
import InstructorCourse from "../components/InstructorCourse";
import InstructorSideBar from "../components/InstructorSideBar";
import InstructorCourseDetail from "../components/InstructorCourseDetail";

function InstructorCoursePage() {
  return (
    <div className="min-h-screen flex flex-row">
      <InstructorSideBar />
      <div className="w-full p-10">
        {/* <InstructorCourse /> */}
        <InstructorCourseDetail/>
      </div>
    </div>
  );
}

export default InstructorCoursePage;
