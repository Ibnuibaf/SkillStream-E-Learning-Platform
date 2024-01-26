
import Footer from '../components/Footer/Footer';
import InstructorSideBar from '../components/Sidebar/InstructorSideBar'
import StudentsList from '../components/Chat&Community/StudentsList'

function InstructorStudentsList() {
    
    return (
      <div className="min-h-screen flex flex-row">
          <InstructorSideBar />
        <div className="w-full">
          <StudentsList />
          <Footer/>
        </div>
      </div>
    );
}

export default InstructorStudentsList