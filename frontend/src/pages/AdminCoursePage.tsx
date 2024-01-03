// import React from 'react'
import AdminSideBar from "../components/AdminSideBar";
import AdminCourse from "../components/AdminCourse";
import Footer from "../components/Footer";

function AdminCoursePage() {
  return (
    <div className="min-h-screen flex flex-row">
      <div>
        <AdminSideBar />
      </div>
      <div className="w-full  ">
        <AdminCourse />
        <Footer />
      </div>
    </div>
  );
}

export default AdminCoursePage;
