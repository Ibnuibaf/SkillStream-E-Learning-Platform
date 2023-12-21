import React, { useEffect } from "react";
import BasicHeader from "../components/BasicHeader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LearningsList from "../components/LearningsList";

function MyLearningPage() {
  const token = localStorage.getItem("SkillStreamToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      toast("Logging to access");
      navigate("/login");
    }
  }, [token]);
  return (
    <div>
      <div className="px-10 py-4">
        <BasicHeader />
      </div>
      <div>
        <LearningsList/>
      </div>
    </div>
  );
}

export default MyLearningPage;
