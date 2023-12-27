// import React from 'react'
import { useNavigate } from 'react-router-dom';
import BasicHeader from '../components/BasicHeader'
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import ProfileTab from '../components/ProfileTab';

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
    <div className=' px-10 py-4'>
        <BasicHeader/>
        <ProfileTab/>
    </div>
  )
}

export default ProfilePage