/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaRegThumbsUp, FaRegThumbsDown, FaGoogle } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import api from "../axios/api";
import { useGoogleLogin } from "@react-oauth/google";
// import { AppDispatch } from "../redux/store";
// import { useDispatch } from "react-redux";
// import { getUser } from "../redux/actions/authActions";
// // import { selectUser, setUser } from "../redux/slices/authSlice";

interface IUserDetails {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

function SignupSection() {
  // const dispatch:AppDispatch=useDispatch()
  const [otpWait, setOtpWait] = useState(false);
  const [validPass, setValidPass] = useState(false);
  const [userDetails, setUserDetails] = useState<IUserDetails>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [counter, setCounter] = useState(30);
  const [OTP, setOTP] = useState("");
  const [otpVeified, setOtpVerifed] = useState(false);
  const [submitStage, setSubmitStage] = useState(false);
  const token = localStorage.getItem("SkillStreamToken");
  const navigate = useNavigate();
  // const dispatch=useDispatch()

  let intervalId: NodeJS.Timeout;

  const sendOTP = async () => {
    try {
      if (!userDetails.email) {
        return toast("Enter a email to send OTP");
      }
      if (!emailRegex.test(userDetails.email)) {
        return toast("Enter a valid email");
      }
      setOtpWait(true);
      intervalId = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
      const res = await api.post("/user/otp", {
        email: userDetails.email,
        isRegistration: true,
      });
      if (!res.data.otp) {
        setCounter(30);
        setOtpWait(false);
        clearInterval(intervalId);
        toast(res.data.message);
        return;
      }

      toast.success(`OTP send to your email`);
      setTimeout(() => {
        setOtpWait(false);
        clearInterval(intervalId);
        setCounter(30);
      }, 30000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error?.response?.data?.message);
      } else {
        toast("An unexpected error occurred");
      }
    }
  };
  const emailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOTP("");
    localStorage.removeItem("otp");
    setUserDetails({ ...userDetails, email: e.target.value });
  };
  const passwordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (passwordRegex.test(userDetails.password)) {
      setValidPass(true);
    } else {
      setValidPass(false);
    }
    setUserDetails({ ...userDetails, password: e.target.value });
  };
  const verifyOTP = async () => {
    try {
      await api.post("/user/otp/verify", {
        email: userDetails.email,
        otp: OTP,
      });
      setOtpVerifed(true);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error?.response?.data?.message);
      } else {
        toast("An unexpected error occurred");
      }
      setOtpVerifed(false);
    }
  };
  const submitForm = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setSubmitStage(true);
      if (
        !userDetails.confirmPassword ||
        !userDetails.email ||
        !userDetails.name ||
        !userDetails.password ||
        !OTP
      ) {
        return toast("Enter necessary details");
      }
      if (!emailRegex.test(userDetails.email)) {
        return toast("Enter a valid email");
      }
      if (!usernameRegex.test(userDetails.name)) {
        return toast("Only Letters and characters in username");
      }
      if (!passwordRegex.test(userDetails.password)) {
        return toast("Password should be strong");
      }
      if (userDetails.password != userDetails.confirmPassword) {
        return toast("Password and confirm Password should match ");
      }
      if (!otpVeified) {
        return toast("OTP is incorrect Try Again");
      }
      //   const formData = new FormData();
      //   Object.entries(userDetails).forEach(([key, value]) => {
      //     formData.append(key, value);
      //   });
      //   console.log(formData);

      const res = await api.post("/user/register", userDetails);
      if (!res.data.token) {
        toast(res.data.message);
        return;
      }
      setSubmitStage(false);
      localStorage.setItem("SkillStreamToken", res.data.token);
      toast(`User account has been created`);
      location.href = "/";
    } catch (error: unknown) {
      setSubmitStage(false);
      if (axios.isAxiosError(error)) {
        toast(error?.response?.data?.message);
      } else {
        toast("An unexpected error occurred");
      }
    }
  };
  const handleGoogleLoginSuccess = async (tokenResponse: any) => {
    try {
      const accessToken = tokenResponse.access_token;
      const res = await api.post("/user/register", {
        googleAccessToken: accessToken,
      });
      if (!res.data.token) {
        toast(res.data.message);
        return;
      }
      localStorage.setItem("SkillStreamToken", res.data.token);
      toast(`User account has been created`);
      location.href = "/";
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error?.response?.data?.message);
      } else {
        toast("An unexpected error occurred");
      }
    }
  };

  // const verifyOTP = () => {
  //   if (OTP == localStorage.getItem("otp")) {
  //     setOtpVerifed(true);
  //   }
  // };
  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
  useEffect(() => {
    if (token) {
      toast("User already logged In");
      navigate("/");
    }
  }, [navigate]);
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="border-2 w-min p-5">
        <p className="text-2xl font-bold ">Sign Up</p>
        {/* <p className="font-medium mb-5">
          Empower your journey of knowledge with us, where learning knows no
          bounds.
        </p> */}
        <div className=" p-2 w-80">
          <form action="" onSubmit={submitForm}>
            <div className="my-5 text-start">
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter your Username"
                className="w-full py-2 px-3 border bg-transparent"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserDetails({ ...userDetails, name: e.target.value })
                }
              />
              {!userDetails.name && submitStage ? (
                <i className="text-red-500 text-xs ">
                  *Fill with your name, (only letter and numbers)
                </i>
              ) : (
                ""
              )}
            </div>
            <div className="my-5 text-start">
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter your Email"
                className="w-full py-2 px-3 border bg-transparent"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  emailOnChange(e)
                }
              />
              {!userDetails.email && submitStage ? (
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
                  value={userDetails.password}
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
              {!userDetails.password && submitStage ? (
                <i className="text-red-500 text-xs ">
                  *Fill password as per instruction.
                </i>
              ) : (
                ""
              )}
            </div>
            <div className="my-5 text-start">
              <input
                type="password"
                name=""
                id=""
                placeholder="Confirm your password"
                className="w-full py-2 px-3 border bg-transparent"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserDetails({
                    ...userDetails,
                    confirmPassword: e.target.value,
                  })
                }
              />
              {!userDetails.confirmPassword && submitStage ? (
                <i className="text-red-500 text-xs ">
                  *Confirm the password to verify
                </i>
              ) : (
                ""
              )}
            </div>
            <div className="my-5 text-start">
              <div className=" w-full flex justify-between gap-2">
                <div className=" flex justify-between items-center  py-2 px-3 border">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter OTP"
                    value={OTP}
                    className=" bg-transparent outline-none"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setOTP(e.target.value);
                      setOtpVerifed(false);
                    }}
                  />
                  {otpVeified ? <TiTick color="green" size={22} /> : ""}
                </div>
                {OTP ? (
                  <button
                    type="button"
                    className=" bg-gradient-to-tr from-red-500 to-red-600 py-2 px-2 rounded-md"
                    onClick={verifyOTP}
                  >
                    Verify
                  </button>
                ) : (
                  <button
                    type="button"
                    className=" bg-gradient-to-tr from-red-500 to-red-600 py-2 px-2 rounded-md"
                    onClick={sendOTP}
                    disabled={otpWait}
                  >
                    Send OTP
                  </button>
                )}
              </div>
              {!OTP && submitStage ? (
                <i className="text-red-500 text-xs ">*Veirfy email by OTP</i>
              ) : (
                ""
              )}
              {otpWait ? (
                <p className="text-gray-400 text-right">
                  Resend OTP in {counter}
                </p>
              ) : (
                <p className="text-gray-400 text-right">OTP valid for 30sec </p>
              )}
            </div>
            <div className="text-left">
              <Link to={"/login"} className="underline hover:text-red-700">
                Already have an account?
              </Link>
            </div>
            <div className="flex flex-col ">
              <button
                type="submit"
                className="mt-9 bg-gradient-to-tr from-red-500 to-red-600 py-2 px-10 rounded-md"
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => login()}
                className="flex items-center  gap-2 mt-9 bg-gradient-to-tr from-red-500 to-red-600 py-2 px-10 rounded-md"
              >
                <FaGoogle />
                Sign Up with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupSection;
