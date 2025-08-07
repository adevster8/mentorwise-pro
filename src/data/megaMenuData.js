// src/data/megaMenuData.js

// Helper: slugify for URLs
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, 'and')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');

// Helper: add URL path to subtopics
const createSubtopics = (subtopics, cat, topic) =>
  subtopics.map(sub => ({
    name: sub,
    // Route points to a page by subtopic, but you can change this if needed
    path: `/realtalk/category/${slugify(cat)}/${slugify(topic)}/${slugify(sub)}`
  }));

export const megaMenuData = [
  // ==========================================================
  // 1. Career & Business
  // ==========================================================
  {
    name: "Career & Business",
    path: "/mentors/career-and-business",
    topics: [
      {
        title: "Job Search & Resumes",
        subtopics: createSubtopics([
          "Job Search Strategy",
          "Interview Prep",
          "Resume & Cover Letter Review",
          "Salary Negotiation",
          "First Job Advice",
          "Career Change Guidance",
          "Networking Skills",
          "Personal Branding"
        ], "Career & Business", "Job Search & Resumes")
      },
      {
        title: "Entrepreneurship",
        subtopics: createSubtopics([
          "Startup Ideation",
          "Business Planning",
          "Freelancing & Consulting",
          "Side Hustles",
          "Pitching to Investors",
          "Client Acquisition",
          "Contracts & Invoices",
          "Scaling a Startup"
        ], "Career & Business", "Entrepreneurship")
      },
      {
        title: "Leadership & Management",
        subtopics: createSubtopics([
          "Leadership Skills",
          "Team Management",
          "Executive Coaching",
          "Corporate Politics",
          "Workplace Culture",
          "Conflict Resolution",
          "9-to-5 Survival",
          "Performance Reviews"
        ], "Career & Business", "Leadership & Management")
      },
      {
        title: "Workplace Challenges",
        subtopics: createSubtopics([
          "Workplace Burnout",
          "Firing & Layoffs",
          "Remote Work Success",
          "Public Speaking",
          "Time Management",
          "Productivity Systems",
          "Imposter Syndrome",
          "Handling Difficult Bosses"
        ], "Career & Business", "Workplace Challenges")
      },
      {
        title: "Corporate Advancement",
        subtopics: createSubtopics([
          "Getting Promoted",
          "Navigating Office Politics",
          "Mentorship in the Workplace",
          "Building a Portfolio",
          "Interviewing for Management",
          "Transitioning Roles",
          "Networking Up",
          "Boardroom Dynamics"
        ], "Career & Business", "Corporate Advancement")
      },
      {
        title: "Side Hustles",
        subtopics: createSubtopics([
          "Passive Income Ideas",
          "Online Businesses",
          "Print-on-Demand",
          "Digital Product Sales",
          "Flipping & Reselling",
          "Consulting for Extra Cash",
          "Monetizing Hobbies",
          "Side Hustle Time Management"
        ], "Career & Business", "Side Hustles")
      },
      {
        title: "Remote & Hybrid Work",
        subtopics: createSubtopics([
          "Landing Remote Jobs",
          "Managing Distributed Teams",
          "Work From Anywhere",
          "Digital Nomad Tips",
          "Remote Job Boards",
          "Hybrid Office Trends",
          "Productivity Remotely",
          "Staying Connected Online"
        ], "Career & Business", "Remote & Hybrid Work")
      },
      {
        title: "Negotiation & Influence",
        subtopics: createSubtopics([
          "Negotiating Raises",
          "Client Negotiation Skills",
          "Persuasion Techniques",
          "Negotiating Contracts",
          "Difficult Conversations",
          "Securing New Roles",
          "Win-Win Negotiation",
          "Influence at Work"
        ], "Career & Business", "Negotiation & Influence")
      }
    ]
  },

  // ==========================================================
  // 2. Tech & AI
  // ==========================================================
  {
    name: "Tech & AI",
    path: "/mentors/tech-and-ai",
    topics: [
      {
        title: "AI Tools & Skills",
        subtopics: createSubtopics([
          "AI for Business",
          "Prompt Engineering",
          "ChatGPT Mastery",
          "Midjourney & Art Tools",
          "AI for Content Creation",
          "Machine Learning Basics",
          "Data Analysis with AI",
          "AI for Marketing"
        ], "Tech & AI", "AI Tools & Skills")
      },
      {
        title: "Development & Coding",
        subtopics: createSubtopics([
          "Coding Help (Python, JS)",
          "Web Development",
          "App Development",
          "Software Debugging",
          "Frontend Frameworks (React)",
          "Backend Architecture",
          "Open Source Contribution",
          "Learning to Code from Scratch"
        ], "Tech & AI", "Development & Coding")
      },
      {
        title: "Productivity & No-Code",
        subtopics: createSubtopics([
          "No-Code Tooling (Webflow)",
          "Automation (Zapier)",
          "Productivity Apps (Notion)",
          "Tech Stack Advice",
          "API Integration Help",
          "Building an MVP",
          "Google Workspace Hacks",
          "Airtable for Beginners"
        ], "Tech & AI", "Productivity & No-Code")
      },
      {
        title: "Tech Career Path",
        subtopics: createSubtopics([
          "Tech Interviews (FAANG)",
          "Tech Resumes & Portfolios",
          "Breaking into Tech",
          "Product Management",
          "UX/UI Design Careers",
          "DevOps & Cloud",
          "Tech Mentorship",
          "Remote Tech Jobs"
        ], "Tech & AI", "Tech Career Path")
      },
      {
        title: "Cybersecurity",
        subtopics: createSubtopics([
          "Intro to Cybersecurity",
          "Password Management",
          "Phishing Scams",
          "Online Privacy",
          "Bug Bounties",
          "Data Breaches",
          "Security Certifications",
          "Protecting Your Brand"
        ], "Tech & AI", "Cybersecurity")
      },
      {
        title: "Gaming & Esports",
        subtopics: createSubtopics([
          "Starting a Gaming Channel",
          "Streaming on Twitch",
          "Competitive Esports",
          "Game Development",
          "Mobile Game Monetization",
          "Gaming Hardware",
          "Building a PC",
          "VR & AR Gaming"
        ], "Tech & AI", "Gaming & Esports")
      },
      {
        title: "Web3 & Crypto Dev",
        subtopics: createSubtopics([
          "Smart Contract Dev",
          "Building dApps",
          "Solidity & Ethereum",
          "NFT Project Creation",
          "Crypto Wallet Security",
          "Launching a Token",
          "Web3 Community Building",
          "Metaverse Careers"
        ], "Tech & AI", "Web3 & Crypto Dev")
      },
      {
        title: "Data Science & Analytics",
        subtopics: createSubtopics([
          "Excel for Data",
          "Data Visualization",
          "Power BI & Tableau",
          "SQL Basics",
          "Statistics for Beginners",
          "Data Cleaning",
          "AI for Data Analysis",
          "Python for Data Science"
        ], "Tech & AI", "Data Science & Analytics")
      }
    ]
  },

  // ==========================================================
  // 3. Content & Marketing
  // ==========================================================
  {
    name: "Content & Marketing",
    path: "/mentors/content-and-marketing",
    topics: [
      {
        title: "Social Media Growth",
        subtopics: createSubtopics([
          "YouTube Growth Strategy",
          "Instagram & Reels",
          "TikTok Virality",
          "LinkedIn Branding",
          "Social Media Ads",
          "Influencer Collaborations",
          "Personal Branding",
          "Short-Form Video Hacks"
        ], "Content & Marketing", "Social Media Growth")
      },
      {
        title: "Strategy & Monetization",
        subtopics: createSubtopics([
          "Podcast Launch Strategy",
          "Email List Building",
          "SEO for Blogs",
          "Affiliate Marketing",
          "Monetization Models",
          "Creating Digital Products",
          "Community Building",
          "Selling Courses"
        ], "Content & Marketing", "Strategy & Monetization")
      },
      {
        title: "Content Creation Skills",
        subtopics: createSubtopics([
          "Copywriting for Sales",
          "Sales Funnels",
          "Blogging & Article Writing",
          "Product Reviews",
          "Newsletter Strategy",
          "UGC (User-Generated Content)",
          "Scriptwriting for YouTube",
          "Copy Editing"
        ], "Content & Marketing", "Content Creation Skills")
      },
      {
        title: "Visuals & Production",
        subtopics: createSubtopics([
          "Thumbnail Design",
          "Marketing Strategy",
          "Ad Campaign Management",
          "Video Editing Basics",
          "Graphic Design (Canva)",
          "Brand Identity Design",
          "Photography for Content",
          "Editing with CapCut"
        ], "Content & Marketing", "Visuals & Production")
      },
      {
        title: "Community Building",
        subtopics: createSubtopics([
          "Building an Online Community",
          "Discord Servers",
          "Facebook Groups",
          "Forum Moderation",
          "Live Q&A Hosting",
          "Engagement Strategies",
          "Managing Trolls",
          "Events & Giveaways"
        ], "Content & Marketing", "Community Building")
      },
      {
        title: "Analytics & Optimization",
        subtopics: createSubtopics([
          "Google Analytics",
          "YouTube Analytics",
          "SEO Audits",
          "Conversion Tracking",
          "A/B Testing",
          "Funnel Optimization",
          "UTM Parameters",
          "Metrics That Matter"
        ], "Content & Marketing", "Analytics & Optimization")
      },
      {
        title: "Brand Partnerships",
        subtopics: createSubtopics([
          "Pitching Brands",
          "Media Kits",
          "Negotiating Collabs",
          "Sponsorships 101",
          "Influencer Marketplaces",
          "Product Sampling",
          "Long-Term Deals",
          "Brand Alignment"
        ], "Content & Marketing", "Brand Partnerships")
      },
      {
        title: "Podcasting & Audio",
        subtopics: createSubtopics([
          "Podcast Setup",
          "Guest Booking",
          "Editing Audio",
          "Podcast Monetization",
          "Distributing Podcasts",
          "Live Podcasting",
          "Podcast Cover Art",
          "Podcast Networks"
        ], "Content & Marketing", "Podcasting & Audio")
      }
    ]
  },

  // ==========================================================
  // 4. Finance & Crypto
  // ==========================================================
  {
    name: "Finance & Crypto",
    path: "/mentors/finance-and-crypto",
    topics: [
      {
        title: "Investing & Wealth",
        subtopics: createSubtopics([
          "Stock Market Investing",
          "Index Funds & ETFs",
          "Real Estate Investing",
          "High-Yield Savings Accounts",
          "Retirement Planning (401k/IRA)",
          "Building Passive Income",
          "Dividend Investing",
          "Asset Allocation"
        ], "Finance & Crypto", "Investing & Wealth")
      },
      {
        title: "Crypto & Web3",
        subtopics: createSubtopics([
          "Cryptocurrency Basics",
          "Bitcoin & Ethereum",
          "Altcoin Research",
          "NFTs & Digital Art",
          "Web3 Concepts",
          "Crypto Wallets (Metamask)",
          "DeFi Yield Farming",
          "Staying Safe from Scams"
        ], "Finance & Crypto", "Crypto & Web3")
      },
      {
        title: "Personal Finance",
        subtopics: createSubtopics([
          "Creating a Budget",
          "Debt Reduction Strategy",
          "Building an Emergency Fund",
          "Improving Your Credit Score",
          "Student Loan Management",
          "Renting vs. Buying",
          "Monthly Budgeting Apps",
          "Frugal Living Tips"
        ], "Finance & Crypto", "Personal Finance")
      },
      {
        title: "Business & Freelance Finance",
        subtopics: createSubtopics([
          "Taxes for Creators",
          "Freelance Invoicing & Payments",
          "Business Insurance",
          "Pricing Your Services",
          "Profit & Loss Statements",
          "LLC vs Sole Proprietor",
          "Business Banking",
          "Paying Yourself"
        ], "Finance & Crypto", "Business & Freelance Finance")
      },
      {
        title: "Financial Planning",
        subtopics: createSubtopics([
          "Saving for Retirement",
          "Financial Advisors",
          "Estate Planning",
          "Tax Optimization",
          "College Savings",
          "Insurance Planning",
          "Early Retirement",
          "Planning for Kids"
        ], "Finance & Crypto", "Financial Planning")
      },
      {
        title: "Wealth Mindset",
        subtopics: createSubtopics([
          "Money Psychology",
          "Abundance Mentality",
          "Overcoming Scarcity Thinking",
          "Money Manifestation",
          "Mindful Spending",
          "Financial Confidence",
          "Changing Your Relationship to Money",
          "Books on Wealth"
        ], "Finance & Crypto", "Wealth Mindset")
      },
      {
        title: "Crypto Trading",
        subtopics: createSubtopics([
          "Day Trading vs HODL",
          "Technical Analysis",
          "Crypto Taxes",
          "Trading Platforms",
          "Leveraged Tokens",
          "NFT Trading",
          "Decentralized Exchanges",
          "Spot vs Futures"
        ], "Finance & Crypto", "Crypto Trading")
      },
      {
        title: "Side Hustle Finance",
        subtopics: createSubtopics([
          "Budgeting for Gig Workers",
          "Tax Deductions for Side Hustles",
          "Managing Multiple Incomes",
          "Paying Quarterly Taxes",
          "Automating Your Finances",
          "Reinvesting Profits",
          "Crowdfunding",
          "Micro-Investing Apps"
        ], "Finance & Crypto", "Side Hustle Finance")
      }
    ]
  },

  // ==========================================================
  // 5. Health & Wellness
  // ==========================================================
  {
    name: "Health & Wellness",
    path: "/mentors/health-and-wellness",
    topics: [
      {
        title: "Fitness & Training",
        subtopics: createSubtopics([
          "Strength Training Programs",
          "At-Home Workouts",
          "Cardio & Endurance",
          "Mobility & Flexibility",
          "Beginner Fitness Plans",
          "Sports-Specific Training",
          "HIIT Workouts",
          "Running Tips"
        ], "Health & Wellness", "Fitness & Training")
      },
      {
        title: "Nutrition & Diet",
        subtopics: createSubtopics([
          "Meal Planning & Prep",
          "Weight Management",
          "Sports Nutrition",
          "Plant-Based Diets",
          "Intuitive Eating",
          "Understanding Supplements",
          "Gluten-Free Living",
          "Low-Carb Diets"
        ], "Health & Wellness", "Nutrition & Diet")
      },
      {
        title: "Mental Health",
        subtopics: createSubtopics([
          "Anxiety Management",
          "Stress Reduction Techniques",
          "Mindfulness Practices",
          "Meditation for Beginners",
          "Recovering from Burnout",
          "Building Emotional Resilience",
          "Coping with Depression",
          "Therapy Options"
        ], "Health & Wellness", "Mental Health")
      },
      {
        title: "Lifestyle & Habits",
        subtopics: createSubtopics([
          "Improving Sleep Quality",
          "Building Healthy Habits",
          "Morning & Evening Routines",
          "Time Management",
          "Digital Detox",
          "Addiction Recovery Support",
          "Healthy Travel Habits",
          "Breaking Bad Habits"
        ], "Health & Wellness", "Lifestyle & Habits")
      },
      {
        title: "Holistic Health",
        subtopics: createSubtopics([
          "Ayurveda Basics",
          "Herbal Remedies",
          "Integrative Medicine",
          "Holistic Nutrition",
          "Energy Healing",
          "Mind-Body Connection",
          "Meditation Retreats",
          "Supplements & Superfoods"
        ], "Health & Wellness", "Holistic Health")
      },
      {
        title: "Women's Health",
        subtopics: createSubtopics([
          "Cycle Syncing",
          "PCOS & Endometriosis",
          "Hormone Balancing",
          "Fertility & Pregnancy",
          "Postpartum Support",
          "Menopause Wellness",
          "Women's Fitness",
          "Breast Health"
        ], "Health & Wellness", "Women's Health")
      },
      {
        title: "Men's Health",
        subtopics: createSubtopics([
          "Testosterone Health",
          "Heart Health for Men",
          "Prostate Care",
          "Mental Health for Men",
          "Fitness for Men",
          "Baldness & Grooming",
          "Fatherhood Health",
          "Erectile Health"
        ], "Health & Wellness", "Men's Health")
      },
      {
        title: "Family & Kids",
        subtopics: createSubtopics([
          "Child Nutrition",
          "Pediatric Fitness",
          "Raising Resilient Kids",
          "Family Meal Planning",
          "Managing Screen Time",
          "Parenting Teens",
          "Kids' Mental Health",
          "Healthy Family Activities"
        ], "Health & Wellness", "Family & Kids")
      }
    ]
  },

  // ==========================================================
  // 6. Personal Growth
  // ==========================================================
  {
    name: "Personal Growth",
    path: "/mentors/personal-growth",
    topics: [
      {
        title: "Mindset & Confidence",
        subtopics: createSubtopics([
          "Building Self-Confidence",
          "Overcoming Imposter Syndrome",
          "Developing a Growth Mindset",
          "Positive Psychology",
          "Public Speaking Confidence",
          "Goal Setting",
          "Visualization Techniques",
          "Self-Acceptance"
        ], "Personal Growth", "Mindset & Confidence")
      },
      {
        title: "Relationships",
        subtopics: createSubtopics([
          "Dating & Modern Love",
          "Communication Skills",
          "Setting Healthy Boundaries",
          "Friendship & Social Skills",
          "Breakup & Divorce Recovery",
          "Family Dynamics",
          "Resolving Conflict",
          "Marriage Advice"
        ], "Personal Growth", "Relationships")
      },
      {
        title: "Self-Discovery",
        subtopics: createSubtopics([
          "Finding Your Life Purpose",
          "Core Values Exploration",
          "Journaling for Clarity",
          "Personality Type Insights",
          "Solo Travel Planning",
          "Shadow Work",
          "Bucket List Building",
          "Values Assessment"
        ], "Personal Growth", "Self-Discovery")
      },
      {
        title: "Life Challenges",
        subtopics: createSubtopics([
          "Major Life Transitions",
          "Grief & Loss Support",
          "Parenting Advice",
          "Managing Conflict",
          "Decision Making Skills",
          "Building Resilience",
          "Coping with Change",
          "Self-Care During Crisis"
        ], "Personal Growth", "Life Challenges")
      },
      {
        title: "Emotional Intelligence",
        subtopics: createSubtopics([
          "Understanding Emotions",
          "Empathy Development",
          "Nonviolent Communication",
          "Dealing with Jealousy",
          "Emotional Regulation",
          "Active Listening",
          "Apologizing & Forgiveness",
          "Assertiveness Training"
        ], "Personal Growth", "Emotional Intelligence")
      },
      {
        title: "Goal Setting & Planning",
        subtopics: createSubtopics([
          "Vision Board Creation",
          "Quarterly Planning",
          "SMART Goals",
          "Accountability Partners",
          "Habit Stacking",
          "Weekly Reviews",
          "Productivity Journals",
          "Annual Goal Setting"
        ], "Personal Growth", "Goal Setting & Planning")
      },
      {
        title: "Public Speaking & Performance",
        subtopics: createSubtopics([
          "Overcoming Stage Fright",
          "Toastmasters Tips",
          "Storytelling Skills",
          "Speaking at Conferences",
          "Panel Discussions",
          "Virtual Presentation Skills",
          "Q&A Handling",
          "Mic Technique"
        ], "Personal Growth", "Public Speaking & Performance")
      },
      {
        title: "Mindfulness & Meditation",
        subtopics: createSubtopics([
          "Breathing Exercises",
          "Guided Meditations",
          "Body Scan Techniques",
          "Walking Meditation",
          "Meditation Retreats",
          "Daily Mindfulness Habits",
          "Self-Compassion Practices",
          "Meditation Apps"
        ], "Personal Growth", "Mindfulness & Meditation")
      }
    ]
  },

  // ==========================================================
  // 7. Creative Arts
  // ==========================================================
  {
    name: "Creative Arts",
    path: "/mentors/creative-arts",
    topics: [
      {
        title: "Writing & Publishing",
        subtopics: createSubtopics([
          "Creative Writing (Fiction)",
          "Non-Fiction & Memoir",
          "Blogging for Passion",
          "Self-Publishing a Book",
          "Poetry & Spoken Word",
          "Finding a Literary Agent",
          "Writing for Magazines",
          "Building an Author Platform"
        ], "Creative Arts", "Writing & Publishing")
      },
      {
        title: "Visual Arts",
        subtopics: createSubtopics([
          "Digital Illustration (Procreate)",
          "Graphic Design Fundamentals",
          "Photography & Photo Editing",
          "Traditional Drawing & Painting",
          "Selling Art Online",
          "Building a Portfolio",
          "Commissions & Pricing",
          "Gallery Submissions"
        ], "Creative Arts", "Visual Arts")
      },
      {
        title: "Music & Audio",
        subtopics: createSubtopics([
          "Songwriting & Composition",
          "Music Production (Ableton/Logic)",
          "Learning an Instrument",
          "Starting a Podcast",
          "Audio Editing & Mixing",
          "Releasing Your Music",
          "Live Performance Prep",
          "Music Licensing"
        ], "Creative Arts", "Music & Audio")
      },
      {
        title: "Performance & Film",
        subtopics: createSubtopics([
          "Acting & Audition Prep",
          "Stand-up Comedy",
          "Filmmaking & Directing",
          "Video Editing (Premiere/Final Cut)",
          "Scriptwriting",
          "YouTube for Creatives",
          "Vlogging",
          "Short Film Distribution"
        ], "Creative Arts", "Performance & Film")
      },
      {
        title: "Crafts & DIY",
        subtopics: createSubtopics([
          "Knitting & Crochet",
          "Woodworking Basics",
          "Jewelry Making",
          "Pottery & Ceramics",
          "Upcycling Projects",
          "Home Decor DIY",
          "Selling Crafts Online",
          "DIY Gift Ideas"
        ], "Creative Arts", "Crafts & DIY")
      },
      {
        title: "Fashion & Style",
        subtopics: createSubtopics([
          "Personal Styling",
          "Fashion Design",
          "Sustainable Fashion",
          "Sewing Basics",
          "Wardrobe Planning",
          "Thrifting Tips",
          "Fashion Illustration",
          "Building a Fashion Brand"
        ], "Creative Arts", "Fashion & Style")
      },
      {
        title: "Dance & Movement",
        subtopics: createSubtopics([
          "Ballet Basics",
          "Hip Hop Moves",
          "Modern Dance",
          "Dance Fitness",
          "Learning Choreography",
          "Dance Auditions",
          "Dance TikTok Trends",
          "Teaching Dance"
        ], "Creative Arts", "Dance & Movement")
      },
      {
        title: "Comics & Animation",
        subtopics: createSubtopics([
          "Drawing Comics",
          "Storyboarding",
          "Voice Acting",
          "2D/3D Animation",
          "Webtoons Creation",
          "Animating for YouTube",
          "Pitching to Studios",
          "Animation Tools"
        ], "Creative Arts", "Comics & Animation")
      }
    ]
  },

  // ==========================================================
  // 8. Education & Learning
  // ==========================================================
  {
    name: "Education & Learning",
    path: "/mentors/education-and-learning",
    topics: [
      {
        title: "Academic Skills",
        subtopics: createSubtopics([
          "Study Techniques",
          "Test Preparation (SAT/GRE)",
          "Essay Writing",
          "Time Management for Students",
          "Note-Taking Systems",
          "College Applications",
          "Memory Strategies",
          "Exam Stress Relief"
        ], "Education & Learning", "Academic Skills")
      },
      {
        title: "Language Learning",
        subtopics: createSubtopics([
          "Learning Spanish",
          "Learning Japanese",
          "Language Immersion Tips",
          "Using Language Apps Effectively",
          "Conversation Practice",
          "Overcoming Plateaus",
          "Pronunciation Help",
          "Language Exchange"
        ], "Education & Learning", "Language Learning")
      },
      {
        title: "Skill Acquisition",
        subtopics: createSubtopics([
          "How to Learn Anything",
          "Memory Improvement",
          "Speed Reading",
          "Choosing Online Courses",
          "Building a Learning Plan",
          "Staying Motivated",
          "Udemy & Coursera Tips",
          "Deliberate Practice"
        ], "Education & Learning", "Skill Acquisition")
      },
      {
        title: "Teaching & Tutoring",
        subtopics: createSubtopics([
          "Becoming a Tutor",
          "Creating a Course Curriculum",
          "Online Teaching Tools",
          "Engaging Students",
          "Public Speaking for Educators",
          "Homeschooling Strategies",
          "Teaching Online",
          "Teacher Self-Care"
        ], "Education & Learning", "Teaching & Tutoring")
      },
      {
        title: "Parenting Students",
        subtopics: createSubtopics([
          "Helping with Homework",
          "IEPs & Special Needs",
          "Test Prep for Kids",
          "Time Management for Kids",
          "Motivating Reluctant Students",
          "Learning Disabilities",
          "Parent-Teacher Communication",
          "Growth Mindset for Kids"
        ], "Education & Learning", "Parenting Students")
      },
      {
        title: "STEM & Science",
        subtopics: createSubtopics([
          "Math Help",
          "Science Experiments at Home",
          "STEM Careers",
          "Coding for Kids",
          "Women in STEM",
          "Robotics & Engineering",
          "Science Fairs",
          "Chemistry Crash Course"
        ], "Education & Learning", "STEM & Science")
      },
      {
        title: "Art & Creativity in Education",
        subtopics: createSubtopics([
          "Integrating Arts in Curriculum",
          "STEAM Projects",
          "Drama in the Classroom",
          "Music for Learning",
          "Creative Writing for Kids",
          "Maker Spaces",
          "School Art Shows",
          "Student Podcasting"
        ], "Education & Learning", "Art & Creativity in Education")
      },
      {
        title: "College & Grad School",
        subtopics: createSubtopics([
          "College Essays",
          "Applying for Scholarships",
          "Navigating College Life",
          "Choosing a Major",
          "Grad School Applications",
          "Internships",
          "Study Abroad",
          "Gap Year Advice"
        ], "Education & Learning", "College & Grad School")
      }
    ]
  },
    // ==========================================================
  // 9. Science & Curiosity
  // ==========================================================
  {
    name: "Science & Curiosity",
    path: "/mentors/science-and-curiosity",
    topics: [
      {
        title: "Space & Astronomy",
        subtopics: createSubtopics([
          "Black Holes Explained",
          "Exoplanets & Alien Life",
          "Space Telescopes",
          "Quasars & Pulsars",
          "Time Dilation & Relativity",
          "How Stars Die",
          "Exploring the Moon & Mars",
          "Deep Space Phenomena"
        ], "Science & Curiosity", "Space & Astronomy")
      },
      {
        title: "Physics Made Simple",
        subtopics: createSubtopics([
          "Quantum Weirdness",
          "Gravity in Real Life",
          "Time Travel Theories",
          "Entanglement 101",
          "Nuclear vs. Particle Physics",
          "The Double Slit Mystery",
          "Thermodynamics for Beginners",
          "What Is a Multiverse?"
        ], "Science & Curiosity", "Physics Made Simple")
      },
      {
        title: "Human Biology",
        subtopics: createSubtopics([
          "Brain Function & Focus",
          "Gut-Brain Connection",
          "Hormones & Emotions",
          "Sleep & Recovery Science",
          "What Is Dopamine?",
          "Nervous System Basics",
          "Circadian Rhythms",
          "Aging & Longevity"
        ], "Science & Curiosity", "Human Biology")
      },
      {
        title: "Chemistry in the Real World",
        subtopics: createSubtopics([
          "How Medications Work",
          "Food & Flavor Compounds",
          "Addictive Substances",
          "Chemical Reactions 101",
          "Everyday Acids & Bases",
          "Skincare Ingredients Explained",
          "Environmental Chemistry",
          "The Periodic Table Demystified"
        ], "Science & Curiosity", "Chemistry in the Real World")
      },
      {
        title: "Psychology & Behavior",
        subtopics: createSubtopics([
          "Habit Formation Science",
          "Why We Procrastinate",
          "The Psychology of Motivation",
          "Attachment Theory Basics",
          "Childhood Development Stages",
          "Behavioral Triggers",
          "Neuroscience of Change",
          "Social Dynamics"
        ], "Science & Curiosity", "Psychology & Behavior")
      },
      {
        title: "The Earth & Environment",
        subtopics: createSubtopics([
          "Climate Change Explained",
          "Natural Disasters 101",
          "Sustainability Basics",
          "Earth’s History Timeline",
          "Ocean Currents & Ecosystems",
          "The Water Cycle",
          "Renewable Energy Types",
          "How Volcanoes Work"
        ], "Science & Curiosity", "The Earth & Environment")
      },
      {
        title: "History of Innovation",
        subtopics: createSubtopics([
          "Inventions that Changed the World",
          "History of AI",
          "Ancient Engineering",
          "Printing Press to iPhone",
          "Scientific Revolutions",
          "Industrial Age Breakthroughs",
          "Internet Origins",
          "Futurism Through Time"
        ], "Science & Curiosity", "History of Innovation")
      },
      {
        title: "Curiosity Questions",
        subtopics: createSubtopics([
          "Why Is the Sky Blue?",
          "Can You Travel Faster than Light?",
          "What Happens Inside a Star?",
          "Could Earth Become Uninhabitable?",
          "Why Are We Conscious?",
          "What Would a Black Hole Taste Like?",
          "Are We Living in a Simulation?",
          "Can Time Ever Stop?"
        ], "Science & Curiosity", "Curiosity Questions")
      }
    ]
  },

  // ==========================================================
  // 10. Hobbies & Mastery
  // ==========================================================
  {
    name: "Hobbies & Mastery",
    path: "/mentors/hobbies-and-mastery",
    topics: [
      {
        title: "Music Skills",
        subtopics: createSubtopics([
          "Learn to Play Guitar",
          "Music Theory Basics",
          "Singing Techniques",
          "Piano for Beginners",
          "Digital Music Production",
          "Finding Your Voice",
          "Rhythm & Timing Practice",
          "Home Recording Setup"
        ], "Hobbies & Mastery", "Music Skills")
      },
      {
        title: "Art & Drawing",
        subtopics: createSubtopics([
          "Pencil Shading Techniques",
          "Digital Illustration Basics",
          "Drawing Faces & Anatomy",
          "Comic & Manga Styles",
          "Watercolor Painting",
          "Procreate Tips & Tricks",
          "Creating Art Every Day",
          "Portfolio Building"
        ], "Hobbies & Mastery", "Art & Drawing")
      },
      {
        title: "Home Fitness",
        subtopics: createSubtopics([
          "Bodyweight Workout Plans",
          "Building Muscle at Home",
          "Recovery & Stretching",
          "Core Training Routines",
          "HIIT Workouts",
          "Dumbbell Mastery",
          "Workout Tracking Systems",
          "Fitness for Busy Schedules"
        ], "Hobbies & Mastery", "Home Fitness")
      },
      {
        title: "Cooking & Nutrition",
        subtopics: createSubtopics([
          "Cooking Techniques 101",
          "How to Meal Prep",
          "Knife Skills",
          "Understanding Macros",
          "Quick Healthy Meals",
          "Plant-Based Basics",
          "Comfort Food Reinvented",
          "Kitchen Tools You Need"
        ], "Hobbies & Mastery", "Cooking & Nutrition")
      },
      {
        title: "Writing & Storytelling",
        subtopics: createSubtopics([
          "How to Start a Novel",
          "Short Story Practice",
          "Building Relatable Characters",
          "Story Structure Secrets",
          "Editing Your Own Work",
          "Writing Every Day",
          "Writing for the Web",
          "Building a Writing Routine"
        ], "Hobbies & Mastery", "Writing & Storytelling")
      },
      {
        title: "Languages & Learning",
        subtopics: createSubtopics([
          "Learn Spanish Fast",
          "Memory Hacks for Vocabulary",
          "Conversation Practice",
          "Listening Comprehension",
          "Grammar Tools That Work",
          "Cultural Immersion Ideas",
          "Language Learning Apps",
          "Staying Consistent"
        ], "Hobbies & Mastery", "Languages & Learning")
      },
      {
        title: "Gaming & Strategy",
        subtopics: createSubtopics([
          "Improving Reaction Time",
          "Competitive Game Coaching",
          "FPS Aim Training",
          "Chess Strategy",
          "Game Design Concepts",
          "Streaming Your Gameplay",
          "Puzzle Solving Skills",
          "Managing Screen Time"
        ], "Hobbies & Mastery", "Gaming & Strategy")
      },
      {
        title: "DIY & Creativity",
        subtopics: createSubtopics([
          "Home Decor Projects",
          "Journaling Techniques",
          "Candle or Soap Making",
          "Learning to Sew or Knit",
          "Handmade Gifts",
          "Vision Boards & Collaging",
          "DIY Photography Setups",
          "Upcycling & Repurposing"
        ], "Hobbies & Mastery", "DIY & Creativity")
      }
    ]
  }
  
];

