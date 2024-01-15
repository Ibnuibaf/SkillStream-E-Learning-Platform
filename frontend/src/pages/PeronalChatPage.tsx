import  { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import BasicHeader from '../components/BasicHeader';
import ChatWithInstructor from '../components/ChatWithInstructor';

function PeronalChatPage() {
    const token = localStorage.getItem("SkillStreamToken");
    const navigate = useNavigate();
    useEffect(() => {
      if (!token) {
        navigate("/");
      }
    }, [token]);
    return (
      <div className="h-screen overflow-hidden">
        <div className="">
          <BasicHeader />
        </div>
        <div >
          <ChatWithInstructor />
        </div>
      </div>
    );
}

export default PeronalChatPage