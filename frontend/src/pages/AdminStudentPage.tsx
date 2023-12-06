import React from 'react'
import StudentsTable from '../components/StudentsTable'
import AdminSideBar from '../components/AdminSideBar'

function AdminStudentPage() {
  return (
    <div className="min-h-screen flex flex-row ">
        <AdminSideBar/>
        <StudentsTable/>
    </div>
  )
}

export default AdminStudentPage