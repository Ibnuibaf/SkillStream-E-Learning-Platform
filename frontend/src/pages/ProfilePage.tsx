// import React from 'react'
import { useNavigate } from "react-router-dom";
import BasicHeader from "../components/Headers/BasicHeader";
import { useEffect } from "react";
import { toast } from "react-toastify";
import ProfileTab from "../components/Profile/ProfileTab";
import Footer from "../components/Footer/Footer";

function ProfilePage() {
  const token = localStorage.getItem("SkillStreamToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      toast("Logging to access");
      navigate("/login");
    }
  }, [token]);
  return (
    <div className="">
      <div className="min-h-screen  ">
        <BasicHeader />
        <ProfileTab />
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
