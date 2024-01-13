import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { cleanUser, selectUser } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import {
  MdDashboard,
  MdLogout,
  MdPlayLesson,
  MdAdminPanelSettings,
  MdCategory,
} from "react-icons/md";
import {
  FaClipboardList,
  FaMoneyCheckAlt,
  FaUserFriends,
  FaUserGraduate,
} from "react-icons/fa";
import { AppDispatch } from "../redux/store";

function AdminSideBar() {
  const token = localStorage.getItem("SkillStreamToken");
  const user = useSelector(selectUser).user;
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

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
    toast("Admin Logged Out!");
    navigate("/");
  };

  useEffect(() => {
    if (!token) {
      toast("Log In to your account");
      navigate("/login");
    } else if (user && user.role !== "admin") {
      toast("You have no administration access");
      navigate("/");
    }
  }, [token, user, navigate]);
  return (
    <div className={`sticky top-0 z-50 ${collapsed ? "w-[10vw]" : "w-60"}`}>
      <div
        className={`flex flex-col ${
          collapsed ? "w-[10vw]" : "w-60"
        } bg-gradient-to-r from-gray-900 to-slate-950 overflow-hidden h-screen`}
      >
        <div className=" items-center  h-16 shadow-md py-1">
          <div className="text-3xl flex items-center font-semibold">
            <>
              <img src="/SkillStream-Logo.png" alt="" className="h-12" />
              {!collapsed && <p>SkillStream</p>}
            </>
          </div>
        </div>
        <div
          className={`flex   ${
            collapsed ? "justify-start px-2" : "justify-center"
          } `}
        >
          <div className="bg-slate-600 flex gap-2 mt-1 items-center px-2 rounded-md">
            <MdAdminPanelSettings color="orange" size={24} />
            {!collapsed && (
              <p className="text-md text-center text-orange-400 font-bold">
                Admin
              </p>
            )}
          </div>
        </div>
        <ul className="flex flex-col pb-4">
          <li className="flex px-4">
            <Link
              to={"/admin"}
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
          <li className="flex px-4">
            <Link
              to={"/admin/students"}
              className={`flex items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 ${
                collapsed ? "justify-center" : ""
              } text-gray-500 hover:text-gray-300`}
            >
              <span
                className={`inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-gray-300 ${
                  collapsed ? "w-full" : ""
                }`}
              >
                <FaUserFriends size={24} />
              </span>
              {!collapsed && (
                <span className="text-sm font-medium">Students</span>
              )}
            </Link>
          </li>
          <li className="flex px-4">
            <Link
              to={"/admin/instructors"}
              className={`flex items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 ${
                collapsed ? "justify-center" : ""
              } text-gray-500 hover:text-gray-300`}
            >
              <span
                className={`inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-gray-300 ${
                  collapsed ? "w-full" : ""
                }`}
              >
                <FaUserGraduate size={24} />
              </span>
              {!collapsed && (
                <span className="text-sm font-medium">Instructors</span>
              )}
            </Link>
          </li>
          <li className="flex px-4">
            <Link
              to={"/admin/courses"}
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
          <li className="flex px-4">
            <Link
              to={"/admin/categories"}
              className={`flex items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 ${
                collapsed ? "justify-center" : ""
              } text-gray-500 hover:text-gray-300`}
            >
              <span
                className={`inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-gray-300 ${
                  collapsed ? "w-full" : ""
                }`}
              >
                <MdCategory size={24} />
              </span>
              {!collapsed && (
                <span className="text-sm font-medium">Categories</span>
              )}
            </Link>
          </li>
          <li className="flex px-4">
            <Link
              to={"/admin/payments"}
              className={`flex items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 ${
                collapsed ? "justify-center" : ""
              } text-gray-500 hover:text-gray-300`}
            >
              <span
                className={`inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-gray-300 ${
                  collapsed ? "w-full" : ""
                }`}
              >
                <FaMoneyCheckAlt size={24} />
              </span>
              {!collapsed && (
                <span className="text-sm font-medium">Payments</span>
              )}
            </Link>
          </li>
          <li className="flex px-4">
            <Link
              to={"/admin/reports"}
              className={`flex items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 ${
                collapsed ? "justify-center" : ""
              } text-gray-500 hover:text-gray-300`}
            >
              <span
                className={`inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-gray-300 ${
                  collapsed ? "w-full" : ""
                }`}
              >
                <FaClipboardList size={24} />
              </span>
              {!collapsed && (
                <span className="text-sm font-medium">Reports</span>
              )}
            </Link>
          </li>
          <li className="flex px-4">
            <Link
              to={"/profile"}
              className={`flex items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 ${
                collapsed ? "justify-center" : ""
              } text-gray-500 hover:text-gray-300`}
            >
              <span
                className={`inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-gray-300 ${
                  collapsed ? "w-full" : ""
                }`}
              >
                <img
                  src="https://cdn0.iconfinder.com/data/icons/user-interface-vol-3-12/66/68-512.png"
                  alt=""
                  className="h-6"
                />
              </span>
              {!collapsed && (
                <span className="text-sm font-medium">Profile</span>
              )}
            </Link>
          </li>
          <li className="flex px-4">
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
  );
}

export default AdminSideBar;
