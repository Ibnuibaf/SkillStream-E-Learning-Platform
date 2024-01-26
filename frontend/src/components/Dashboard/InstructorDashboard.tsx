/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react'
import { FaAddressCard } from "react-icons/fa6";
import { MdPlayLesson } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/authSlice";
import api from "../../axios/api";
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
    <div className="p-5 sm:p-10 lg:p-16 xl:p-20 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between px-4 lg:px-10 xl:px-20">
        <div className="mb-6 sm:mb-0">
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <FaAddressCard size={34} />
              <p>Total Enrollers</p>
            </div>
            <p className="font-bold text-violet-500 bg-slate-800 px-2 rounded-md text-2xl">
              {enrollersCount}
            </p>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <MdPlayLesson size={34} />
              <p>Total Courses</p>
            </div>
            <p className="font-bold text-violet-500 bg-slate-800 px-2 rounded-md text-2xl">
              {coursesCount}
            </p>
          </div>
        </div>
      </div>

      <div className="lg:px-10 xl:px-26 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-2">
            <p className="text-xl font-medium py-2">Revenue Analyse</p>
            <div className="border p-2 md:min-h-[50vh]">
              <Line data={revenueData} />
            </div>
          </div>

          <div className="p-2">
            <p className="text-xl font-medium py-2">Enrollement Analyse</p>
            <div className="border p-2 md:min-h-[50vh]">
              <Bar data={enrollData} />
            </div>
          </div>
        </div>

        <div className="pt-5 text-lg px-4 md:px-0 line-clamp-5">
          <p>
            Welcome,{" "}
            <span className="font-medium text-purple-500 text-lg">
              {user?.name}!
            </span>{" "}
            Your dedication to education drives our platform's success. Navigate
            seamlessly through your courses, engage with your students, and
            watch your impact unfold. Thank you for being a vital part of our
            e-learning community.
          </p>
        </div>
      </div>
    </div>
  );
}

export default InstructorDashboard;
