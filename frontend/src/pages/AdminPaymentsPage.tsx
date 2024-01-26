// import React from "react";
import AdminPaymentTab from "../components/Tables/AdminPaymentTab";
import Footer from "../components/Footer/Footer";
import AdminSideBar from "../components/Sidebar/AdminSideBar";

function AdminPaymentsPage() {
  return (
    <div className="min-h-screen flex flex-row ">
      <div>
        <AdminSideBar />
      </div>
      <div className="w-full ">
        <AdminPaymentTab />
        <Footer />
      </div>
    </div>
  );
}

export default AdminPaymentsPage;
