// import React from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { cleanUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'

function LogoutSection() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const logoutUser=()=>{
        localStorage.removeItem("SkillStreamToken")
        dispatch(cleanUser())
        toast("User Logged Out!")
        navigate('/')
    }
    
  return (
    <div className="flex justify-end py-3 w-full px-5">
      <button className="text-red-700 flex gap-1 items-center border px-2 py-1 rounded-2xl border-red-700 duration-300 hover:text-white hover:border-white hover:bg-red-700" onClick={logoutUser}>
        <p>Logout</p>
        <RiLogoutBoxRLine color="" size={18} />
      </button>
    </div>
  );
}

export default LogoutSection;
