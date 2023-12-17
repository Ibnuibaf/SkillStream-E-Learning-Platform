import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
// import { selectUser } from "../redux/slices/authSlice";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

function LoginSection() {
  const token = localStorage.getItem("SkillStreamToken");
  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [validPass, setValidPass] = useState(false);
  const [submitStage, setSubmitStage] = useState(false);

  useEffect(() => {
    if (token) {
      toast("User already logged In");
      navigate("/");
    }
  }, [token]);

  const submitForm = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setSubmitStage(true);
      if (!loginDetails.email || !loginDetails.password) {
        return toast("Enter necessary details");
      }
      if (!emailRegex.test(loginDetails.email)) {
        return toast("Enter a valid email");
      }
      if (!passwordRegex.test(loginDetails.password)) {
        return toast("Password should be strong");
      }

      const res = await axios.post(
        "http://localhost:3000/api/user/login",
        loginDetails
      );
      console.log("Is it hit here");
      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }
      setSubmitStage(false);
      localStorage.setItem("SkillStreamToken", res.data.token);
      if (res.data.admin) {
        toast("Welcome back Admin, Good to see yah!");
        navigate("/admin");
      }else{
        toast("User logged In");
        navigate("/");
      }
    } catch (error: any) {
      console.error(error.response);

      toast(error.response.data.message);
    }
  };

  const passwordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (passwordRegex.test(loginDetails.password)) {
      setValidPass(true);
    } else {
      setValidPass(false);
    }
    setLoginDetails({ ...loginDetails, password: e.target.value });
  };

  return (
    <div className="flex justify-center items-center h-[90%]">
      <div className="border-2 w-min p-5">
        <p className="text-2xl font-bold mb-2">Log In</p>
        <p className="font-medium mb-5">
          Welcome back Genius, So happy to see you!
        </p>
        <div className=" p-2 w-80">
          <form action="" onSubmit={submitForm}>
            <div className="my-5 text-start">
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter your Email"
                className="w-full py-2 px-3 border bg-transparent"
                value={loginDetails.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLoginDetails({ ...loginDetails, email: e.target.value })
                }
              />
              {!loginDetails.email && submitStage ? (
                <i className="text-red-500 text-xs ">
                  *Fill with your email address
                </i>
              ) : (
                ""
              )}
            </div>
            <div className="my-5 text-start">
              <div className="flex w-full py-2 px-3 border bg-transparent items-center justify-between">
                <input
                  type="password"
                  name=""
                  id=""
                  value={loginDetails.password}
                  placeholder="Enter your password"
                  className="bg-transparent outline-none"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    passwordOnChange(e)
                  }
                  title="Password must contain at least one uppercase, digit and special
                  character. at least 8 characters."
                />
                {validPass ? (
                  <FaRegThumbsUp color="green" size={18} />
                ) : (
                  <FaRegThumbsDown color="red" size={18} />
                )}
              </div>
              {!loginDetails.password && submitStage ? (
                <i className="text-red-500 text-xs ">
                  *Fill password as per instruction.
                </i>
              ) : (
                ""
              )}
            </div>
            <div className="text-left">
              <Link to={"/forgot"}>
                Forget your{" "}
                <span className="text-red-500 hover:text-red-700 font-medium underline">
                  password?
                </span>
              </Link>
              <br />
              <Link to={"/signup"} className="underline hover:text-red-700">
                Create an account!
              </Link>
            </div>
            <button
              type="submit"
              className="mt-9 bg-gradient-to-tr from-red-500 to-red-600 py-2 px-10 rounded-md"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginSection;
