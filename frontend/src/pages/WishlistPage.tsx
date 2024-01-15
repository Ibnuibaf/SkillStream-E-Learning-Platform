import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BasicHeader from "../components/BasicHeader";
import Footer from "../components/Footer";
import WishlistTab from "../components/WishlistTab";

function WishlistPage() {
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
        <WishlistTab />
      </div>
      <Footer />
    </div>
  );
}

export default WishlistPage;
