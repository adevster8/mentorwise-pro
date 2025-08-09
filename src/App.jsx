// src/App.jsx
import { HelmetProvider } from "react-helmet-async";
import { Routes, Route } from "react-router-dom";

// Core Components
import Navbar from "./components/Navbar";
import LayoutWithFooter from "./pages/LayoutWithFooter";
import PasswordGate from "./components/PasswordGate";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Mentors from "./pages/Mentors";
import MentorProfile from "./pages/MentorProfile";
import BecomeMentor from "./pages/BecomeMentor";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ScheduleCall from "./pages/ScheduleCall";
import BookingConfirmation from "./pages/BookingConfirmation";
import MessageMentor from "./pages/MessageMentor"; // <-- ONLY ONCE
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Support from "./pages/Support";
import Blog from "./pages/Blog";
import MentorSetup from "./pages/MentorSetup";
import Locals from "./pages/Locals";

// How It Works pages
import HowItWorks from "./pages/HowItWorks";              // /how-it-works
import HowItWorksClients from "./pages/HowItWorksClients"; // /how-it-works/clients
import HowItWorksCoaches from "./pages/HowItWorksCoaches"; // /how-it-works/coaches

// RealTalk Pages
import RealTalkHome from "./pages/RealTalkPages/RealTalkHome";
import RealTalkThread from "./pages/RealTalkPages/RealTalkThread";
import RealTalkNewPost from "./pages/RealTalkPages/RealTalkNewPost";
import RealTalkCategory from "./pages/RealTalkPages/RealTalkCategory";

// User Dashboard
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import Messages from "./pages/UserDashboard/Messages";
import MessageThread from "./pages/UserDashboard/MessageThread";
import Profile from "./pages/UserDashboard/Profile";
import Billing from "./pages/UserDashboard/Billing";
import Schedule from "./pages/UserDashboard/Schedule";
import Bookings from "./pages/UserDashboard/Bookings";
import EditProfile from "./pages/UserDashboard/EditProfile";
import Help from "./pages/UserDashboard/Help";
import Invite from "./pages/UserDashboard/Invite";
import Logout from "./pages/UserDashboard/Logout";
import BecomeMentorDash from "./pages/UserDashboard/BecomeMentorDash";
import Settings from "./pages/UserDashboard/Settings";
import Projects from "./pages/UserDashboard/Projects.jsx";
import Goals from "./pages/UserDashboard/Goals.jsx";

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
import MentorBookings from "./pages/MentorDashboard/MentorBookings";
import MentorMessageThread from "./pages/MentorDashboard/MessageThread";
import MentorProjects from "./pages/MentorDashboard/Projects";

export default function App() {
  return (
    <HelmetProvider>
      <PasswordGate>
        <Navbar />
        <Routes>
          {/* Public Pages (nested under layout, use RELATIVE paths) */}
          <Route element={<LayoutWithFooter />}>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="mentors" element={<Mentors />} />
            <Route path="mentors/:id" element={<MentorProfile />} />
            <Route path="become-a-mentor" element={<BecomeMentor />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="schedule-a-call" element={<ScheduleCall />} />
            <Route path="confirmation" element={<BookingConfirmation />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="terms" element={<Terms />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="support" element={<Support />} />
            <Route path="blog" element={<Blog />} />
            <Route path="mentor-setup" element={<MentorSetup />} />
            <Route path="locals" element={<Locals />} />
            <Route path="message-mentor" element={<MessageMentor />} />

            {/* How It Works */}
            <Route path="how-it-works" element={<HowItWorks />} />
            <Route path="how-it-works/clients" element={<HowItWorksClients />} />
            <Route path="how-it-works/coaches" element={<HowItWorksCoaches />} />

            {/* RealTalk */}
            <Route path="realtalk" element={<RealTalkHome />} />
            <Route path="realtalk/category/:categoryName" element={<RealTalkCategory />} />
            <Route path="realtalk/thread/:threadId" element={<RealTalkThread />} />
            <Route path="realtalk/new" element={<RealTalkNewPost />} />
          </Route>

          {/* User Dashboard */}
          <Route path="/dashboard" element={<UserDashboard />}>
            <Route path="messages" element={<Messages />} />
            <Route path="messages/:threadId" element={<MessageThread />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="goals" element={<Goals />} />
            <Route path="projects" element={<Projects />} />
            <Route path="billing" element={<Billing />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="favorites" element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="invite" element={<Invite />} />
            <Route path="logout" element={<Logout />} />
            <Route path="become-mentor" element={<BecomeMentorDash />} />
            <Route path="settings" element={<Settings />} />
            <Route path="help" element={<Help />} />
          </Route>

          {/* Mentor Dashboard */}
          <Route path="/mentor-dashboard" element={<MentorDashboard />}>
            <Route path="availability" element={<Availability />} />
            <Route path="earnings" element={<Earnings />} />
            <Route path="projects" element={<MentorProjects />} />
            <Route path="edit-profile" element={<EditMentorProfile />} />
            <Route path="help" element={<MentorHelp />} />
            <Route path="messages" element={<MentorMessages />} />
            <Route path="messages/:threadId" element={<MentorMessageThread />} />
            <Route path="requests" element={<Requests />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="settings" element={<MentorSettings />} />
            <Route path="bookings" element={<MentorBookings />} />
          </Route>
        </Routes>
      </PasswordGate>
    </HelmetProvider>
  );
}
