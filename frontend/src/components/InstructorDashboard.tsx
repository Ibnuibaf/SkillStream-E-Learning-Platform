/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react'
import { FaAddressCard } from "react-icons/fa6";
import { MdPlayLesson } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";
import api from "../axios/api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

function InstructorDashboard() {
  const user = useSelector(selectUser).user;
  const [enrollersCount,setEnrollersCount]=useState(0)
  const [coursesCount,setCoursesCount]=useState(0)
  const [monthlyRevenue,setMonthlyRevenue]=useState<number[]>([])
  const [monthlyEnrollements,setMonthlyEnrollements]=useState<number[]>([])
  const getAnalyseData=async()=>{
    try {
      const res=await api.get('/course/instructor/analyse')
      setEnrollersCount(res.data.enrollers)
      setCoursesCount(res.data.courses)
    } catch (error:any) {
      toast(error?.response?.data?.message)
    }
  }
  const getMonthlyData = async () => {
    try {
      const res = await api.get("/order/instructor/monthly-enrollment");
      // console.log(res.data.monthlyRevenue);
      const monthlyRevenueData = [];
      for (let i = 0; i < 12; i++) {
        let amount = 0;
        const isAvail = res.data.monthlyRevenue.find(
          (monthly: { totalAmount: number; year: number; month: number }) =>
            monthly.month - 1 == i && monthly.year == new Date().getFullYear()
        );
        if (isAvail) {
          amount = isAvail.totalAmount;
        }
        monthlyRevenueData.push(amount);
      }
      console.log(monthlyRevenueData, "Yes its");
      setMonthlyRevenue(monthlyRevenueData);

      const monthlyEnrolles = [];
      for (let i = 0; i < 12; i++) {
        let count = 0;
        const isAvail = res.data.monthlyCount.find(
          (monthly: { totalAmount: number; year: number; month: number }) =>
            monthly.month - 1 == i && monthly.year == new Date().getFullYear()
        );
        if (isAvail) {
          count = isAvail.count;
        }
        monthlyEnrolles.push(count);
      }
      // console.log(monthlyEnrolles, "Yes its");
      setMonthlyEnrollements(monthlyEnrolles);
    } catch (error: any) {
      toast(error?.response?.data?.message);
    }
  };
  useEffect(()=>{
    getAnalyseData()
    getMonthlyData()
  },[])
  const revenueData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Enrollment Amount",
        data: monthlyRevenue,
        backgroundColor: "rgb(125 211 252)",
        borderColor: "rgb(190 24 93)",
        tension: 0.4,
      },
    ],
  };
  const enrollData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Enrollment Count",
        data: monthlyEnrollements,
        backgroundColor: ["rgb(190 24 93)","rgb(126 34 206)"],
        borderColor: "rgb(126 34 206)",
        tension: 0.4,
      },
    ],
  };
  return (
    <div className="p-10 min-h-screen">
      <div className="flex justify-center px-40">
        <div className="flex justify-between  bg-white text-black px-6 py-2 rounded-2xl w-max text-xl font-medium gap-6 shadow-md shadow-purple-400 ">
          <div className="flex items-center gap-6 truncate ">
            <div className="flex items-center gap-1">
              <FaAddressCard size={34} />
              <p>Total Enrollers</p>
            </div>
            <p className="font-bold text-violet-500 underline text-2xl">{enrollersCount}</p>
          </div>
          <div className="flex items-center gap-6 truncate  ">
            <div className="flex items-center gap-1">
              <MdPlayLesson size={34} />
              <p>Total Courses</p>
            </div>
            <p className="font-bold text-violet-500 underline text-2xl">{coursesCount}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 pt-5 h-[60vh]">
        <div className=" border rounded-md">
          <div className="flex items-center border rounded-t-md py-2 px-6 text-lg font-medium text-purple-600 ">
            <p>Revenue Analyse</p>
          </div>
          <div>
            <Line data={revenueData}/>
          </div>
        </div>
        <div className=" border rounded-md">
          <div className="flex items-center border rounded-t-md py-2 px-6 text-lg font-medium text-purple-600 ">
            <p>Enrollement Analyse</p>
          </div>
          <div>
            <Bar data={enrollData}/>
          </div>
        </div>
      </div>
      <div className="mt-5 px-28">
        <p>
          Welcome,{" "}
          <span className="font-medium text-purple-500 text-lg">
            {user?.name} !
          </span>{" "}
          Your dedication to education drives our platform's success. Navigate
          seamlessly through your courses, engage with your students, and watch
          your impact unfold. Thank you for being a vital part of our e-learning
          community.
        </p>
      </div>
    </div>
  );
}

export default InstructorDashboard;
