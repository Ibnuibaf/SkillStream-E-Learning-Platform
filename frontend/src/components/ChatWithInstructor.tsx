// import React from 'react'

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { selectUser } from "../redux/slices/authSlice";
import api from "../axios/api";
import axios from "axios";
import { FaPlusCircle } from "react-icons/fa";

interface Message {
  user: string;
  message: string;
  image: string;
}

function ChatWithInstructor() {
  const socket = io("http://localhost:3000");
  const navigate = useNavigate();
  // const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectUser).user;
  // const courses = useSelector(selectcourses).courses;
  const query = new URLSearchParams(window.location.search);
  //   console.log(query);
  const instructorId = query.get("instructor");
  const [message, setMessage] = useState("");
  const [instructorDetails, setInstructorDetails] = useState({
    _id: "",
    name: "",
    avatar: "",
  });
  const [roomId, setRoomId] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);

  const getPersonalChat = async () => {
    try {
      const res = await api.get(
        `/personal/find?instructor=${instructorId}`
      );
      setChatHistory(res.data.personalchat.chats);
      setRoomId(res.data.personalchat._id);
      console.log(roomId);
      console.log(chatHistory);
    } catch (error) {
      console.error(error);
    }
  };

  const getInstructorDetails = async () => {
    try {
      const res = await api.get(`/user/instructors?id=${instructorId}`);
      setInstructorDetails(res.data.instructors);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!query.size || !instructorId) {
      navigate("/mylearning");
    } else {
      getPersonalChat();

      // const isPurchased = user?.learnings.find(
      //   (learn) => learn.course == courseId
      // );
      // if (isPurchased || isInstructor) {
      getInstructorDetails();
      // if (roomId) {
        socket.emit("join", roomId);
        socket.off("receive_personal_message");
        socket.off("receive_personal_message");
        socket.on("receive_personal_message", (data) => {
          setChatHistory((prevChatHistory) => [...prevChatHistory, data]);
        });
      // }
      // } else {
      //   navigate("/mylearning");
      // }
    }
  }, []);

  const sendMessage = async () => {
    try {
      if (message || image) {
        let uploadedImage = "";
        if (image) {
          setLoading(true);
          const data = new FormData();
          data.append("file", image);
          data.append("upload_preset", "image_preset");
          const cloudName = "dshijvj8y";

          const url = `https://api.cloudinary.com/v1_1/${cloudName}/${"image"}/upload`;
          const res = await axios.post(url, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          // console.log(res);
          const { secure_url } = res.data;
          uploadedImage = secure_url;
          setImage(null);
          setLoading(false);
        }
        socket.emit("send_personal_message", {
          roomId,
          user: user?._id,
          message,
          image: uploadedImage,
        });
        setMessage("");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  return (
    <div className="text-start ">
      <div className="bg-purple-700 px-4 text-center flex gap-2 justify-center">
        <img src={instructorDetails.avatar} alt="" className="h-12 w-12" />
        <p className="text-3xl px-4 py-2 font-bold">{instructorDetails.name}</p>
      </div>
      <div className=" flex flex-col justify-between">
        <div className="px-4 py-5 h-[74vh] overflow-y-auto">
          {chatHistory.map((chat, index) =>
            chat.user == user?._id ? (
              <div key={index} className="px-3 py-2  flex justify-end">
                <div className="">
                  {/* <p className="text-xs text-gray-300">{chat.user}</p> */}
                  <div className="bg-purple-950 w-max pl-4 pr-2 py-1 rounded-l-lg rounded-b-lg">
                    {chat.image && (
                      <div className="h-72 w-80">
                        <img
                          src={chat.image}
                          alt=""
                          className="h-full w-full rounded-md"
                        />
                      </div>
                    )}
                    <p>{chat.message}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div key={index} className="px-3 py-2">
                <div>
                  {/* <p className="text-xs text-gray-300">{chat.user}</p> */}
                  <div className="bg-purple-950 w-max pl-4 pr-2 py-1 rounded-r-lg rounded-b-lg">
                    {chat.image && (
                      <div className="h-72">
                        <img
                          src={chat.image}
                          alt=""
                          className="h-full w-full rounded-md"
                        />
                      </div>
                    )}
                    <p>{chat.message}</p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        <div className="bg-purple-900 ">
          {image && (
            <div className="bg-gray-800 px-4 py-1">
              <p className="">{image?.name}</p>
            </div>
          )}
          <div className="flex px-4 items-center gap-2 pr-10">
            <input
              type="text"
              className="py-3 bg-transparent w-full outline-none"
              value={message}
              placeholder="Send Your Message and quries"
              onChange={(e) => setMessage(e.target.value)}
            />
            <label htmlFor="image" title="Send Image">
              <input
                type="file"
                name="image"
                accept="image/*"
                id="image"
                className="hidden "
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
              />
              <FaPlusCircle size={24} className="cursor-pointer" />
            </label>
            <button
              className="bg-violet-600 px-4 py-1 rounded "
              onClick={sendMessage}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatWithInstructor;
