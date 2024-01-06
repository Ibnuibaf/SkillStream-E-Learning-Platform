import { Suspense, lazy, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";
import { getUser } from "./redux/actions/authActions";
import { GoogleOAuthProvider } from "@react-oauth/google";
const LandingPage = lazy(() => import("./pages/LandingPage"));

const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const CoursesPage = lazy(() => import('./pages/CoursesPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const InstructorHomePage = lazy(() => import('./pages/InstructorHomePage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const AdminStudentPage = lazy(() => import('./pages/AdminStudentPage'));
const AdminInstructorPage = lazy(() => import('./pages/AdminInstructorPage'));
const ForgotPage = lazy(() => import('./pages/ForgotPage'));
const AdminCategoryPage = lazy(() => import('./pages/AdminCategoryPage'));
const InstructorCoursePage = lazy(() => import('./pages/InstructorCoursePage'));
const AdminCoursePage = lazy(() => import('./pages/AdminCoursePage'));
const PurchaseConfirmPage = lazy(() => import('./pages/PurchaseConfirmPage'));
const MyLearningPage = lazy(() => import('./pages/MyLearningPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const InstructorCommunitiesPage = lazy(() => import('./pages/InstructorCommunitiesPage'));
const PersonalChatPage = lazy(() => import('./pages/PeronalChatPage'));
const InstructorStudentsList = lazy(() => import('./pages/InstructorStudentsList'));
const InstructorChatPage = lazy(() => import('./pages/InstructorChatPage'));
const WithdrawalPage = lazy(() => import('./pages/WithdrawalPage'));
const AdminPaymentsPage = lazy(() => import('./pages/AdminPaymentsPage'));
const AdminReportsPage = lazy(() => import('./pages/AdminReportsPage'));
const SubscribeConfirmPage = lazy(() => import('./pages/SubscribeConfirmPage'));
import Spinner from "./components/Spinner";

function App() {
  const dispatch: AppDispatch = useDispatch();
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
    if (token) {
      fetchData();
    }
  }, [dispatch, token]);
  return (
    <div className="min-h-screen">
      <BrowserRouter>
        <GoogleOAuthProvider clientId="596357550935-jhld1mlmi7hjda08ret8ju85lt7rftnm.apps.googleusercontent.com">
          <Routes>
            <Route  path="/" element={ <Suspense fallback={<Spinner />}> <LandingPage /> </Suspense> } />
            <Route path="/login" element={<Suspense fallback={<Spinner />}><LoginPage /></Suspense>} />
            <Route path="/forgot" element={<Suspense fallback={<Spinner />}><ForgotPage /></Suspense>} />
            <Route path="/signup" element={<Suspense fallback={<Spinner />}><SignupPage /></Suspense>} />
            <Route path="/courses" element={<Suspense fallback={<Spinner />}><CoursesPage /></Suspense>} />
            <Route path="/mylearning" element={<Suspense fallback={<Spinner />}><MyLearningPage /></Suspense>} />
            <Route path="/profile" element={<Suspense fallback={<Spinner />}><ProfilePage /></Suspense>} />
            <Route path="/mywithdrawals" element={<Suspense fallback={<Spinner />}><WithdrawalPage /></Suspense>} />
            <Route path="/personal/chat" element={<Suspense fallback={<Spinner />}><PersonalChatPage /></Suspense>} />
            <Route path="/instructor" element={<Suspense fallback={<Spinner />}><InstructorHomePage /></Suspense>} />
            <Route path="/instructor/courses" element={<Suspense fallback={<Spinner />}><InstructorCoursePage /></Suspense>} />
            <Route path="/instructor/chats" element={<Suspense fallback={<Spinner />}><InstructorStudentsList /></Suspense>} />
            <Route path="/instructor/personal/chat" element={<Suspense fallback={<Spinner />}><InstructorChatPage /></Suspense>} />
            <Route path="/instructor/communities" element={<Suspense fallback={<Spinner />}><InstructorCommunitiesPage /></Suspense>} />
            <Route path="/admin" element={<Suspense fallback={<Spinner />}><AdminDashboardPage /></Suspense>} />
            <Route path="/admin/students" element={<Suspense fallback={<Spinner />}><AdminStudentPage /></Suspense>} />
            <Route path="/admin/instructors" element={<Suspense fallback={<Spinner />}><AdminInstructorPage /></Suspense>} />
            <Route path="/admin/categories" element={<Suspense fallback={<Spinner />}><AdminCategoryPage /></Suspense>} />
            <Route path="/admin/courses" element={<Suspense fallback={<Spinner />}><AdminCoursePage /></Suspense>} />
            <Route path="/admin/payments" element={<Suspense fallback={<Spinner />}><AdminPaymentsPage /></Suspense>} />
            <Route path="/admin/reports" element={<Suspense fallback={<Spinner />}><AdminReportsPage /></Suspense>} />
            <Route path="/purchase" element={<Suspense fallback={<Spinner />}><PurchaseConfirmPage /></Suspense>} />
            <Route path="/subscribe" element={<Suspense fallback={<Spinner />}><SubscribeConfirmPage /></Suspense>} />
            <Route path="/community" element={<Suspense fallback={<Spinner />}><CommunityPage /></Suspense>} />
          </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
