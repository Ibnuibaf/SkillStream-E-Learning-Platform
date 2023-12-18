import  { useEffect,} from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  MdDashboard,
  MdPlayLesson,
  MdOutlineMarkUnreadChatAlt,
  MdNotifications,
  MdLogout,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { cleanUser, selectUser,} from "../redux/slices/authSlice";
import AuthorizePage from "../pages/AuthorizePage";

function InstructorSideBar() {
  const token = localStorage.getItem("SkillStreamToken");
  const user = useSelector(selectUser).user;
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const logoutUser=()=>{
      localStorage.removeItem("SkillStreamToken")
      dispatch(cleanUser())
      toast("Instructor Logged Out!")
      navigate('/')
  }

  useEffect(() => {
    if (!token) {
      toast("Log In to your account");
      navigate("/login");
    }
  }, [token, user]);
  return (
    <>
      {user?.role != "instructor" ? (
        <AuthorizePage />
      ) : user?.verified?(
        <div className="min-h-screen flex flex-row ">
          <div className="flex flex-col w-60 bg-gradient-to-r from-gray-900 to-slate-950 rounded-r-3xl overflow-hidden">
            <div className="flex items-center  h-16 shadow-md">
              <div className="text-3xl flex items-center font-semibold">
                <img
                  src="/SkillStream-Logo.png"
                  alt=""
                  className="h-12"
                />
                <p>SkillStream</p>
              </div>
            </div>
            <ul className="flex flex-col py-4">
              <li>
                <Link
                  to={"/instructor"}
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
                  to={"/instructor/courses"}
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
                  to={"/instructor/communities"}
                  className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-300"
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-gray-300">
                    <MdOutlineMarkUnreadChatAlt size={24} />
                  </span>
                  <span className="text-sm font-medium">Communities</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/instructor/notifications"}
                  className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-300"
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-gray-300">
                    <MdNotifications size={24} />
                  </span>
                  <span className="text-sm font-medium">Notifications</span>
                  <span className="ml-auto mr-6 items-center text-[10px] font-medium bg-red-500 rounded-full p-2 py-px text-red-100">
                    5
                  </span>
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
                <button type="button" onClick={logoutUser} className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-red-700">
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-red-700">
                    <MdLogout size={24} />
                  </span>
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      ):(
        <div className="h-screen">
          <div className="flex justify-start p-6">
            <Link to={'/'} type="button" className="border rounded px-2 font-medium bg-gray-300 text-gray-800 hover:bg-gray-500 hover:text-white">
              Back
            </Link>
          </div>
          <div className="flex justify-center items-center h-[75vh]">
            <div className="border-2 p-4 rounded-md shadow-lg shadow-gray-800 ">
              <p className="text-2xl font-medium mb-5">Sorry :) Admin Not Approved! Try Later</p>
              <p className="font-thin mt-3 py-5">Admin Approval for instructor is pending,<br /> you will be noticed when approved through Mail!</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default InstructorSideBar;
