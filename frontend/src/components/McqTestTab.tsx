/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import swal from "sweetalert";
import api from "../axios/api";
import { toast } from "react-toastify";

interface ILesson {
  _id?: string;
  title: string;
  content: string;
  duration: number | string;
}
interface IMCQ {
  question: string;
  options: string[];
  answer: number;
}
interface ICourse {
  _id: string;
  title: string;
  description: string;
  language: string;
  level: string;
  category: { name: string; _id: string } | string;
  instructor: { name: string; _id?: string } | string;
  cover: string;
  lessons: ILesson[];
  mcq: IMCQ[];
  announcements: string[];
  coupons?: string[];
  price: number;
  offer: number;
  isApproved: boolean;
  isBlock: boolean;
}
interface ILearnings {
    _id:string
  course: ICourse;
  progress: string[];
  certificate:boolean
}
function McqTestTab({ learning }: { learning: ILearnings }) {
  const [mcqDetails, setMcqDetails] = useState(learning.course.mcq[0]);
  const [selectedMCQ, setSelectedMCQ] = useState<number>(0);
  const [isSubmited, setIsSubmited] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<boolean[]>([]);
  const setNewAnswersArr = (e: number) => {
    setAnswers((prevAnswers) => {
      const newAnswerArray = [...prevAnswers];
      newAnswerArray[selectedMCQ] = e;
      return newAnswerArray;
    });

    setMcqDetails(learning.course.mcq[selectedMCQ]);
  };
  const checkTest = async () => {
    const confirmed = await swal("Are you sure to Proceed Payment?", {
      buttons: ["Cancel", true],
    });
    if (confirmed) {
      const resu = learning.course.mcq.map((mc, index) =>
        mc.answer == answers[index] ? true : false
      );
      console.log(result);
      setResult(resu);
      setIsSubmited(true);
    }
  };
  const submitTest = async () => {
    try {
      if (
        Math.floor(
          result.filter((res) => res == true).length /
            learning.course.mcq.length
        ) < 0.7
      ) {
        return toast("Sorry, you have no pass mark");
      }
      await api.patch("/user/learning/certify",{learning:learning._id});
      toast("Congratulations! New Certificate Achieved")
      location.href='/mylearning'
    } catch (error: any) {
      toast(error?.response?.data?.message);
    }
  };
  return (
    <>
      {isSubmited && (
        <div className="border px-10 flex justify-between py-2 my-2">
          <p>
            Result:{" "}
            {`${result.filter((res) => res == true).length}/${
              learning.course.mcq.length
            }`}
          </p>
          <p>
            Status:{" "}
            <span
              className={`${
                Math.floor(
                  result.filter((res) => res == true).length /
                    learning.course.mcq.length
                ) > 0.6
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {`${
                Math.floor(
                  result.filter((res) => res == true).length /
                    learning.course.mcq.length
                ) > 0.6
                  ? "Completed"
                  : "Not Completed"
              }`}
            </span>
          </p>
        </div>
      )}
      <div className="border flex rounded-md">
        <div className="border max-w-[20vw] rounded-l-md">
          <div className="p-1 bg-purple-950 border-b">
            <p className="text-xl font-medium px-4 ">Questions</p>
          </div>
          <div className="w-[20vw] h-[70vh] px-4 py-2 overflow-y-auto">
            {learning.course.mcq.map((mc, index) => (
              <div
                className={`flex bg-purple-700 px-4 py-1 rounded-md gap-2 cursor-pointer items-center mb-2 ${
                  selectedMCQ == index && "bg-pink-600"
                }`}
                onClick={() => {
                  setMcqDetails(mc);
                  setSelectedMCQ(index);
                }}
              >
                {result[index] == true ? (
                  <TiTick className="text-green-500" size={25} />
                ) : result[index] == false ? (
                  <RxCross2 className="text-red-500 " size={25} />
                ) : (
                  ""
                )}
                <p>{index + 1}.</p>
                <p className="truncate">{mc.question}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full text-start px-10 py-5">
          <div className="h-full flex flex-col justify-between  w-full">
            <div>
              <div className="flex justify-end">
                {isSubmited ? (
                  <>
                    {Math.floor(
                      result.filter((res) => res == true).length /
                        learning.course.mcq.length
                    ) > 0.6?(

                    <button
                      className="bg-pink-700 px-6 py-1 rounded-md hover:bg-pink-500"
                      onClick={submitTest}
                    >
                      Submit
                    </button>
                    ):(
                        <button
                      className="bg-pink-700 px-6 py-1 rounded-md hover:bg-pink-500"
                      onClick={()=>{
                        setIsSubmited(false)
                        setResult([])
                      }}
                    >
                      ReTest
                    </button>
                    )}
                  </>
                ) : (
                  <button
                    className="bg-pink-700 px-6 py-1 rounded-md hover:bg-pink-500"
                    onClick={checkTest}
                  >
                    Test
                  </button>
                )}
              </div>
              <div className="flex items-end gap-3">
                <p className="text-2xl">Question:</p>
                <p className="text-3xl font-medium">{mcqDetails.question} ?</p>
              </div>
              <div className="text-center my-5">
                <p className="font-medium text-violet-300">
                  Great job on completing the test! You're one step closer to
                  earning your certificate. Finish strong, submit your answers,
                  and head to the 'Certificate' section on SkillStream to claim
                  your well-earned recognition!
                </p>
              </div>
              <div className=" my-3 text-lg">
                {mcqDetails.options.map((option, index) => (
                  <div
                    className={`border gap-2 flex p-2 items-center my-1 cursor-pointer ${
                      answers[selectedMCQ] == index &&
                      "border-pink-600 border-2"
                    }`}
                    key={index}
                    onClick={() => setNewAnswersArr(index)}
                  >
                    <p className="flex items-center gap-2">
                      <FaArrowAltCircleRight />
                      {option}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <button
                className="hover:bg-purple-950 px-6 py-1 transition duration-300"
                disabled={selectedMCQ == 0}
                onClick={() => {
                  setSelectedMCQ(selectedMCQ - 1);
                  setMcqDetails(learning.course.mcq[selectedMCQ - 1]);
                }}
              >
                Back
              </button>
              <button
                className="hover:bg-purple-950 px-6 py-1 transition duration-300"
                disabled={selectedMCQ == learning.course.mcq.length - 1}
                onClick={() => {
                  setSelectedMCQ(selectedMCQ + 1);
                  setMcqDetails(learning.course.mcq[selectedMCQ + 1]);
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default McqTestTab;
