// import React from 'react'
import { useNavigate } from "react-router-dom";
import BasicHeader from "../components/BasicHeader";
import { useEffect } from "react";
import { toast } from "react-toastify";
import ProfileTab from "../components/ProfileTab";
import Footer from "../components/Footer";

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
      <div className="min-h-screen  px-10 py-4">
        <BasicHeader />
        <ProfileTab />
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
