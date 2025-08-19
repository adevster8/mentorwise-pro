// src/components/MegaMenuNavbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import { megaMenuData } from "../data/megaMenuData";

const MegaMenuNavbar = React.memo(() => {
  const [openCategory, setOpenCategory] = useState(null);

  return (
<div className="bg-sky-50 text-slate-900 shadow-sm border-b border-slate-200 w-full font-lato z-[998] relative hidden 2xl:block">
      {/* Use the same page padding as the top bar; grid keeps search on the far right */}
      <nav className="grid grid-cols-[1fr_auto] items-center h-14 w-full px-4 md:px-6">
        {/* Categories fill all available width and distribute evenly */}
        <div className="flex items-stretch justify-between w-full min-w-0">
          {megaMenuData.map((cat, idx) => {
            const isOpen = openCategory === idx;
            const categoryPath = `/mentors?category=${encodeURIComponent(cat.name)}`;

            return (
              <div
                key={cat.name}
                className="relative h-full"
                onMouseEnter={() => setOpenCategory(idx)}
                onMouseLeave={() => setOpenCategory(null)}
              >
                <Link
                  to={categoryPath}
                  aria-expanded={isOpen}
                  className="relative h-14 flex items-center px-1 sm:px-2 whitespace-nowrap text-slate-700 font-semibold text-sm tracking-wide hover:text-orange-600 transition-colors"
                >
                  {cat.name}
                  {isOpen && (
                    <motion.div
                      layoutId="mm-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className={`absolute top-full mt-0 bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-2xl rounded-b-2xl p-8 z-20 w-[1120px] max-w-[95vw] ${
                        // early items anchor left; later items anchor right so the panel never overflows
                        idx < Math.ceil(megaMenuData.length / 2) ? "left-0" : "right-0"
                      }`}
                    >
                      <div className="grid grid-cols-4 gap-x-8 gap-y-6">
                        {cat.topics.map((topic) => {
                          const topicPath = `/mentors?topic=${encodeURIComponent(topic.title)}`;
                          return (
                            <div key={topic.title}>
                              <Link to={topicPath} onClick={() => setOpenCategory(null)}>
                                <h4 className="font-bold text-slate-900 text-base mb-3 tracking-wide hover:text-orange-600 transition-colors">
                                  {topic.title}
                                </h4>
                              </Link>
                              <ul className="space-y-2">
                                {topic.subtopics.map((sub) => (
                                  <li key={sub.name}>
                                    <Link
                                      to={sub.path}
                                      className="inline-block text-slate-600 hover:text-orange-600 transition-colors font-medium text-sm"
                                      onClick={() => setOpenCategory(null)}
                                    >
                                      {sub.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Search pinned hard-right, not covered by categories */}
        <div className="pl-2 flex items-center justify-end">
          <button
            className="p-2.5 hover:bg-slate-200/60 rounded-full transition-colors"
            aria-label="Search"
          >
            <MagnifyingGlassIcon className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </nav>
    </div>
  );
});

export default MegaMenuNavbar;
