// import React from 'react'

import { useDispatch, useSelector } from "react-redux";
import LogoutSection from "./LogoutSection";
import { selectUser } from "../redux/slices/authSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import api from "../axios/api";
import { TiTick } from "react-icons/ti";
import { AppDispatch } from "../redux/store";
import { getUser } from "../redux/actions/authActions";

function ProfileTab() {
  const dispatch: AppDispatch = useDispatch();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const user = useSelector(selectUser).user;
  const [userDetails, setUserDetails] = useState({
    email: "",
    name: "",
  });
  const [passwordDetails, setPasswordDetails] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setloading] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  // const [bankDetails, setBankDetails] = useState({
  //   bank: "",
  //   number: "",
  //   ifsc: "",
  //   name: "",
  // });
  const [otpWait, setOtpWait] = useState(false);
  const [counter, setCounter] = useState(30);
  const [OTP, setOTP] = useState("");
  const [viewOTP, setViewOTP] = useState(false);
  const [otpVeified, setOtpVerifed] = useState(false);
  const [editMode, setEditMode] = useState("");

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

      localStorage.setItem("otp", res.data.otp);
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
  const updatePassword = async () => {
    if (!passwordDetails.password || !passwordDetails.confirmPassword) {
      return toast("Enter a password & confirm Password");
    }
    if (!passwordRegex.test(passwordDetails.password)) {
      return toast("Enter a valid password");
    }
    if (passwordDetails.password != passwordDetails.confirmPassword) {
      return toast("Passowrd should match");
    }
    try {
      const res = await api.patch("/user/update", {
        password: passwordDetails.password,
      });
      toast(res.data.message);
      // toast("User Details Updated");
      dispatch(getUser());
      setEditMode("");
      setPasswordDetails({ password: "", confirmPassword: "" });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error?.response?.data?.message);
      } else {
        toast("An unexpected error occurred");
      }
    }
  };
  const updateAvatar = async () => {
    if (avatar) {
      setloading(true);
      const data = new FormData();
      data.append("file", avatar);
      data.append("upload_preset", "image_preset");
      try {
        const cloudName = "dshijvj8y";

        const url = `https://api.cloudinary.com/v1_1/${cloudName}/${"image"}/upload`;
        const res = await axios.post(url, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // console.log(res);
        const { secure_url } = res.data;
        const response = await api.patch("/user/update", {
          avatar: secure_url,
        });
        toast(response.data.message);
        dispatch(getUser());
        setAvatar(null);
        // console.log(courseDetails);
        setloading(false);
      } catch (error: unknown) {
        setloading(false);
        if (axios.isAxiosError(error)) {
          toast(error?.response?.data?.message);
        } else {
          toast("An unexpected error occurred");
        }
      }
    }
  };
  const submitPersonal = async () => {
    if (!userDetails.email || !userDetails.name) {
      return toast("Enter a email & username");
    }
    if (!emailRegex.test(userDetails.email)) {
      return toast("Enter a valid email");
    }
    if (!usernameRegex.test(userDetails.name)) {
      return toast("Only Letters and characters in username");
    }
    if (userDetails.email != user?.email && !otpVeified) {
      setViewOTP(true);
      return sendOTP();
    }
    try {
      const res = await api.patch("/user/update", userDetails);
      toast(res.data.message);
      // toast("User Details Updated");
      dispatch(getUser());
      setEditMode("");
      setUserDetails({ email: "", name: "" });
      setCounter(30);
      setOTP("");
      setOtpVerifed(false);
      setOtpWait(false);
      setViewOTP(false);
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
  const verifyOTP = () => {
    if (OTP == localStorage.getItem("otp")) {
      setOtpVerifed(true);
    }
    console.log(OTP);
  };

  return (
    <div>
      {user ? (
        <>
          <LogoutSection />
          <div className="mt-8 flex justify-center items-center">
            <div className="border rounded max-w-6xl text-start">
              <div>
                <div className="flex flex-col items-center p-4">
                  <label
                    htmlFor="avatar"
                    className="cursor-pointer"
                    title="Change Avatar"
                  >
                    <input
                      type="file"
                      name="avatar"
                      id="avatar"
                      accept="image/*"
                      className="hidden "
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setAvatar(e.target.files ? e.target.files[0] : null)
                      }
                    />
                    {loading ? (
                      <div className="h-24 bg-slate-300 w-24 rounded-full flex items-center justify-center">
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={user.avatar}
                        alt=""
                        className="h-[10vh] w-[5vw] rounded-full"
                      />
                    )}
                  </label>
                  <p>{user.name}</p>
                  {avatar ? (
                    <button
                      onClick={updateAvatar}
                      className="bg-red-700 px-4 py-1 rounded-lg hover:bg-red-700/80"
                    >
                      Update
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                <div className="border flex justify-center p-2   m-3">
                  <div className="bg-slate-800 p-2 rounded w-full flex flex-col justify-between">
                    <p className="text-lg">Personal Details</p>
                    <div>
                      {editMode == "personal" ? (
                        <div className="">
                          <input
                            type="text"
                            className="my-1 pt-2 pr-8 pl-2 border-2 w-[20vw] bg-transparent"
                            value={userDetails.email}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => emailOnChange(e)}
                          />{" "}
                          <br />
                          <input
                            type="text"
                            className="my-1 pt-2 pr-8 pl-2 border-2 w-[20vw] bg-transparent"
                            value={userDetails.name}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setUserDetails({
                                ...userDetails,
                                name: e.target.value,
                              })
                            }
                          />
                          {viewOTP ? (
                            <div className="">
                              <div className=" w-full flex justify-between gap-2">
                                <div className=" flex justify-between items-center  py-2 px-3 border">
                                  <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Enter OTP"
                                    value={OTP}
                                    className=" bg-transparent outline-none"
                                    onChange={(
                                      e: React.ChangeEvent<HTMLInputElement>
                                    ) => setOTP(e.target.value)}
                                  />
                                  {otpVeified ? (
                                    <TiTick color="green" size={22} />
                                  ) : (
                                    ""
                                  )}
                                </div>
                                {otpWait ? (
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
                                <p className="text-gray-400 text-right">
                                  OTP valid for 30sec{" "}
                                </p>
                              )}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        <>
                          <p className="bg-slate-600 my-1 pt-2 pr-8 pl-2 rounded-lg">
                            <span className="font-semibold">Email: </span>
                            {user.email}
                          </p>
                          <p className="bg-slate-600 my-1 pt-2 pr-8 pl-2 rounded-lg">
                            <span className="font-semibold">Username: </span>
                            {user.name}
                          </p>
                          <p className="bg-slate-600 my-1 pt-2 pr-8 pl-2 rounded-lg">
                            <span className="font-semibold">Role: </span>
                            <i className="text-orange-700 font-bold">
                              {user.role.toUpperCase()}
                            </i>
                          </p>
                        </>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {editMode == "personal" ? (
                        <>
                          <button
                            onClick={() => {
                              setEditMode("");
                              setUserDetails({ email: "", name: "" });
                            }}
                            className="bg-red-700 px-4 py-1 rounded-lg hover:bg-red-700/80"
                          >
                            Reset
                          </button>
                          <button
                            onClick={() => {
                              submitPersonal();
                            }}
                            className="bg-red-700 px-4 py-1 rounded-lg hover:bg-red-700/80"
                          >
                            Update
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            setEditMode("personal");
                            setUserDetails({
                              email: user.email,
                              name: user.name,
                            });
                          }}
                          className="bg-green-500 px-4 py-1 rounded-lg hover:bg-green-500/80"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="border flex justify-between p-2 gap-4 m-3">
                  <div className="bg-slate-800 p-2 rounded w-full">
                    <p className="text-lg"> Update Password</p>
                    <div className="">
                      <input
                        type="password"
                        className="my-1 pt-2 pr-8 pl-2 border-2 w-[20vw] bg-transparent"
                        value={passwordDetails.password}
                        placeholder="Update your password"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPasswordDetails({
                            ...passwordDetails,
                            password: e.target.value,
                          })
                        }
                      />{" "}
                      <br />
                      <input
                        type="password"
                        placeholder="Confirm updated new password"
                        className="my-1 pt-2 pr-8 pl-2 border-2 w-[20vw] bg-transparent"
                        value={passwordDetails.confirmPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPasswordDetails({
                            ...passwordDetails,
                            confirmPassword: e.target.value,
                          })
                        }
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditMode("");
                            setPasswordDetails({
                              password: "",
                              confirmPassword: "",
                            });
                          }}
                          className="bg-red-700 px-4 py-1 rounded-lg hover:bg-red-700/80"
                        >
                          Reset
                        </button>
                        <button
                          onClick={() => {
                            updatePassword();
                          }}
                          className="bg-red-700 px-4 py-1 rounded-lg hover:bg-red-700/80"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="flex justify-center">
                <div className="border flex justify-between p-2 gap-4 m-3">
                  <div className="bg-slate-800 p-2 rounded w-full">
                    <p className="text-lg">Bank Details</p>
                    <p className="bg-slate-600 my-1 pt-2 pr-8 pl-2 rounded-lg">
                      <span className="font-semibold">Bank Name: </span>
                      {"Federal Bank"}
                    </p>
                    <p className="bg-slate-600 my-1 pt-2 pr-8 pl-2 rounded-lg">
                      <span className="font-semibold">Account Number: </span>
                      {"358237832953998"}
                    </p>
                    <p className="bg-slate-600 my-1 pt-2 pr-8 pl-2 rounded-lg">
                      <span className="font-semibold">Account Name: </span>
                      {user.name.toUpperCase()}
                    </p>
                    <p className="bg-slate-600 my-1 pt-2 pr-8 pl-2 rounded-lg">
                      <span className="font-semibold">IFSC: </span>
                      {"FDRL00153"}
                    </p>
                  </div>
                </div>
                <div className="border flex justify-between p-2 gap-4 m-3">
                  <div className="bg-slate-800 p-2 rounded w-full">
                    <p className="text-lg">Bank Details</p>
                    <p className="bg-slate-600 my-1 pt-2 pr-8 pl-2 rounded-lg">
                      <span className="font-semibold">Bank Name: </span>
                      {"Federal Bank"}
                    </p>
                    <p className="bg-slate-600 my-1 pt-2 pr-8 pl-2 rounded-lg">
                      <span className="font-semibold">Account Number: </span>
                      {"358237832953998"}
                    </p>
                    <p className="bg-slate-600 my-1 pt-2 pr-8 pl-2 rounded-lg">
                      <span className="font-semibold">Account Name: </span>
                      {user.name.toUpperCase()}
                    </p>
                    <p className="bg-slate-600 my-1 pt-2 pr-8 pl-2 rounded-lg">
                      <span className="font-semibold">IFSC: </span>
                      {"FDRL00153"}
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default ProfileTab;
