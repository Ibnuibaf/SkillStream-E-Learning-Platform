import { RiShoppingCart2Fill, RiNotification4Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";
import { AppDispatch } from "../redux/store";
import { useEffect } from "react";
import { getUser } from "../redux/actions/authActions";

function AuthSection() {
  const userDetails = useSelector(selectUser);
  const token=localStorage.getItem("SkillStreamToken")
  const dispatch:AppDispatch=useDispatch()

  useEffect(()=>{
    if(token){
      dispatch(getUser())
    }
  },[])

  return userDetails.loading ? (
    <div className="flex space-x-2 animate-pulse">
      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
    </div>
  ) : userDetails.user ? (
    <div className="flex gap-5 items-center">
      <Link
        to={"/mylearning"}
        className=" h-min py-1 px-3 font-semibold "
      >
        My Learnings
      </Link>
      <button>
        <RiShoppingCart2Fill size={24}></RiShoppingCart2Fill>
      </button>
      <Link to={"/notifications"} className="">
        <RiNotification4Line size={24}></RiNotification4Line>
      </Link>
      <Link to={"/profile"} className="flex items-center gap-1">
        <img
          src={userDetails.user?.avatar}
          alt=""
          className="rounded-full h-8"
        />
        <p>{userDetails.user?.name}</p>
      </Link>
    </div>
  ) : (
    <div className="flex gap-5 items-center">
      <button>
        <RiShoppingCart2Fill size={24}></RiShoppingCart2Fill>
      </button>
      <Link
        to={"/login"}
        className="border rounded-md h-min py-1 px-3 font-semibold duration-300 hover:bg-white hover:text-slate-950"
      >
        Log In
      </Link>
      <Link
        to={"/signup"}
        className="bg-white border text-slate-950 rounded-md h-min py-1 font-semibold px-3 duration-300 hover:bg-transparent hover:text-white"
      >
        Sign Up
      </Link>
    </div>
  );
}

export default AuthSection;
