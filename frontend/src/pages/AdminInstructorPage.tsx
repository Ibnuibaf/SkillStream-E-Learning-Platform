// import React from 'react'
import InsturctorsTable from '../components/InsturctorsTable'
import AdminSideBar from '../components/AdminSideBar'
import Footer from '../components/Footer'

function AdminInstructorPage() {
  return (
    <div className="min-h-screen flex flex-row ">
      <div>
        <AdminSideBar/>
      </div>
      <div className='w-full '>
        <InsturctorsTable/>
        <Footer/>
      </div>
    </div>
  )
}

export default AdminInstructorPage