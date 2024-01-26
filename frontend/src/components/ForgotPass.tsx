import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../axios/api";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

function ForgotPass() {
  const [otpWait, setOtpWait] = useState(false);
  const token = localStorage.getItem("SkillStreamToken");
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [counter, setCounter] = useState(30);
  const [OTP, setOTP] = useState("");
  const [otpVeified, setOtpVerifed] = useState(false);
  const [validPass, setValidPass] = useState(false);
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
      if (
        !userDetails.confirmPassword ||
        !userDetails.email ||
        !userDetails.password ||
        !OTP
      ) {
        return toast("Enter necessary details");
      }
      if (!emailRegex.test(userDetails.email)) {
        return toast("Enter a valid email");
      }
      if (userDetails.password.length < 6) {
        return toast("Password should contain minimum 6 characters");
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

      const res = await api.post(
        "/user/recover",
        userDetails
      );
      if (!res.data.user) {
        toast(res.data.message);
        return;
      }
      toast(`User password has been updated login to account`);
      navigate("/login");
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

  useEffect(() => {
    if (token) {
      toast("User already logged In");
      navigate("/");
    }
  }, [token,navigate]);
  return (
    <div className="flex justify-center items-center h-[90%]">
      <div className="border-2 w-min p-5">
        <p className="text-2xl font-bold mb-2">Recover Account</p>
        <p className="font-medium mb-5">
          Guard your keys to the digital realm. Reset, renew, and reclaim your
          access with a secure password.
        </p>
        <div className=" p-2 w-80">
          <form action="" onSubmit={submitForm}>
            <div className="my-5">
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter your Email"
                className="w-full py-2 px-3 border bg-transparent"
                value={userDetails.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  emailOnChange(e)
                }
              />
            </div>
            <div className="my-5">
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
              {otpWait ? (
                <p className="text-gray-400 text-right">
                  Resend OTP in {counter}
                </p>
              ) : (
                <p className="text-gray-400 text-right">OTP valid for 30sec </p>
              )}
            </div>
            {otpVeified ? (
              <>
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
                </div>

                <div className="my-5">
                  <input
                    type="password"
                    name=""
                    id=""
                    placeholder="Confirm your new password"
                    className="w-full py-2 px-3 border bg-transparent"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUserDetails({
                        ...userDetails,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
              </>
            ) : (
              ""
            )}

            <button
              type="submit"
              className="mt-9 bg-gradient-to-tr from-red-500 to-red-600 py-2 px-10 rounded-md"
            >
              Recover
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPass;
