import InstructorSideBar from "../components/InstructorSideBar";
import InstructorCommunityList from "../components/InstructorCommunityList";

function InstructorCommunitiesPage() {

  return (
    <div className="min-h-screen flex flex-row">
      <InstructorSideBar />
      <div className="w-full max-h-screen overflow-auto p-10 ">
        <InstructorCommunityList />
      </div>
    </div>
  );
}

export default InstructorCommunitiesPage;
