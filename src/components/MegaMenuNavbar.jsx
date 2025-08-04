import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";


export const categories = [
  {
    name: "Local",
    topics: [
      {
        title: "Find Nearby Mentors",
        subtopics: [
          "Map View",
          "Local Search",
          "Coffee Shop Meetups",
          "Group Sessions",
          "Safe Public Spaces"
        ]
      },
      {
        title: "In-Person Coaching",
        subtopics: [
          "Fitness in the Park",
          "Career Coaching Locally",
          "Study Groups",
          "Walking Meetups",
          "Skill Workshops"
        ]
      },
      {
        title: "Local Events",
        subtopics: [
          "Upcoming Events",
          "Host Your Own",
          "Weekly Gatherings",
          "Open Workshops",
          "Networking Nights"
        ]
      },
      {
        title: "Safety & Tips",
        subtopics: [
          "Privacy Tips",
          "Safe Places to Meet",
          "How Location Sharing Works",
          "Community Guidelines",
          "Report a Concern"
        ]
      }
    ]
  },
  {
    name: "Career & Business",
    topics: [
      {
        title: "Job Search & Interviewing",
        subtopics: [
          "Resume Reviews",
          "Mock Interviews",
          "LinkedIn Coaching",
          "Personal Branding",
          "Job Hunt Strategy"
        ]
      },
      {
        title: "Entrepreneurship",
        subtopics: [
          "Startups",
          "Freelancing",
          "Pitch Coaching",
          "Funding & Investors",
          "Business Planning"
        ]
      },
      {
        title: "Leadership & Management",
        subtopics: [
          "Executive Coaching",
          "Team Management",
          "Conflict Resolution",
          "Productivity Hacks",
          "Delegation Skills"
        ]
      },
      {
        title: "Workplace Skills",
        subtopics: [
          "Communication Skills",
          "Negotiation",
          "Public Speaking",
          "Remote Work Skills",
          "Career Transitions"
        ]
      }
    ]
  },
  {
    name: "Health & Wellness",
    topics: [
      {
        title: "Fitness & Training",
        subtopics: [
          "Strength Training",
          "At-Home Workouts",
          "Injury Prevention",
          "Cardio Programs",
          "Mobility & Flexibility",
          "Fitness for Beginners"
        ]
      },
      {
        title: "Nutrition & Lifestyle",
        subtopics: [
          "Meal Planning",
          "Sports Training",
          "Weight Management",
          "Supplements Guidance",
          "Plant-Based Diets",
          "Intuitive Eating",
          "Sleep Optimization"
        ]
      },
      {
        title: "Mental Health & Mindfulness",
        subtopics: [
          "Anxiety Coaching",
          "Emotional Resilience",
          "Meditation Guidance",
          "Mindfulness Practice",
          "Burnout Recovery",
          "Stress Management"
        ]
      },
      {
        title: "Habit & Motivation",
        subtopics: [
          "Habit Formation",
          "Morning Routines",
          "Overcoming Procrastination",
          "Time Management",
          "Confidence Building"
        ]
      }
    ]
  },
  {
    name: "Creative & Content",
    topics: [
      {
        title: "Writing & Publishing",
        subtopics: [
          "Creative Writing",
          "Self-Publishing",
          "Blog Strategy",
          "Book Coaching",
          "Storytelling Skills",
          "Scriptwriting"
        ]
      },
      {
        title: "Content Creation",
        subtopics: [
          "YouTube Strategy",
          "Podcasting",
          "TikTok Coaching",
          "Viral Editing",
          "Short Form Video",
          "Equipment Setup"
        ]
      },
      {
        title: "Branding & Aesthetics",
        subtopics: [
          "Personal Brand Design",
          "Logo Feedback",
          "Style Guides",
          "Content Planning",
          "Visual Storytelling"
        ]
      },
      {
        title: "Art & Design",
        subtopics: [
          "Digital Illustration",
          "AI Art Coaching",
          "Selling Your Art",
          "Print-on-Demand Setup",
          "Photoshop Basics"
        ]
      }
    ]
  },
  {
    name: "Finance & Investing",
    topics: [
      {
        title: "Budgeting & Saving",
        subtopics: [
          "Debt Reduction",
          "Emergency Funds",
          "Smart Budgeting",
          "Automated Saving",
          "Financial Discipline"
        ]
      },
      {
        title: "Investing Basics",
        subtopics: [
          "Stock Market Coaching",
          "ETF Strategy",
          "Crypto Basics",
          "Real Estate Intro",
          "Retirement Planning"
        ]
      },
      {
        title: "Financial Independence",
        subtopics: [
          "FIRE Movement",
          "Passive Income",
          "Side Hustle Ideas",
          "Dividend Investing",
          "Wealth Building"
        ]
      },
      {
        title: "Credit & Loans",
        subtopics: [
          "Credit Score Coaching",
          "Loan Strategy",
          "Avoiding Debt Traps",
          "Credit Card Optimization"
        ]
      }
    ]
  },
  {
    name: "Personal Growth",
    topics: [
      {
        title: "Self Discovery",
        subtopics: [
          "Core Values Mapping",
          "Personality Exploration",
          "Journaling Prompts",
          "Life Purpose Clarity",
          "Shadow Work"
        ]
      },
      {
        title: "Confidence & Mindset",
        subtopics: [
          "Imposter Syndrome",
          "Positive Psychology",
          "Courage Coaching",
          "Resilience Training",
          "Emotional Mastery"
        ]
      },
      {
        title: "Relationships",
        subtopics: [
          "Healthy Boundaries",
          "Dating Feedback",
          "Communication Coaching",
          "Friendship Growth",
          "Breakup Recovery"
        ]
      },
      {
        title: "Goal Setting",
        subtopics: [
          "Vision Boards",
          "SMART Goals",
          "Accountability Systems",
          "Weekly Reviews",
          "Habit Stacking"
        ]
      }
    ]
  },
  {
    name: "Tech & Learning",
    topics: [
      {
        title: "Digital Tools",
        subtopics: [
          "Notion Coaching",
          "Productivity Apps",
          "Canva for Business",
          "Zapier & Automation",
          "Google Workspace Tips"
        ]
      },
      {
        title: "Tech Skills",
        subtopics: [
          "Intro to Coding",
          "Web Design Basics",
          "AI Tools Training",
          "SEO Fundamentals",
          "App Prototyping"
        ]
      },
      {
        title: "Study Skills",
        subtopics: [
          "Memory Techniques",
          "Test Prep Coaching",
          "Speed Reading",
          "Focus Tools",
          "Study Habit Building"
        ]
      },
      {
        title: "Career Learning",
        subtopics: [
          "LinkedIn Learning Paths",
          "Course Selection Advice",
          "Learning Motivation",
          "Time Blocking for Courses"
        ]
      }
    ]
  }
];

