import React from "react";
import StudentsTable from "../components/StudentsTable";
import AdminSideBar from "../components/AdminSideBar";

function AdminStudentPage() {
  return (
    <div className="min-h-screen flex flex-row ">
      <div className="">
        <AdminSideBar />
      </div>
      <div className="w-full ">
        <StudentsTable />
      </div>
    </div>
  );
}

export default AdminStudentPage;
