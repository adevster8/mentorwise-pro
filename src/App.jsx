import React, { Suspense, lazy } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";

// Eagerly load core UI components used on every page
import Navbar from "./components/Navbar";
import PasswordGate from "./components/PasswordGate";
import LayoutWithFooter from "./pages/LayoutWithFooter";
import CreateProject from "./pages/MentorDashboard/CreateProject";

// --- Fallback Component for Lazy Loading ---
const LoadingFallback = () => (
  <div style={{ display: "grid", placeItems: "center", minHeight: "60vh" }}>
    <div>Loading Page...</div>
  </div>
);

// --- Route Guard for Protected Pages ---
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, userData, loading } = useAuth();
  if (loading) return <LoadingFallback />;
  if (!user) return <Navigate to="/signin" replace />;
  if (Array.isArray(allowedRoles) && allowedRoles.length) {
    const role = userData?.role;
    if (role && !allowedRoles.includes(role)) {
      const fallback = role === "mentor" ? "/mentor-dashboard" : "/";
      return <Navigate to={fallback} replace />;
    }
  }
  return children;
};

// --- Dynamic Page Imports (Code Splitting) ---

// Public Pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Mentors = lazy(() => import("./pages/Mentors"));
const MentorProfile = lazy(() => import("./pages/MentorProfile"));
const BecomeMentor = lazy(() => import("./pages/BecomeMentor"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const ScheduleCall = lazy(() => import("./pages/ScheduleCall"));
const BookingConfirmation = lazy(() => import("./pages/BookingConfirmation"));
const MessageMentor = lazy(() => import("./pages/MessageMentor"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Support = lazy(() => import("./pages/Support"));
const Blog = lazy(() => import("./pages/Blog"));
const MentorSetup = lazy(() => import("./pages/MentorSetup"));
const Locals = lazy(() => import("./pages/Locals"));

// How It Works & Pricing Pages
const HowItWorksClients = lazy(() => import("./pages/HowItWorksClients"));
const HowItWorksCoaches = lazy(() => import("./pages/HowItWorksCoaches"));
const Pricing = lazy(() => import("./pages/pricing.jsx")); // note .jsx and capital P

// RealTalk Pages
const RealTalkHome = lazy(() => import("./pages/RealTalkPages/RealTalkHome"));
const RealTalkThread = lazy(() => import("./pages/RealTalkPages/RealTalkThread"));
const RealTalkNewPost = lazy(() => import("./pages/RealTalkPages/RealTalkNewPost"));
const RealTalkCategory = lazy(() => import("./pages/RealTalkPages/RealTalkCategory"));

// User Dashboard Pages
const UserDashboard = lazy(() => import("./pages/UserDashboard/UserDashboard"));
const UserMessages = lazy(() => import("./pages/UserDashboard/Messages"));
const UserMessageThread = lazy(() => import("./pages/UserDashboard/MessageThread"));
const UserProfile = lazy(() => import("./pages/UserDashboard/Profile"));
const UserBilling = lazy(() => import("./pages/UserDashboard/Billing"));
const UserSchedule = lazy(() => import("./pages/UserDashboard/Schedule"));
// IMPORTANT: import Bookings.jsx as UserBookings to match the default export in your file
const UserBookings = lazy(() => import("./pages/UserDashboard/Bookings"));
const UserEditProfile = lazy(() => import("./pages/UserDashboard/EditProfile"));
const UserHelp = lazy(() => import("./pages/UserDashboard/Help"));
const UserInvite = lazy(() => import("./pages/UserDashboard/Invite"));
const UserLogout = lazy(() => import("./pages/UserDashboard/Logout"));
const BecomeMentorDash = lazy(() => import("./pages/UserDashboard/BecomeMentorDash"));
const UserSettings = lazy(() => import("./pages/UserDashboard/Settings"));
const UserProjects = lazy(() => import("./pages/UserDashboard/Projects"));
const UserGoals = lazy(() => import("./pages/UserDashboard/Goals"));

// Mentor Dashboard Pages
const MentorDashboard = lazy(() => import("./pages/MentorDashboard/MentorDashboard"));
const Availability = lazy(() => import("./pages/MentorDashboard/Availability"));
const Earnings = lazy(() => import("./pages/MentorDashboard/Earnings"));
const EditMentorProfile = lazy(() => import("./pages/MentorDashboard/EditMentorProfile"));
const MentorHelp = lazy(() => import("./pages/MentorDashboard/Help"));
const MentorMessages = lazy(() => import("./pages/MentorDashboard/Messages"));
const Requests = lazy(() => import("./pages/MentorDashboard/Requests"));
const Reviews = lazy(() => import("./pages/MentorDashboard/Reviews"));
const MentorSettings = lazy(() => import("./pages/MentorDashboard/Settings"));
const MentorBookings = lazy(() => import("./pages/MentorDashboard/MentorBookings"));
const MentorMessageThread = lazy(() => import("./pages/MentorDashboard/MessageThread"));
const MentorProjects = lazy(() => import("./pages/MentorDashboard/Projects"));

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <PasswordGate>
          <Navbar />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* --- Public Routes (with footer) --- */}
              <Route element={<LayoutWithFooter />}>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="mentors" element={<Mentors />} />
                <Route path="mentors/:id" element={<MentorProfile />} />
                <Route path="become-a-mentor" element={<BecomeMentor />} />
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

                {/* --- How It Works & Pricing Routes --- */}
                <Route path="how-it-works" element={<HowItWorksClients />} />
                <Route path="how-it-works/clients" element={<HowItWorksClients />} />
                <Route path="how-it-works/coaches" element={<HowItWorksCoaches />} />
                {/* This is the main route for your pricing page */}
                <Route path="pricing" element={<Pricing />} />

                {/* --- RealTalk Routes --- */}
                <Route path="realtalk" element={<RealTalkHome />} />
                <Route path="realtalk/category/:categoryName" element={<RealTalkCategory />} />
                <Route path="realtalk/thread/:threadId" element={<RealTalkThread />} />
                <Route path="realtalk/new" element={<RealTalkNewPost />} />
              </Route>

              {/* --- Auth Routes (no footer) --- */}
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />

              {/* --- User Dashboard (Protected) --- */}
           <Route
  path="/dashboard"
  element={
    <ProtectedRoute allowedRoles={["user", "mentee", "mentor"]}>
      <UserDashboard />
    </ProtectedRoute>
  }
>
  <Route path="messages" element={<UserMessages />} />
  <Route path="messages/:threadId" element={<UserMessageThread />} />
  <Route path="schedule" element={<UserSchedule />} />
  <Route path="goals" element={<UserGoals />} />
  <Route path="projects" element={<UserProjects />} />
  <Route path="billing" element={<UserBilling />} />
  <Route path="edit-profile" element={<UserEditProfile />} />
  <Route path="favorites" element={<UserProfile />} />
  <Route path="profile" element={<UserProfile />} />
  {/* Use the clearly named UserBookings component here */}
  <Route path="bookings" element={<UserBookings />} />
  <Route path="invite" element={<UserInvite />} />
  <Route path="logout" element={<UserLogout />} />
  <Route path="become-mentor" element={<BecomeMentorDash />} />
  <Route path="settings" element={<UserSettings />} />
  <Route path="help" element={<UserHelp />} />
</Route>

              {/* --- Mentor Dashboard (Protected) --- */}
              <Route
                path="/mentor-dashboard"
                element={
                  <ProtectedRoute allowedRoles={["mentor"]}>
                    <MentorDashboard />
                  </ProtectedRoute>
                }
              >
                <Route path="availability" element={<Availability />} />
                <Route path="earnings" element={<Earnings />} />
                <Route path="projects" element={<MentorProjects />} />
                <Route path="projects/create" element={<CreateProject />} />
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
          </Suspense>
        </PasswordGate>
      </AuthProvider>
    </HelmetProvider>
  );
}
