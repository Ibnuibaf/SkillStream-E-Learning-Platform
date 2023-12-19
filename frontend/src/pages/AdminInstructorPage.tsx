import React from 'react'
import InsturctorsTable from '../components/InsturctorsTable'
import AdminSideBar from '../components/AdminSideBar'

function AdminInstructorPage() {
  return (
    <div className="min-h-screen flex flex-row ">
      <div>
        <AdminSideBar/>
      </div>
      <div className='w-full max-h-screen overflow-auto'>
        <InsturctorsTable/>
      </div>
    </div>
  )
}

export default AdminInstructorPage