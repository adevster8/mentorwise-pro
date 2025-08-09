// src/pages/MentorDashboard/Projects.jsx
import UserProjects from "../UserDashboard/Projects";

export default function MentorProjects() {
  // Runs the shared Projects UI in mentor mode (CRUD enabled, separate storage key)
  return <UserProjects mode="mentor" />;
}
