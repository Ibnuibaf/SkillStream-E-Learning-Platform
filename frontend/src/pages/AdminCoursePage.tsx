import React from 'react'
import AdminSideBar from '../components/AdminSideBar'
import AdminCourse from '../components/AdminCourse'

function AdminCoursePage() {
  return (
    <div className="min-h-screen flex flex-row">
        <AdminSideBar />
      <div className="w-full max-h-screen overflow-auto p-10 ">
        <AdminCourse />
      </div>
    </div>
  )
}

export default AdminCoursePage