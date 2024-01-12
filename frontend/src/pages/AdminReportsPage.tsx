// import React from 'react'
import AdminSideBar from '../components/AdminSideBar'
import Footer from '../components/Footer'
import ReportTab from '../components/ReportTab'

function AdminReportsPage() {
  return (
    <div className="min-h-screen flex flex-row ">
      <div>
        <AdminSideBar />
      </div>
      <div className="w-full ">
        <ReportTab />
        <Footer />
      </div>
    </div>
  )
}

export default AdminReportsPage