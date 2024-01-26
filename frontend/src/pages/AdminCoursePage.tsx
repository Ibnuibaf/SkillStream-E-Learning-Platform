// import React from 'react'
import AdminSideBar from "../components/Sidebar/AdminSideBar";
import AdminCourse from "../components/Lists/AdminCourse";
import Footer from "../components/Footer/Footer";

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
