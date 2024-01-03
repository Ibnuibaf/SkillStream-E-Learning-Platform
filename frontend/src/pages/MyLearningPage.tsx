import { useEffect } from "react";
import BasicHeader from "../components/BasicHeader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LearningsList from "../components/LearningsList";
import Footer from "../components/Footer";

function MyLearningPage() {
  const token = localStorage.getItem("SkillStreamToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      toast("Logging to access");
      navigate("/login");
    }
  }, [token, navigate]);
  return (
    <div>
      <div className="min-h-screen">
        <div className="px-10 py-4">
          <BasicHeader />
        </div>
        <div className="py-4">
          <LearningsList />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyLearningPage;
