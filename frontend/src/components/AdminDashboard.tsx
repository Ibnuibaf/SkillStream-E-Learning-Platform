/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react'


import { useEffect, useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { MdPlayLesson } from "react-icons/md";
import api from "../axios/api";
import { toast } from "react-toastify";
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
interface ITopCourse {
  title: string;
  _id: string;
  instructor: { _id: string; name: string };
  enrollers: string[];
}
ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);
function AdminDashboard() {
  const [topCourse, setTopCourse] = useState<ITopCourse>();
  const [monthlyEnrollements, setMonthlyEnrollements] = useState<number[]>([]);
  const [monthlyEnrollementsCount, setMonthlyEnrollementsCount] = useState<number[]>([]);
  const getTopCourse = async () => {
    try {
      const res = await api.get("/course/top");
      setTopCourse(res.data.topCourse);
    } catch (error: any) {
      toast(error?.response?.data?.message);
    }
  };
  const getMonthlyEnrollmentData = async () => {
    try {
      const res = await api.get("/order/monthly-enrollment");
      // console.log(res.data.monthlyData);
      const monthlyEnrollData = [];
      for (let i = 0; i < 12; i++) {
        let amount = 0;
        const isAvail = res.data.monthlyData.find(
          (monthly: { totalAmount: number; year: number; month: number }) =>
            monthly.month - 1 == i && monthly.year == new Date().getFullYear()
        );
        if (isAvail) {
          amount = isAvail.totalAmount;
        }
        monthlyEnrollData.push(amount);
      }
      console.log(monthlyEnrollData, "Yes its");
      setMonthlyEnrollements(monthlyEnrollData);

      const monthlyEnrollCount = [];
      for (let i = 0; i < 12; i++) {
        let count = 0;
        const isAvail = res.data.monthlyCount.find(
          (monthly: { totalAmount: number; year: number; month: number }) =>
            monthly.month - 1 == i && monthly.year == new Date().getFullYear()
        );
        if (isAvail) {
          count = isAvail.count;
        }
        monthlyEnrollCount.push(count);
      }
      console.log(monthlyEnrollCount, "Yes its");
      setMonthlyEnrollementsCount(monthlyEnrollCount);
    } catch (error: any) {
      toast(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    getTopCourse();
    getMonthlyEnrollmentData();
  }, []);
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
        label: "Monthly Enrollment Amount",
        data: monthlyEnrollements,
        backgroundColor: "rgb(125 211 252)",
        borderColor: "rgb(190 24 93)",
        tension: 0.4,
      },
    ],
  };
  const countData = {
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
        data: monthlyEnrollementsCount,
        backgroundColor: ["rgb(190 24 93)","rgb(126 34 206)"],
        borderColor: "rgb(126 34 206)",
        tension: 0.4,
      },
    ],
  };
  return (
    <div className="p-5 sm:p-10 lg:p-16 xl:p-20 min-h-screen pt-24">
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between px-4 lg:px-10 xl:px-20">
        <div className="mb-6 sm:mb-0">
          {/* #1 Instructor section */}
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <FaUserGraduate size={34} />
              <p>#1 Instructor</p>
            </div>
            <p className="font-bold text-violet-500 underline text-2xl truncate">
              {topCourse?.instructor.name}
            </p>
          </div>
        </div>

        <div>
          {/* #1 Course section */}
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <MdPlayLesson size={34} />
              <p>#1 Course</p>
            </div>
            <p className="font-bold text-violet-500 underline text-2xl truncate">
              {topCourse?.title}
            </p>
          </div>
        </div>
      </div>

      <div className=" lg:px-10 xl:px-26 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Enrollement Revenue Graph */}
          <div className="p-2">
            <p className="text-xl font-medium py-2">Enrollment Revenue Graph</p>
            <div className="border p-2 sm:min-h-[50vh] lg:min-h-[35vh]">
              <Line data={enrollData} />
            </div>
          </div>

          {/* Enrollment Count Graph */}
          <div className="p-2">
            <p className="text-xl font-medium py-2">Enrollment Count Graph</p>
            <div className="border p-2 sm:min-h-[50vh] lg:min-h-[35vh]">
              <Bar data={countData} />
            </div>
          </div>
        </div>

        <div className="pt-5 text-lg px-4 md:px-0 line-clamp-5">
          {/* Description */}
          <p>
            Empower your educational realm with our admin dashboard—your gateway
            to insightful metrics and impactful decisions. Seamlessly manage
            courses, track user engagement, and shape the learning landscape
            effortlessly. Your every click fuels a dynamic educational journey,
            making you the catalyst for knowledge evolution.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
