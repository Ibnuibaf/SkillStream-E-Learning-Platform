// import React from "react";
import StudentsTable from "../components/Tables/StudentsTable";
import AdminSideBar from "../components/Sidebar/AdminSideBar";
import Footer from "../components/Footer/Footer";

function AdminStudentPage() {
  return (
    <div className="min-h-screen flex flex-row ">
      <div className="">
        <AdminSideBar />
      </div>
      <div className="w-full ">
        <StudentsTable />
        <Footer/>
      </div>
    </div>
  );
}

export default AdminStudentPage;
