// src/pages/Blog.jsx
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { blogPosts } from "../data/blogPosts";

export default function Blog() {
  // newest first
  const posts = [...blogPosts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 px-6 py-16 font-manrope">
      <Helmet>
        <title>Blog • MentorWise</title>
        <meta name="description" content="MentorWise blog: updates, guides, and stories from mentors and learners." />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#181C2A]">
            MentorWise Blog
          </h1>
          <p className="mt-4 text-gray-700 max-w-2xl mx-auto font-lato">
            Practical mentorship tips, product updates, and real stories to help you grow faster.
          </p>
        </motion.div>

        {/* Posts grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              {p.cover && (
                <Link to={`/blog/${p.slug}`}>
                  <img
                    src={p.cover}
                    alt={p.title}
                    className="w-full h-44 object-cover"
                    loading="lazy"
                  />
                </Link>
              )}
              <div className="p-5">
                <div className="text-sm text-gray-500 font-lato">
                  {p.date} • {p.author}
                </div>
                <Link to={`/blog/${p.slug}`} className="block mt-2">
                  <h2 className="text-xl font-semibold text-[#181C2A] hover:text-orange-600">
                    {p.title}
                  </h2>
                </Link>
                <p className="mt-3 text-gray-700 font-lato">{p.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags?.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5">
                  <Link
                    to={`/blog/${p.slug}`}
                    className="inline-block text-orange-600 font-semibold hover:underline"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
