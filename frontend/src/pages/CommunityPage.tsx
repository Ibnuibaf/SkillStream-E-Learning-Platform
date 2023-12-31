// import React from 'react'
import { useEffect } from "react";
import CommunityChat from "../components/CommunityChat";
import { useNavigate } from "react-router-dom";
import BasicHeader from "../components/BasicHeader";

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
      <div className="px-10 py-4">
        <BasicHeader />
      </div>
      <div >
        <CommunityChat />
      </div>
    </div>
  );
}

export default CommunityPage;
