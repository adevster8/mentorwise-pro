import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import { megaMenuData } from "../data/megaMenuData";

const MegaMenuNavbar = React.memo(() => {
    const [openCategory, setOpenCategory] = useState(null);

    return (
        <div className="bg-sky-50 text-slate-900 shadow-sm border-b border-slate-200 w-full font-lato z-[998] relative hidden md:block">
            <nav className="flex items-center justify-between h-14 px-6 w-full max-w-screen-2xl mx-auto">
                {/* Categories */}
                <div className="flex justify-between flex-grow mx-6">
                    {megaMenuData.map((cat, idx) => {
                        // FIX: All top-level categories now link to the /mentors page with a 'category' query
                        const categoryPath = `/mentors?category=${encodeURIComponent(cat.name)}`;
                        return (
                            <div
                                key={cat.name}
                                className="relative h-full flex items-center"
                                onMouseEnter={() => setOpenCategory(idx)}
                                onMouseLeave={() => setOpenCategory(null)}
                            >
                                <Link
                                    to={categoryPath}
                                    className="relative text-slate-700 font-semibold text-sm tracking-wide transition-colors h-full flex items-center px-3 whitespace-nowrap hover:text-orange-600"
                                >
                                    {cat.name}
                                    {openCategory === idx && (
                                        <motion.div
                                            layoutId="underline"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                        />
                                    )}
                                </Link>

                                <AnimatePresence>
                                    {openCategory === idx && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 5 }}
                                            transition={{ duration: 0.2, ease: "easeOut" }}
                                            className={`absolute top-full mt-0 bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-2xl rounded-b-2xl p-8 z-20 w-[1120px] max-w-[95vw] ${
                                                ["Career & Business", "Tech & AI", "Content & Marketing", "Finance & Crypto", "Health & Wellness"].includes(cat.name)
                                                    ? "left-0"
                                                    : "right-0"
                                            }`}
                                        >
                                            <div className="grid grid-cols-4 gap-x-8 gap-y-6">
                                                {cat.topics.map((topic) => {
                                                    // FIX: All topic titles now link to the /mentors page with a 'topic' query
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
                                                                        {/* Subtopics already link correctly via sub.path */}
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
                                                    )
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )
                    })}
                </div>

                {/* Right: Search */}
                <div className="flex items-center gap-4 shrink-0">
                    <button className="p-2.5 hover:bg-slate-200/60 rounded-full transition-colors" aria-label="Search">
                        <MagnifyingGlassIcon className="w-5 h-5 text-slate-600" />
                    </button>
                </div>
            </nav>
        </div>
    );
});

export default MegaMenuNavbar;