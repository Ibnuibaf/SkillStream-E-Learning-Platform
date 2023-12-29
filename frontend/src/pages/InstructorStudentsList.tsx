
import InstructorSideBar from '../components/InstructorSideBar'
import StudentsList from '../components/StudentsList'

function InstructorStudentsList() {
    
    return (
      <div className="min-h-screen flex flex-row">
          <InstructorSideBar />
        <div className="w-full max-h-screen overflow-auto  ">
          <StudentsList />
        </div>
      </div>
    );
}

export default InstructorStudentsList