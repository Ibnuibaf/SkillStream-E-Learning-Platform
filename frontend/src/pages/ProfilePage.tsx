// import React from 'react'
import { useNavigate } from 'react-router-dom';
import BasicHeader from '../components/BasicHeader'
import LogoutSection from '../components/LogoutSection'
import { useEffect } from 'react';
import { toast } from 'react-toastify';

function ProfilePage() {
  const token = localStorage.getItem("SkillStreamToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      toast("Logging to access");
      navigate("/login");
    }
  }, [token]);
  return (
    <div className='h-screen px-10 py-4'>
        <BasicHeader/>
        <LogoutSection/>
    </div>
  )
}

export default ProfilePage