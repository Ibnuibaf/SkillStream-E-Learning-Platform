import Footer from "../components/Footer";
import InstructorCourse from "../components/InstructorCourse";
import InstructorSideBar from "../components/InstructorSideBar";

function InstructorCoursePage() {
  
  return (
    <div className="min-h-screen flex flex-row">
        <InstructorSideBar />
      <div className="w-full ">
        <InstructorCourse />
        <Footer/>
      </div>
    </div>
  );
}

export default InstructorCoursePage;
