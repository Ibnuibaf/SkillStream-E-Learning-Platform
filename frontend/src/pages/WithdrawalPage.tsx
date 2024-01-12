import  { useEffect } from "react";
import WithdrawTab from "../components/WithdrawTab";
import Footer from "../components/Footer";
import BasicHeader from "../components/BasicHeader";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function WithdrawalPage() {
  const user=useSelector(selectUser).user
  const token=localStorage.getItem("SkillStreamToken")
  const navigate=useNavigate()
  useEffect(()=>{
    if(!token){
      toast("Login to access")
      navigate('/')
    }
    if(user?.role=="student"){
      toast("No access to wallet.")
      navigate('/')
    }
  },[])
  return (
    <div>
      <div className="h-screen px-10 py-4">
        <BasicHeader />
        <WithdrawTab />
      </div>
      <Footer />
    </div>
  );
}

export default WithdrawalPage;
