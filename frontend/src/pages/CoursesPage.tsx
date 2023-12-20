// import React from 'react'
import BasicHeader from "../components/BasicHeader";
import CourseList from "../components/CourseList";

function CoursesPage() {
  return (
    <div className="">
      <div className="px-10 py-4">
        <BasicHeader />
      </div>
      <div>
        <CourseList />
      </div>
    </div>
  );
}

export default CoursesPage;
