import "./App.css";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CoursesPage from "./pages/CoursesPage";
import ProfilePage from "./pages/ProfilePage";
import InstructorHomePage from "./pages/InstructorHomePage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminStudentPage from "./pages/AdminStudentPage";
import AdminInstructorPage from "./pages/AdminInstructorPage";
function App() {
  return (
    <div className="min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/courses" element={<CoursesPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/instructor" element={<InstructorHomePage/>}/>
          <Route path="/admin" element={<AdminDashboardPage/>}/>
          <Route path="/admin/students" element={<AdminStudentPage/>}/>
          <Route path="/admin/instructors" element={<AdminInstructorPage/>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    
    </div>
  );
}

export default App;
