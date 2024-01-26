import Footer from "../components/Footer/Footer";
import InstructorCourse from "../components/Lists/InstructorCourse";
import InstructorSideBar from "../components/Sidebar/InstructorSideBar";

function InstructorCoursePage() {
  return (
    <div className="min-h-screen flex flex-row">
      <InstructorSideBar />
      <div className="w-full ">
        <div className="">
          <InstructorCourse />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default InstructorCoursePage;
