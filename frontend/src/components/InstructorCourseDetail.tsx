import React from "react";

function InstructorCourseDetail() {
  return (
    <div className="">
      <div className="flex justify-end my-2 gap-2">
        <button className="border px-2 p-1 bg-gray-700 hover:bg-gray-800 transition duration-300">
          Discard Changes
        </button>
        <button className="border px-2 p-1 hover:bg-white hover:text-black font-medium transition duration-300">
          Save Changes
        </button>
      </div>
      <div className="flex border  justify-between items-center">
        <div className="border w-full py-2 ">
          <button>Course Details</button>
        </div>
        <div className="border w-full py-2">
          <button>Course Lessons</button>
        </div>
        <div className="border w-full py-2">
          <button>Additional</button>
        </div>
        <div className="border w-full py-2">
          <button>Promotion</button>
        </div>
        <div className="border w-full py-2">
          <button>MCQ</button>
        </div>
        <div className="border w-full py-2">
          <button>Pricing</button>
        </div>
        <div className="border w-full py-2">
          <button>Statistics</button>
        </div>
      </div>
      <div className="border p-5 px-10 mt-6 rounded-lg text-start">
        <div className="">
          <p className="text-xl font-medium mb-2">Course Title</p>
          <input
            type="text"
            className="border bg-transparent pt-2 pb-1 px-2 w-full outline-none"
            placeholder="Insert your course title.."
          />
          <br />
          <p className="text-xs text-gray-400 italic">
            Your title should be a mix of attention-grabbing, informative, and
            optimized.
          </p>
        </div>
        <div className="mt-5">
          <p className="text-xl font-medium mb-2">Course Description</p>
          <textarea
            className="border bg-transparent pt-2 pb-1 px-2 w-full outline-none resize-none"
            placeholder="Insert your course title.."
            rows={5}
          ></textarea>
          <br />
          <p className="text-xs text-gray-400 italic">
            Your title should be a mix of attention-grabbing, informative, and
            optimized.
          </p>
        </div>
        <div className="mt-5">
          <p className="text-xl font-medium mb-2">Basic Info</p>
          <div className="grid grid-cols-2 gap-2">
            <select name="" id="" className="border bg-transparent py-2 px-3">
              <option value="" selected>
                --Select Course Language--
              </option>
              <option value="">--Select Course Language--</option>
              <option value="">--Select Course Language--</option>
            </select>
            <select name="" id="" className="border bg-transparent py-2 px-3">
              <option value="" selected>
                --Select Course Level--
              </option>
              <option value="">--Select Course Language--</option>
              <option value="">--Select Course Language--</option>
            </select>
            <select name="" id="" className="border bg-transparent py-2 px-3">
              <option value="" selected>
                --Select Course Category--
              </option>
              <option value="">--Select Course Language--</option>
              <option value="">--Select Course Language--</option>
            </select>
          </div>
          <p className="text-xs text-gray-400 italic">
            Your title should be a mix of attention-grabbing, informative, and
            optimized.
          </p>
        </div>
        <div className="mt-5 ">
          <p className="text-xl font-medium mb-2">Cover Image</p>
          <div className="border bg-transparent pt-2 pb-1 px-2 w-full outline-none flex justify-between items-center">
            <input id="upload" type="file" />
            <label className="button bg-white text-black px-3 py-1 hover:cursor-pointer" htmlFor="upload">
              Upload File
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorCourseDetail;
