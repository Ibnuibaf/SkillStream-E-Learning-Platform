import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
const baseURI= import.meta.env.VITE_PUBLIC_BASE_API
import io from "socket.io-client";
import { selectUser } from "../redux/slices/authSlice";
import api from "../axios/api";
import { toast } from "react-toastify";
import axios from "axios";
import { FaPlusCircle } from "react-icons/fa";
import { AppDispatch } from "../redux/store";
import { getCourses } from "../redux/actions/coursesActions";
import { selectcourses } from "../redux/slices/coursesSlice";

interface Message {
  user: string;
  message: string;
  image: string;
}

function CommunityChat() {
  const socket = io(baseURI);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectUser).user;
  const courses = useSelector(selectcourses).courses;
  const query = new URLSearchParams(window.location.search);
  //   console.log(query);
  const courseId = query.get("courseid");
  const [message, setMessage] = useState("");
  const [communityName, setCommunityName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);

  const getCommunity = async () => {
    try {
      const res = await api.get(`/community/find?course=${courseId}`);
      setChatHistory(res.data.community.chats);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error?.response?.data?.message);
      } else {
        toast("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    if (!query.size || !courseId) {
      navigate("/mylearning");
    } else {
      getCommunity();
      const isInstructor=user?.role=="instructor"
      const isPurchased = user?.learnings.find(
        (learn) => learn.course == courseId
      );
      if (isPurchased || isInstructor) {
        dispatch(getCourses({ search: "", isInstructor: false }));
        const courseDeatils = courses.find((course) => course._id == courseId);
        setCommunityName(courseDeatils?.title as string);
        socket.emit("join", courseId);
        socket.off("receive_message");
        socket.off("receive_message");
        socket.on("receive_message", (data) => {
          setChatHistory((prevChatHistory) => [...prevChatHistory, data]);
        });
      } else {
        if(user?.role=="student"){
          navigate("/mylearning");

        }else{
          navigate("/instructor")
        }
      }
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
        socket.emit("send_message", {
          roomId: courseId,
          user: user?.name,
          message,
          image: uploadedImage,
        });
        setMessage("");
      }
    } catch (error: unknown) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        toast(error?.response?.data?.message);
      } else {
        toast("An unexpected error occurred");
      }
    }
  };
  return (
    <div className="text-start ">
      <div className="bg-purple-700 px-4 text-center">
        <p className="text-3xl px-4 py-2 font-bold">
          {communityName} Community
        </p>
      </div>
      <div className=" flex flex-col justify-between">
        <div className="px-4 py-5 h-[74vh] overflow-y-auto">
          {chatHistory.map((chat, index) =>
            chat.user == user?.name ? (
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
                  <p className="text-xs text-gray-300">{chat.user}</p>
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

export default CommunityChat;