function useDropdown() {
  const [openIdx, setOpenIdx] = useState(null);
  return {
    openIdx,
    handleEnter: (idx) => setOpenIdx(idx),
    handleLeave: () => setOpenIdx(null),
  };
}

export default function MegaMenuNavbar() {
  const { openIdx, handleEnter, handleLeave } = useDropdown();

  // Optional: keyboard accessibility
  const handleKeyDown = (e, idx) => {
    if (e.key === "Enter" || e.key === " ") handleEnter(idx);
    if (e.key === "Escape") handleLeave();
  };

  return (
    <div className="bg-blue-100 text-gray-900 shadow-sm border-b border-gray-300 w-full font-lato z-9999 relative">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center w-full gap-8">
          {/* Categories row */}
          <div className="flex gap-10 flex-nowrap flex-grow">
            {categories.map((cat, idx) => (
              <div
                key={cat.name}
                className="relative"
                onMouseEnter={() => handleEnter(idx)}
                onMouseLeave={handleLeave}
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                aria-haspopup="true"
                aria-expanded={openIdx === idx}
                style={{ outline: "none" }}
              >
                <motion.button
                  className="relative text-gray-800 font-semibold text-base tracking-wide whitespace-nowrap px-4 py-2 rounded-lg transition-all"
                  whileHover={{ scale: 1.07 }}
                  animate={{
                    color: openIdx === idx ? "#f97316" : "#1e293b"
                  }}
                  style={{
                    background: openIdx === idx ? "#fff7ed" : "transparent",
                    boxShadow: openIdx === idx ? "0 1px 10px #fbbf24aa" : "none",
                    zIndex: openIdx === idx ? 20 : 10,
                  }}
                  tabIndex={0}
                >
                  <span className="relative z-10">{cat.name}</span>
                </motion.button>

                <AnimatePresence>
                  {openIdx === idx && (
                    <motion.div
                      key="dropdown"
                      initial={{ opacity: 0, y: -28, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.96 }}
                      transition={{
                        type: "spring",
                        stiffness: 370,
                        damping: 30,
                        duration: 0.28,
                      }}
                      className={
                        `absolute top-full mt-3 bg-white/95 border border-orange-100 shadow-2xl rounded-2xl p-8 z-10 w-[1120px] max-w-[97vw] ` +
                        (idx >= categories.length - 3 ? "right-0 left-auto" : "left-0")
                      }
                      style={{
                        boxShadow: "0 16px 56px 0 rgba(32,41,79,0.15), 0 2px 8px 0 rgba(253,186,116,0.12)",
                        pointerEvents: "auto",
                        minHeight: 270,
                      }}
                    >
                      <div className="grid grid-cols-4 gap-10">
                        {cat.topics.map((topic, tIdx) => (
                          <div key={tIdx} className="min-w-[200px]">
                            <h4 className="font-bold text-orange-600 text-[1rem] mb-2 tracking-wide uppercase">
                              {topic.title}
                            </h4>
                            <ul className="text-base text-gray-800 space-y-1">
                              {topic.subtopics.map((sub, sIdx) => (
                                <li key={sIdx}>
                                  <Link
                                    to={`/mentors?topic=${encodeURIComponent(sub)}`}
                                    className="inline-block px-2 py-1 rounded hover:bg-orange-100 hover:text-orange-600 transition-colors font-medium"
                                    style={{
                                      fontSize: "0.97rem",
                                      letterSpacing: ".02em"
                                    }}
                                  >
                                    {sub}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          {/* Search icon */}
          <button
            className="ml-8 p-2 bg-transparent hover:bg-orange-100 rounded-full border-none focus:outline-none transition group"
            aria-label="Search"
          >
            <FaSearch className="w-6 h-6 text-gray-700 group-hover:text-orange-500 transition" />
          </button>
        </div>
      </nav>
    </div>
  );
}
