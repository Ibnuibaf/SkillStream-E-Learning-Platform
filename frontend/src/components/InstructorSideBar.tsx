import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  MdDashboard,
  MdPlayLesson,
  MdOutlineMarkUnreadChatAlt,
  // MdNotifications,
  MdLogout,
} from "react-icons/md";
import { BiSolidGroup } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { cleanUser, selectUser } from "../redux/slices/authSlice";
import AuthorizePage from "../pages/AuthorizePage";

function InstructorSideBar() {
  const token = localStorage.getItem("SkillStreamToken");
  const user = useSelector(selectUser).user;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      // Check the window width and set collapsed state accordingly
      setCollapsed(window.innerWidth <= 768); // You can adjust the width threshold
    };

    // Attach the resize event listener
    window.addEventListener("resize", handleResize);

    // Initialize the collapsed state on component mount
    handleResize();

    return () => {
      // Remove the event listener on component unmount
      window.removeEventListener("resize", handleResize);
    };
  }, [navigate, dispatch]);

  const logoutUser = () => {
    localStorage.removeItem("SkillStreamToken");
    dispatch(cleanUser());
    toast("Instructor Logged Out!");
    navigate("/");
  };

  useEffect(() => {
    if (!token) {
      toast("Log In to your account");
      navigate("/login");
    }
  }, [token, user, navigate]);
  return (
    <>
      {user?.role != "instructor" ||
      !user?.verification[0] ||
      !user?.verification[1] ||
      !user?.verification[2] ? (
        <AuthorizePage />
      ) : user?.verified ? (
        <div className={`min-h-screen flex flex-row`}>
          <div
            className={`flex flex-col ${
              collapsed ? "w-[10vw]" : "w-60"
            } bg-gradient-to-r from-gray-900 to-slate-950 overflow-hidden rounded-r-3xl`}
          >
            <div className="flex items-center h-16 shadow-md py-1">
              <div className="text-3xl flex items-center font-semibold">
                <>
                  <img src="/SkillStream-Logo.png" alt="" className="h-12" />
                  {!collapsed && <p>SkillStream</p>}
                </>
              </div>
            </div>
            <div
              className={`flex ${
                collapsed ? "justify-start px-2" : "justify-center"
              }`}
            >
              <div className="bg-slate-600 flex gap-2 mt-1 items-center px-2 rounded-md">
                {!collapsed && (
                  <p className="text-md text-center text-pink-600 font-bold">
                    Instructor
                  </p>
                )}
              </div>
            </div>
            <div className="flex lg:block justify-center">
              <ul className="flex flex-col pb-4">
                <li className="flex px-2">
                  <Link
                    to={"/instructor"}
                    className={`flex items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 ${
                      collapsed ? "justify-center" : ""
                    } text-gray-500 hover:text-gray-300`}
                  >
                    <span
                      className={`inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-gray-300 ${
                        collapsed ? "w-full" : ""
                      }`}
                    >
                      <MdDashboard size={24} />
                    </span>
                    {!collapsed && (
                      <span className="text-sm font-medium">Dashboard</span>
                    )}
                  </Link>
                </li>
                <li className="flex px-2">
                  <Link
                    to={"/instructor/courses"}
                    className={`flex items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 ${
                      collapsed ? "justify-center" : ""
                    } text-gray-500 hover:text-gray-300`}
                  >
                    <span
                      className={`inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-gray-300 ${
                        collapsed ? "w-full" : ""
                      }`}
                    >
                      <MdPlayLesson size={24} />
                    </span>
                    {!collapsed && (
                      <span className="text-sm font-medium">Courses</span>
                    )}
                  </Link>
                </li>
                <li className="flex px-2">
                  <Link
                    to={"/instructor/communities"}
                    className={`flex items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 ${
                      collapsed ? "justify-center" : ""
                    } text-gray-500 hover:text-gray-300`}
                  >
                    <span
                      className={`inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-gray-300 ${
                        collapsed ? "w-full" : ""
                      }`}
                    >
                      <MdOutlineMarkUnreadChatAlt size={24} />
                    </span>
                    {!collapsed && (
                      <span className="text-sm font-medium">Communities</span>
                    )}
                  </Link>
                </li>
                <li className="flex px-2">
                  <Link
                    to={"/instructor/chats"}
                    className={`flex items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 ${
                      collapsed ? "justify-center" : ""
                    } text-gray-500 hover:text-gray-300`}
                  >
                    <span
                      className={`inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-gray-300 ${
                        collapsed ? "w-full" : ""
                      }`}
                    >
                      <BiSolidGroup size={24} />
                    </span>
                    {!collapsed && (
                      <span className="text-sm font-medium">Chats</span>
                    )}
                  </Link>
                </li>
                <li className="flex px-2  md:px-5">
                  <Link
                    to={"/profile"}
                    className={`flex gap-3 items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 ${
                      collapsed ? "justify-center" : ""
                    } text-gray-500 hover:text-gray-300`}
                  >
                    <span
                      className={`inline-flex items-center justify-center h-6 w-6 text-lg text-gray-400 hover:text-gray-300 ${
                        collapsed ? "w-full" : ""
                      }`}
                    >
                      <img
                        src="https://cdn0.iconfinder.com/data/icons/user-interface-vol-3-12/66/68-512.png"
                        alt=""
                        className="h-full w-full"
                      />
                    </span>
                    {!collapsed && (
                      <span className="text-sm font-medium">Profile</span>
                    )}
                  </Link>
                </li>
                <li className="flex px-2">
                  <button
                    type="button"
                    onClick={logoutUser}
                    className={`flex items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 ${
                      collapsed ? "justify-center" : ""
                    } text-gray-500 hover:text-red-700`}
                  >
                    <span
                      className={`inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-red-700 ${
                        collapsed ? "w-full" : ""
                      }`}
                    >
                      <MdLogout size={24} />
                    </span>
                    {!collapsed && (
                      <span className="text-sm font-medium">Logout</span>
                    )}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen">
          <div className="flex justify-start p-6">
            <Link
              to={"/"}
              type="button"
              className="border rounded px-2 font-medium bg-gray-300 text-gray-800 hover:bg-gray-500 hover:text-white"
            >
              Back
            </Link>
          </div>
          <div className="flex justify-center items-center h-[75vh]">
            <div className="border-2 p-4 rounded-md shadow-lg shadow-gray-800 ">
              <p className="text-2xl font-medium mb-5">
                Sorry :) Admin Not Approved! Try Later
              </p>
              <p className="font-thin mt-3 py-5">
                Admin Approval for instructor is pending,
                <br /> you will be noticed when approved through Mail!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default InstructorSideBar;
