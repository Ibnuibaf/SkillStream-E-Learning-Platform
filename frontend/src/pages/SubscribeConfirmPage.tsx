import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../axios/api';
import axios from 'axios';
import { toast } from 'react-toastify';

function SubscribeConfirmPage() {
    const token = localStorage.getItem("SkillStreamToken");
  const navigate = useNavigate();

  const createSubscribe = async (subscribe: {
    student: string | null;
    instructor: string | null;
  }) => {
    try {
      await api.post("/personal/create", subscribe);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error?.response?.data?.message);
      } else {
        toast("An unexpected error occurred");
      }
    }
  };
  let student: string | null;
  let instructor: string | null;
  const query = new URLSearchParams(window.location.search);
  if (!query) {
    navigate("/");
  }
  if (query.get("success")) {
    student = query.get("student");
    instructor = query.get("instructor");
    toast("Subscribed to Instructor, Great JOB!");
  }

  if (query.get("canceled")) {
    toast("Course purchase canceled, Try Later!");
  }
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    if (!query) {
      navigate("/");
    }
  }, [token, navigate,query]);
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border px-4 py-1">
        <p className="font-bold text-xl text-green-600 text-start">
          Subscription SuccessFull
        </p>
        <p className="font-medium text-md">
          Siubscribed to your Instructor successfully, check MyLearning!
        </p>
        <div className="my-5">
          <button
            onClick={async () => {
              await createSubscribe({ student,instructor });
              navigate("/");
            }}
            className="border-2 rounded-lg px-2 py-1 "
          >
            Save & Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default SubscribeConfirmPage