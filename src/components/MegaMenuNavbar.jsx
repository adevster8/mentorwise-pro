import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Import search icon


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


export default function MegaMenuNavbar() {
  return (
    <div className="bg-blue-100 text-gray-900 shadow-sm border-b border-gray-300 w-full">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center w-full gap-8">
          {/* Categories: always fill available space */}
          <div className="flex gap-12 flex-nowrap flex-grow">
            {categories.map((cat, idx) => (
              <div className="group relative" key={idx}>
                <button
                  className="text-gray-800 font-medium hover:text-orange-600 text-base tracking-wide whitespace-nowrap"
                >
                  {cat.name}
                </button>
                {/* Dropdown */}
                <div
                  className={
                    "absolute top-full mt-2 hidden group-hover:block bg-white shadow-lg border p-6 rounded-xl z-50 w-[1100px] " +
                    (
                      idx === 0
                        ? "left-0 transform-none"
                        : idx === categories.length - 1
                          ? "right-0 left-auto transform-none"
                          : "left-1/2 transform -translate-x-1/2"
                    )
                  }
                >
                  <div className="grid grid-cols-4 gap-10">
                    {cat.topics.map((topic, tIdx) => (
                      <div key={tIdx}>
                        <h4 className="font-bold text-gray-800 text-base mb-2">{topic.title}</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {topic.subtopics.map((sub, sIdx) => (
                            <li key={sIdx}>
                              <Link
                                to={`/mentors?category=${encodeURIComponent(sub)}`}
                                className="hover:text-orange-500"
                              >
                                {sub}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* SEARCH ICON far right */}
         <button
  className="ml-8 p-2 bg-transparent hover:bg-transparent shadow-none border-none focus:outline-none transition group"
  aria-label="Search"
  style={{ boxShadow: "none", background: "none", border: "none" }}
>
  <FaSearch className="w-6 h-6 text-gray-700 hover:text-orange-500 transition" />
</button>
        </div>
      </nav>
    </div>
  );
}
