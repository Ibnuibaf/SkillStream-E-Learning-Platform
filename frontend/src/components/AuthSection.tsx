import { useState } from "react";
import { LuHeart } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";
import { AppDispatch } from "../redux/store";
import { useEffect } from "react";
import { getUser } from "../redux/actions/authActions";


function AuthSection() {
  const userDetails = useSelector(selectUser);
  const token = localStorage.getItem("SkillStreamToken");
  const dispatch: AppDispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);

  const getUserDetails = async () => {
    await dispatch(getUser());
  };

  useEffect(() => {
    if (token) {
      getUserDetails();
    }
  }, [dispatch, token]);

  const handleTogglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      {userDetails.loading ? (
        <div className="flex space-x-2 animate-pulse">
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
        </div>
      ) : userDetails.user ? (
        <div className="flex justify-end">
          {/* Button to toggle the popup */}
          <button
            className="lg:hidden rounded-md h-min py-1 px-3 font-semibold "
            onClick={handleTogglePopup}
          >
            {userDetails.user ? (
              <div className="flex items-center gap-1">
                <img
                  src={userDetails.user?.avatar}
                  alt=""
                  className="rounded-full h-8"
                />
                <p className="hidden md:block">{userDetails.user?.name}</p>
              </div>
            ) : (
              "User"
            )}
          </button>

          {/* Popup div for small screens */}
          {showPopup && (
            <div className="lg:hidden absolute top-16 right-0 bg-purple-950 p-4 border shadow-md ">
              {/* Place your links or content here */}
              <Link
                to={"/profile"}
                className=" mb-2 flex items-center gap-1 border transition duration-300 border-pink-700 hover:bg-pink-700 px-2 py-1 rounded-md"
              >
                <img
                  src={userDetails.user?.avatar}
                  alt=""
                  className="rounded-full h-8"
                />
                {userDetails.user?.name}
              </Link>
              <Link
                to={"/mylearning"}
                className="block mb-2 border transition duration-300 border-pink-700 hover:bg-pink-700 px-2 py-1 rounded-md"
              >
                My Learnings
              </Link>
              <Link
                to={"/mywishlist"}
                className="block mb-2 border transition duration-300 border-pink-700 hover:bg-pink-700 px-2 py-1 rounded-md"
              >
                My Wishlist{" "}
                <span className="relative bg-violet-600 rounded-full px-1 text-sm  bottom-1 font-bold">
                  {userDetails.user?.wishlist.length}
                </span>
              </Link>
              {/* Add more links as needed */}
            </div>
          )}

          {/* Content for larger screens */}
          {!showPopup && (
            <div className="hidden lg:flex gap-5 items-center ">
              <Link
                to={"/mylearning"}
                className="h-min py-1 px-3 font-semibold"
              >
                My Learnings
              </Link>
              <Link to={"/mywishlist"} className="flex gap-1 items-start">
                <LuHeart size={28}></LuHeart>
                <p className="relative bg-pink-600 rounded-full px-1 text-sm right-3 bottom-1 font-bold">
                  {userDetails.user?.wishlist.length}
                </p>
              </Link>
              <Link to={"/profile"} className="flex items-center gap-1">
                <img
                  src={userDetails.user?.avatar}
                  alt=""
                  className="rounded-full h-8"
                />
                <p >{userDetails.user?.name}</p>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-5 items-center">
          {/* Popup div for userDetails.user not available */}
          <button
            className="lg:hidden rounded-md h-min py-1 px-3 font-semibold "
            onClick={handleTogglePopup}
          >
            Login
          </button>
          {showPopup && (
            <div className="lg:hidden absolute top-16 right-0 bg-purple-950 p-4 border shadow-md ">
              <p className="text-white text-lg font-semibold mb-4">Welcome!</p>
              <p className="text-white mb-4">
                Log in or sign up to access more features.
              </p>
              <Link
                to={"/login"}
                className="block mb-2 border transition duration-300 border-pink-700 hover:bg-pink-700 px-4 py-2 rounded-md text-white"
              >
                Log In
              </Link>
              <Link
                to={"/signup"}
                className="block mb-2 border transition duration-300 border-pink-700 hover:bg-pink-700 px-4 py-2 rounded-md text-white"
              >
                Sign Up
              </Link>
              {/* Add more links or content as needed */}
            </div>
          )}
          {/* Other elements for userDetails.user not available case */}
          {!showPopup && (
            <div className="hidden lg:flex gap-5 items-center ">
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
          )}
        </div>
      )}
    </>
  );
}

export default AuthSection;
