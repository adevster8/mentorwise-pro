import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LayoutWithFooter from "./pages/LayoutWithFooter";
import PasswordGate from "./components/PasswordGate"; 

// Public Pages (with footer)
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Mentors from "./pages/Mentors";
import MentorProfile from "./pages/MentorProfile";
import BecomeMentor from "./pages/BecomeMentor";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SignUpMentee from "./pages/SignUpMentee";
import ScheduleCall from "./pages/ScheduleCall";
import BookingConfirmation from "./pages/BookingConfirmation";
import MessageMentor from "./pages/MessageMentor";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Support from "./pages/Support";
import Blog from "./pages/Blog";

// User Dashboard
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import DashboardHome from "./pages/UserDashboard/DashboardHome";
import Messages from "./pages/UserDashboard/Messages";
import Profile from "./pages/UserDashboard/Profile";
import Billing from "./pages/UserDashboard/Billing";
import Schedule from "./pages/UserDashboard/Schedule";
import Bookings from "./pages/UserDashboard/Bookings";
import EditProfile from "./pages/UserDashboard/EditProfile";
import Help from "./pages/UserDashboard/Help";
import Invite from "./pages/UserDashboard/Invite";
import Logout from "./pages/UserDashboard/Logout";
import BecomeMentorDash from "./pages/UserDashboard/BecomeMentor";
import Settings from "./pages/UserDashboard/Settings";

// Mentor Dashboard
import MentorDashboard from "./pages/MentorDashboard/MentorDashboard";
import Availability from "./pages/MentorDashboard/Availability";
import Earnings from "./pages/MentorDashboard/Earnings";
import EditMentorProfile from "./pages/MentorDashboard/EditMentorProfile";
import MentorHelp from "./pages/MentorDashboard/Help";
import MentorMessages from "./pages/MentorDashboard/Messages";
import Requests from "./pages/MentorDashboard/Requests";
import Reviews from "./pages/MentorDashboard/Reviews";
import MentorSettings from "./pages/MentorDashboard/Settings";

function App() {
  return (
    <PasswordGate>
      <>
        <Navbar />
        <Routes>
          {/* Public Pages wrapped with layout and footer */}
          <Route element={<LayoutWithFooter />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/mentors/:id" element={<MentorProfile />} />
            <Route path="/become-a-mentor" element={<BecomeMentor />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signup-mentee" element={<SignUpMentee />} />
            <Route path="/schedule-call" element={<ScheduleCall />} />
            <Route path="/confirmation" element={<BookingConfirmation />} />
            <Route path="/message/:id" element={<MessageMentor />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/support" element={<Support />} />
            <Route path="/blog" element={<Blog />} />
          </Route>

          {/* User Dashboard Routes */}
          <Route path="/dashboard" element={<UserDashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="messages" element={<Messages />} />
            <Route path="profile" element={<Profile />} />
            <Route path="billing" element={<Billing />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="help" element={<Help />} />
            <Route path="invite" element={<Invite />} />
            <Route path="logout" element={<Logout />} />
            <Route path="become-mentor" element={<BecomeMentorDash />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Mentor Dashboard Routes */}
          <Route path="/mentor-dashboard" element={<MentorDashboard />}>
            <Route path="availability" element={<Availability />} />
            <Route path="earnings" element={<Earnings />} />
            <Route path="edit-profile" element={<EditMentorProfile />} />
            <Route path="help" element={<MentorHelp />} />
            <Route path="messages" element={<MentorMessages />} />
            <Route path="requests" element={<Requests />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="settings" element={<MentorSettings />} />
          </Route>
        </Routes>
      </>
    </PasswordGate>
  );
}

export default App;
