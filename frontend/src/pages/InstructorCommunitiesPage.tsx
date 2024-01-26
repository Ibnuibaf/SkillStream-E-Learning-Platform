import InstructorSideBar from "../components/Sidebar/InstructorSideBar";
import InstructorCommunityList from "../components/Chat&Community/InstructorCommunityList";
import Footer from "../components/Footer/Footer";

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
