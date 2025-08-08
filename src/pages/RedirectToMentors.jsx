// src/pages/RedirectToMentors.jsx
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function RedirectToMentors() {
  const { subtopic } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (subtopic) {
      const formatted = decodeURIComponent(subtopic)
        .replace(/-/g, ' ') // Turn "interview-prep" into "interview prep"
        .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize each word
      navigate(`/mentors?topic=${encodeURIComponent(formatted)}`, { replace: true });
    }
  }, [subtopic, navigate]);

  return null;
}
