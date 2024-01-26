// import React from 'react'
import { useSelector } from "react-redux";
import InstructorDashboard from "../components/Dashboard/InstructorDashboard";
import InstructorSideBar from "../components/Sidebar/InstructorSideBar";
import { selectUser } from "../redux/slices/authSlice";
import Footer from "../components/Footer/Footer";

function InstructorHomePage() {
  const user = useSelector(selectUser).user;

  return (
    <div className={`${user?.verified && "min-h-screen flex flex-row"}`}>
      <InstructorSideBar />
      {user?.verified && (
        <div className="w-full ">
          <InstructorDashboard />
          <Footer/>
        </div>
      )}
    </div>
  );
}

export default InstructorHomePage;
