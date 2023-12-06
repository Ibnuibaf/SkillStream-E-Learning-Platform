import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { cleanUser, selectUser, setUser } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import axios from "axios";
import {
  MdDashboard,
  MdLogout,
  MdPlayLesson,
  MdAdminPanelSettings,
  MdCategory,
} from "react-icons/md";
import { FaClipboardList, FaMoneyCheckAlt, FaUserFriends, FaUserGraduate } from "react-icons/fa";

function AdminSideBar() {
  const token = localStorage.getItem("SkillStreamToken");
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [role, setRole] = useState(user?.role);

  const logoutUser = () => {
    localStorage.removeItem("SkillStreamToken");
    dispatch(cleanUser());
    toast("Admin Logged Out!");
    navigate("/");
  };
  useEffect(() => {
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
          setRole(response.data.user.role);

          if (response.data.user.role != "admin") {
            toast("You have no Administration Access");
            navigate("/");
          }
        }
      } catch (error: any) {
        console.error("Error fetching user:", error);
        localStorage.removeItem("SkillStreamToken");

        toast(error.response.data.message);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (!token) {
      toast("Log In to your account");
      navigate("/login");
    }
    setRole(user?.role);
  }, [token, user]);
  return (
    <>
      <div className="flex flex-col w-60 bg-gradient-to-r from-gray-900 to-slate-950 rounded-r-3xl overflow-hidden">
        <div className=" items-center  h-16 shadow-md ">
          <div className="text-3xl flex items-center font-semibold">
            <img src="/SkillStream-Logo.png" alt="" className="h-12" />
            <p>SkillStream</p>
          </div>
        </div>
        <div className="flex   justify-center ">
          <div className="bg-slate-600 flex gap-2 mt-1 items-center px-2 rounded-md">
            <MdAdminPanelSettings color="orange" size={24} />
            <p className="text-md text-center text-orange-400 font-bold">
              Admin
            </p>
          </div>
        </div>
        <ul className="flex flex-col pb-4">
          <li>
            <Link
              to={"/admin"}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-300"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-gray-300">
                <MdDashboard size={24} />
              </span>
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
          </li>

          <li>
            <Link
              to={"/admin/students"}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-300"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-gray-300">
                <FaUserFriends size={24} />
              </span>
              <span className="text-sm font-medium">Students</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/admin/instructors"}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-300"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-gray-300">
                <FaUserGraduate  size={24} />
              </span>
              <span className="text-sm font-medium">Instructors</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/admin/courses"}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-300"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-gray-300">
                <MdPlayLesson size={24} />
              </span>
              <span className="text-sm font-medium">Courses</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/admin/categories"}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-300"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-gray-300">
                <MdCategory size={24} />
              </span>
              <span className="text-sm font-medium">Categories</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/admin/payments"}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-300"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-gray-300">
                <FaMoneyCheckAlt  size={24} />
              </span>
              <span className="text-sm font-medium">Payments</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/admin/reports"}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-300"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-gray-300">
                <FaClipboardList  size={24} />
              </span>
              <span className="text-sm font-medium">Reports</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/profile"}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-300"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-gray-300">
                <img
                  src="https://cdn0.iconfinder.com/data/icons/user-interface-vol-3-12/66/68-512.png"
                  alt=""
                  className="h-6"
                />
              </span>
              <span className="text-sm font-medium">Profile</span>
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={logoutUser}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-red-700"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-red-700">
                <MdLogout size={24} />
              </span>
              <span className="text-sm font-medium">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default AdminSideBar;
