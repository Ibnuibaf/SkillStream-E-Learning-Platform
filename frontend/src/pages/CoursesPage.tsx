// import React from 'react'
import BasicHeader from "../components/BasicHeader";
import CourseList from "../components/CourseList";
import Footer from "../components/Footer";

function CoursesPage() {
  return (
    <div className="">
      <div className="">
        <BasicHeader />
      </div>
      <div className="min-h-[85vh]">
        <CourseList />
      </div>
      <Footer/>
    </div>
  );
}

export default CoursesPage;
