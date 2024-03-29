/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react'


import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const baseURI = import.meta.env.VITE_PUBLIC_BASE_API;
import io from "socket.io-client";
import { selectUser } from "../../redux/slices/authSlice";
import api from "../../axios/api";
import axios from "axios";
import { FaList, FaPlusCircle } from "react-icons/fa";
import { AppDispatch } from "../../redux/store";
import { getUser } from "../../redux/actions/authActions";
import { MdDelete } from "react-icons/md";

// import { toast } from "react-toastify";

interface Message {
  user: string;
  message: string;
  image: string;
}

function ChatWithStudent() {
  const socket = io(baseURI);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectUser).user;
  const query = new URLSearchParams(window.location.search);
  const studentId = query.get("student");
  const [message, setMessage] = useState("");
  const [studentDetails, setStudentDetails] = useState<any>();
  const [roomId, setRoomId] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom when chat history updates
    chatContainerRef.current?.scrollTo(
      0,
      chatContainerRef.current.scrollHeight
    );
  }, [chatHistory]);

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

  const getPersonalChat = async () => {
    try {
      const res = await api.get(
        `/personal/find?instructor=${user?._id}&student=${studentId}`
      );
      setChatHistory(res.data.personalchat.chats);
      setRoomId(res.data.personalchat._id);
      setStudentDetails(res.data.personalchat.student);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!query.size || !studentId) {
      navigate("/instructor");
    } else {
      dispatch(getUser());
      getPersonalChat();
      socket.emit("join", { student: studentId, instructor: user?._id });
      socket.off("receive_personal_message");
      socket.on("receive_personal_message", (data: any) => {
        setChatHistory((prevChatHistory) => [...prevChatHistory, data]);
      });
    }
  }, []);

  // useEffect(() => {
  //   if (!query.size || !studentId) {
  //     navigate("/instructor");
  //   } else {
  //     const getPersonalChat = async () => {
  //       try {
  //         const res = await api.get(`/personal/find?student=${studentId}`);
  //         setChatHistory(res.data.personalchat.chats);
  //         setStudentDetails(res.data.personalchat.student);
  //         setRoomId(res.data.personalchat._id);
  //         console.log(roomId);
  //         console.log(chatHistory);

  //         socket.emit("join", roomId);
  //         socket.off("receive_personal_message");
  //         socket.on("receive_personal_message", (data: any) => {
  //           setChatHistory((prevChatHistory) => [...prevChatHistory, data]);
  //         });
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  //     getPersonalChat();

  //   }
  //   return () => {
  //     // Clean up socket event listeners when component unmounts
  //     socket.off("receive_personal_message");
  //     socket.emit("leave", roomId);
  //   };
  // }, [studentId]);

  return (
    <div className="text-start ">
      <div className="bg-purple-700 px-4 text-center flex gap-2 justify-center items-center">
        <button className="border bg-gray-500 rounded-md px-2 py-1 absolute start-2 flex items-center gap-1 hover:bg-violet-700" onClick={()=>navigate("/instructor/chats")}>
          <FaList />
          <span>Chats</span>
        </button>
        {studentDetails ? (
          <>
            <img src={studentDetails.avatar} alt="" className="h-12 w-12" />
            <p className="text-3xl px-4 py-2 font-bold">
              {studentDetails.name}
            </p>
          </>
        ) : (
          <p className="text-3xl px-4 py-2 font-bold">CHAT</p>
        )}
      </div>
      <div className="flex flex-col justify-between h-screen">
        <div
          className="px-4 py-5  overflow-y-scroll mb-20"
          ref={chatContainerRef}
        >
          {chatHistory.map((chat, index) =>
            chat.user == user?._id ? (
              <div key={index} className="px-3 py-2  flex justify-end">
                <div className="">
                  {/* <p className="text-xs text-gray-300">{chat.user}</p> */}
                  <div className="bg-purple-950 w-max pl-4 pr-2 py-1 rounded-l-lg rounded-b-lg">
                    {chat.image && (
                      <div className="h-72 max-w-[75vw]">
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
                      <div className="h-72 max-w-[75vw]">
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
      </div>
      <div className="bg-purple-900  absolute w-full bottom-0">
        {image && (
          <div className="flex justify-between items-center bg-gray-800 px-4 py-1">
            <p className="">{image?.name}</p>
            <MdDelete
              className="text-pink-800 cursor-pointer hover:text-pink-600"
              size={24}
              onClick={() => setImage(null)}
            ></MdDelete>
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
  );
}

export default ChatWithStudent;
