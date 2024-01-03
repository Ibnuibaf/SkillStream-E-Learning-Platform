import InstructorSideBar from "../components/InstructorSideBar";
import InstructorCommunityList from "../components/InstructorCommunityList";
import Footer from "../components/Footer";

function InstructorCommunitiesPage() {

  return (
    <div className="min-h-screen flex flex-row">
      <InstructorSideBar />
      <div className="w-full ">
        <InstructorCommunityList />
        <Footer/>
      </div>
    </div>
  );
}

export default InstructorCommunitiesPage;
