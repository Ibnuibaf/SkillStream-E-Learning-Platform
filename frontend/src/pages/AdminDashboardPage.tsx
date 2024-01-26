// import React from 'react'
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import AdminSideBar from "../components/Sidebar/AdminSideBar";
import Footer from "../components/Footer/Footer";

function AdminDashboardPage() {
  return (
    <div className="min-h-screen flex flex-row ">
      <div>
        <AdminSideBar />
      </div>
      <div className=" ">
        <AdminDashboard />
        <Footer />
      </div>
    </div>
  );
}

export default AdminDashboardPage;
