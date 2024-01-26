// import React from 'react'
import { useEffect } from "react";
import CommunityChat from "../components/Chat&Community/CommunityChat";
import { useNavigate } from "react-router-dom";
import BasicHeader from "../components/Headers/BasicHeader";

function CommunityPage() {
  const token = localStorage.getItem("SkillStreamToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);
  return (
    <div className="h-screen overflow-hidden">
      <div className="">
        <BasicHeader />
      </div>
      <div >
        <CommunityChat />
      </div>
    </div>
  );
}

export default CommunityPage;
