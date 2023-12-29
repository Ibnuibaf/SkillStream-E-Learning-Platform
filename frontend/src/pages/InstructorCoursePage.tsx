import InstructorCourse from "../components/InstructorCourse";
import InstructorSideBar from "../components/InstructorSideBar";

function InstructorCoursePage() {
  
  return (
    <div className="min-h-screen flex flex-row">
        <InstructorSideBar />
      <div className="w-full max-h-screen overflow-auto p-10 ">
        <InstructorCourse />
      </div>
    </div>
  );
}

export default InstructorCoursePage;
