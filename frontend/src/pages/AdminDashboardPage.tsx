// import React from 'react'
import AdminDashboard from "../components/AdminDashboard";
import AdminSideBar from "../components/AdminSideBar";
import Footer from "../components/Footer";

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
