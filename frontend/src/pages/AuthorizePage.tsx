// import React from "react";
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
  return (
    <div className="">
      <h3 className="flex border rounded-3xl px-2 w-max  m-5 bg-white text-slate-950 font-semibold text-xs">
        STEP 1 / 3
      </h3>
      {qa.map((sec) => {
        return (
          <div className="flex justify-center items-center h-full text-start">
            <div className="border p-7 rounded-xl h-min max-w-md">
              <div className="">
                <p className="text-xl font-bold">{sec.title}</p>
                <p className="mt-3 text-xs">{sec.desc}</p>
              </div>
              <div className="mt-4 ">
                <p className="font-semibold">{sec.question}</p>
                <div className="text-sm my-3">
                  {sec.options.map((option) => {
                    return (
                      <div className="border gap-2 flex p-2 items-center my-1">
                        <input
                          type="radio"
                          name="q1"
                          id=""
                          className="h-4 w-4"
                        />
                        <p>{option}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AuthorizePage;
