import "./App.css";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CoursesPage from "./pages/CoursesPage";
import ProfilePage from "./pages/ProfilePage";
import InstructorHomePage from "./pages/InstructorHomePage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminStudentPage from "./pages/AdminStudentPage";
import AdminInstructorPage from "./pages/AdminInstructorPage";
import ForgotPage from "./pages/ForgotPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";
import { getUser } from "./redux/actions/authActions";
import AdminCategoryPage from "./pages/AdminCategoryPage";
import InstructorCoursePage from "./pages/InstructorCoursePage";
import AdminCoursePage from "./pages/AdminCoursePage";
import PurchaseConfirmPage from "./pages/PurchaseConfirmPage";
import MyLearningPage from "./pages/MyLearningPage";
import CommunityPage from "./pages/CommunityPage";
import {GoogleOAuthProvider} from "@react-oauth/google"
import InstructorCommunitiesPage from "./pages/InstructorCommunitiesPage";
import PersonalChatPage from "./pages/PeronalChatPage"
import InstructorStudentsList from "./pages/InstructorStudentsList";
import InstructorChatPage from "./pages/InstructorChatPage";
function App() {
  const dispatch:AppDispatch=useDispatch()
  const token = localStorage.getItem("SkillStreamToken");
  useEffect(() => {

    const fetchData = async () => {
      try {
        await dispatch(getUser());
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast("Error fetching user data");
      }
    };
    if(token){
      fetchData();
    }
  }, [dispatch,token]);
  return (
    <div className="min-h-screen">
      <BrowserRouter>
      <GoogleOAuthProvider clientId="596357550935-jhld1mlmi7hjda08ret8ju85lt7rftnm.apps.googleusercontent.com">
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/forgot" element={<ForgotPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/courses" element={<CoursesPage/>}/>
          <Route path="/mylearning" element={<MyLearningPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/personal/chat" element={<PersonalChatPage />}/>
          <Route path="/instructor" element={<InstructorHomePage/>}/>
          <Route path="/instructor/courses" element={<InstructorCoursePage/>}/>
          <Route path="/instructor/chats" element={<InstructorStudentsList/>}/>
          <Route path="/instructor/personal/chat" element={<InstructorChatPage/>}/>
          <Route path="/instructor/communities" element={<InstructorCommunitiesPage/>}/>
          <Route path="/admin" element={<AdminDashboardPage/>}/>
          <Route path="/admin/students" element={<AdminStudentPage/>}/>
          <Route path="/admin/instructors" element={<AdminInstructorPage/>}/>
          <Route path="/admin/categories" element={<AdminCategoryPage/>}/>
          <Route path="/admin/courses" element={<AdminCoursePage/>}/>
          <Route path="/purchase" element={<PurchaseConfirmPage/>}/>
          <Route path="/community" element={<CommunityPage/>}/>
        </Routes>
      </GoogleOAuthProvider>
      </BrowserRouter>
      <ToastContainer/>
    
    </div>
  );
}

export default App;
