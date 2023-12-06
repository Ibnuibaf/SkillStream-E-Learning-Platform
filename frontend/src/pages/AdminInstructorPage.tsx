import React from 'react'
import InsturctorsTable from '../components/InsturctorsTable'
import AdminSideBar from '../components/AdminSideBar'

function AdminInstructorPage() {
  return (
    <div className="min-h-screen flex flex-row ">
        <AdminSideBar/>
        <InsturctorsTable/>
    </div>
  )
}

export default AdminInstructorPage