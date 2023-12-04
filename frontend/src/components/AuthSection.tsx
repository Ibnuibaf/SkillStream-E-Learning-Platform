import { RiShoppingCart2Fill, RiNotification4Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { selectUser, setUser } from "../redux/slices/authSlice";
import { useEffect, useState } from "react";

function AuthSection() {
  const reduxUser = useSelector(selectUser);
  const [userDetails, setUserDetails] = useState(reduxUser || null);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("SkillStreamToken");
    console.log(token);

    const fetchData = async () => {
      try {
        if (token) {
          const response = await axios.get(
            "http://localhost:3000/api/user/find",
            {
              headers: {
                Authorization: token,
              },
            }
          );
          if (!response.data.user) {
            toast(response.data.message);
            return;
          }
          dispatch(setUser(response.data.user));
          setUserDetails(response.data.user);
        } else {
          setUserDetails(null);
        }
      } catch (error:any) {
        console.error("Error fetching user:", error);
        setUserDetails(null);
        localStorage.removeItem("SkillStreamToken");

        toast(error.response.data.message);
      }
    };

    fetchData();
  }, [dispatch]);

  return userDetails ? (
    <div className="flex gap-5 items-center">
      <button>
        <RiShoppingCart2Fill size={24}></RiShoppingCart2Fill>
      </button>
      <Link to={"/notifications"} className="">
        <RiNotification4Line size={24}></RiNotification4Line>
      </Link>
      <Link to={"/profile"} className="flex items-center gap-1">
        <img src={userDetails.avatar} alt="" className="rounded-full h-8" />
        <p>{userDetails.name}</p>
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
