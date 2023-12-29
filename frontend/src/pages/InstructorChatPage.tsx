import React, { useEffect } from "react";
import ChatWithStudent from "../components/ChatWithStudent";
import { useNavigate } from "react-router-dom";

function InstructorChatPage() {
  const token = localStorage.getItem("SkillStreamToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);
  return (
    <div className="h-screen overflow-hidden">
      <ChatWithStudent />
    </div>
  );
}

export default InstructorChatPage;
