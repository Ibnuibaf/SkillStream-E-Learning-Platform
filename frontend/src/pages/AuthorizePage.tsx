import axios from "axios";
import  {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectUser } from "../redux/slices/authSlice";
import { getUser } from "../redux/actions/authActions";
import { AppDispatch } from "../redux/store";
const qa = [
  {
    title: "Share Your Knowledge",
    desc: "SkillStream courses are video-based experience that give students the chance to learn actioanble skills. Whether you have experience teaching, or its your first time, we'll help you package your knowledge into an online course that improves student lives.",
    question: "What kind of teaching have you done before?",
    options: [
      "In person, informally",
      "In person, professionally",
      "Online",
      "Other",
    ],
  },
  {
    title: "Create a Course",
    desc: " Over the years we have helped thousands of instructors learn how to record at home. No matter your experience level, you can become a video pro too. We'll equip you with the latest resources, tips, and support to help you succeed.",
    question: "How much of video “pro” are you?",
    options: [
      "I'm a beginner.",
      "i have some knowledge.",
      "I'm experienced.",
      "i have video ready to upload.",
    ],
  },
  {
    title: "Expand your reach. ",
    desc: "Once you publish your course, you can grow your student audience and make an impact with support of SkillStream marketplace promotions and also through you own marketing efforts. Together, we'll help the right students discover your course.",
    question: "Do you have an audience to share your course with?",
    options: [
      "Not at the moment.",
      "I have a small following",
      "I have a sizeable following",
      "I don't need in my potential.",
    ],
  },
];
function AuthorizePage() {
  const [step, setStep] = useState(0);
  const user = useSelector(selectUser).user;
  const dispatch:AppDispatch = useDispatch();
  const [Authorization, setAuthorization] = useState<{ [key: string]: string }>(
    {
      "0": "",
      "1": "",
      "2": "",
    }
  );
  const token = localStorage.getItem("SkillStreamToken");
  const proceedInstructor = async () => {
    if (!Authorization["0"] || !Authorization["1"] || !Authorization["2"]) {
      return;
    }
    try {
      console.log("Hello are you there");

      const res = await axios.post(
        "http://localhost:3000/api/user/authorize",
        { updates: Authorization, id: user?._id },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (!res.data.user) {
        toast(res.data.message);
      }
      dispatch(getUser());
      toast(`${res.data.user.name} is now Instructor`);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error?.response?.data?.message);
      } else {
        toast("An unexpected error occurred");
      }
    }
  };
  return (
    <div className="h-screen">
      <h3 className="flex border rounded-3xl px-2 w-max  m-5 bg-white text-slate-950 font-semibold text-sm">
        STEP {step + 1} / 3
      </h3>
      <div className="section flex justify-center items-center h-[85%] text-start">
        <div className="border p-7 rounded-xl h-min max-w-lg">
          <div className="">
            <p className="text-2xl font-bold">{qa[step].title}</p>
            <p className="mt-3 text-sm">{qa[step].desc}</p>
          </div>
          <div className="mt-4">
            <p className="font-semibold text-xl">{qa[step].question}</p>
            <div className="text-md my-3">
              {qa[step].options.map((option, index) => (
                <div
                  className="border gap-2 flex p-2 items-center my-1"
                  key={option}
                >
                  <input
                    type="radio"
                    name={`question_${step}`}
                    className="h-4 w-4"
                    value={option}
                    checked={Authorization[`${step}`] === option}
                    onChange={(e) =>
                      setAuthorization({
                        ...Authorization,
                        [`${step}`]: e.target.value,
                      })
                    }
                  />
                  <label htmlFor={`question_${step}_option_${index}`}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-custom-500 py-4 flex justify-between px-10">
        <button
          className="border rounded-md h-min py-1 px-3 font-semibold duration-300 hover:bg-white hover:text-slate-950"
          disabled={step === 0}
          onClick={() => setStep((prevStep) => prevStep - 1)}
        >
          Prev
        </button>
        {step == 2 ? (
          <button
            className="bg-white border text-slate-950 rounded-md h-min py-1 font-semibold px-3 duration-300 hover:bg-transparent hover:text-white"
            type="button"
            onClick={() => {
              proceedInstructor();
            }}
          >
            Proceed
          </button>
        ) : (
          <button
            className="bg-white border text-slate-950 rounded-md h-min py-1 font-semibold px-3 duration-300 hover:bg-transparent hover:text-white"
            disabled={step === 2}
            onClick={() => setStep((prevStep) => prevStep + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default AuthorizePage;
