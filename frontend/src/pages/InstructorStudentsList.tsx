
import Footer from '../components/Footer';
import InstructorSideBar from '../components/InstructorSideBar'
import StudentsList from '../components/StudentsList'

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