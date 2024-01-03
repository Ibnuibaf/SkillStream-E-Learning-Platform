/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";
// import ChatWithStudent from "./ChatWithStudent";
// import { LuMoveLeft } from "react-icons/lu";

function StudentsList() {
  const user = useSelector(selectUser).user;
  const navigate = useNavigate();
  const [personalChats, setPersonalChats] = useState<any>([]);
  const getPersonalChats = async () => {
    try {
      const res = await api.get(`/personal/instructor?id=${user?._id}`);
      setPersonalChats(res.data.personalchats);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getPersonalChats();
  }, []);
  return (
   
        <div className="p-10 min-h-screen">
          <div className="text-2xl font-semibold my-3">
            <p>My Chats</p>
          </div>
          <div className=" max-h-[60vh] overflow-y-auto overflow-x-hidden grid grid-cols-7 gap-4">
            {personalChats?.map((personalChat: any) => (
              <div className="flex flex-col items-center justify-between gap-4 bg-purple-500 rounded-3xl mb-2 px-4 py-5 h-[25vh]  text-start ">
                <div className="flex flex-col  items-center">
                  <div className="h-16 w-16 rounded-full">
                    <img
                      src={personalChat.student.avatar}
                      alt=""
                      className="h-full w-full rounded-full"
                    />
                  </div>
                  <p className="text-xl mt-5">{personalChat.student.name}</p>
                </div>
                <div className="flex flex-col w-full">
                  <button
                    type="button"
                    onClick={() => navigate(`/instructor/personal/chat?student=${personalChat.student._id}`)}
                    className="bg-white text-purple-500 px-4 py-1 rounded-3xl hover:bg-purple-800 hover:text-white cursor-pointer"
                  >
                    Chat
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
    
  );
}

export default StudentsList;
