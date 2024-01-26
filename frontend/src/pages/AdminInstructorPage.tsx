// import React from 'react'
import InsturctorsTable from '../components/Tables/InsturctorsTable'
import AdminSideBar from '../components/Sidebar/AdminSideBar'
import Footer from '../components/Footer/Footer'

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