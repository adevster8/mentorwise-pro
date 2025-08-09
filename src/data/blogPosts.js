// src/data/blogPosts.js

// Helper: turn "August 9, 2025" into a comparable date if you ever sort
const d = (str) => new Date(str);

export const blogPosts = [
  {
    id: "intro-mentorwise-2025",
    slug: "mentorwise-intro-and-vision",
    title: "MentorWise: The Vision, The Product, The Why",
    date: "August 9, 2025",
    author: "MentorWise Team",
    tags: ["MentorWise", "Product", "Updates"],
    cover: "/slide-show1.png", // put image in /public
    excerpt:
      "A quick tour of what we’re building, why it matters, and how mentorship beats generic courses every time.",
    // Use simple HTML so we don't need extra libraries
    content: `
      <p>MentorWise is a modern mentorship platform built around human connection and real growth. 
      We blend the best parts of coaching, community, and real-world results so you can learn faster with accountability, not just content.</p>

      <h3>What makes MentorWise different?</h3>
      <ul>
        <li>Vetted mentors with real results</li>
        <li>Instant booking and clean messaging</li>
        <li>Practical paths: coaching, projects, and programs</li>
      </ul>

      <p>We’re shipping features weekly and obsessing over polish. Thanks for being here this early — more to come.</p>
    `,
  },
  {
    id: "find-the-right-coach",
    slug: "how-to-find-the-right-coach-online",
    title: "How to Find the Right Coach Online (Without Wasting Time)",
    date: "August 8, 2025",
    author: "Devin A.",
    tags: ["Coaching", "Guides"],
    cover: "/why-coaching.jpg",
    excerpt:
      "A step-by-step checklist to pick a coach that fits your goals, budget, and availability — and actually gets you results.",
    content: `
      <p>Picking the right coach shouldn't feel like rolling dice. Here's a simple framework:</p>
      <ol>
        <li><strong>Define one outcome</strong> you want in 30–60 days.</li>
        <li><strong>Check reviews</strong> and look for specifics, not hype.</li>
        <li><strong>Request a plan</strong> (milestones, cadence, expectations).</li>
        <li><strong>Start small</strong> with an intro package to test fit.</li>
      </ol>
      <p>On MentorWise you can message mentors first, compare profiles, and book in minutes.</p>
    `,
  },
];

// Optional helpers
export const getPostBySlug = (slug) =>
  blogPosts.find((p) => p.slug === slug);

export const getNextPrev = (slug) => {
  const idx = blogPosts.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? blogPosts[idx - 1] : null,
    next: idx < blogPosts.length - 1 ? blogPosts[idx + 1] : null,
  };
};
