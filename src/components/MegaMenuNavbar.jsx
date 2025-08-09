import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import { megaMenuData } from "../data/megaMenuData";

export default function MegaMenuNavbar() {
const [openCategory, setOpenCategory] = useState(null);

return (
<div className="bg-sky-50 text-slate-900 shadow-sm border-b border-slate-200 w-full font-lato z-[998] relative hidden md:block">
<nav className="flex items-center justify-between h-14 px-6 w-full max-w-full">
{/* Categories */}
<div className="flex justify-between flex-grow mx-6">
{megaMenuData.map((cat, idx) => (
<div
key={cat.name}
className="relative h-full flex items-center"
onMouseEnter={() => setOpenCategory(idx)}
onMouseLeave={() => setOpenCategory(null)}
>
<button className="relative text-slate-700 font-semibold text-sm tracking-wide transition-colors h-full px-3 whitespace-nowrap">
{cat.name}
{openCategory === idx && (
<motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
)}
</button>

<AnimatePresence>
{openCategory === idx && (
<motion.div
initial={{ opacity: 0, y: -10 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -10 }}
transition={{ duration: 0.2, ease: "easeOut" }}
className={`absolute top-full mt-0 bg-white/85 backdrop-blur-md border border-slate-200 shadow-xl rounded-b-2xl p-8 z-10 w-[1120px] max-w-[95vw] ${
[
"Career & Business",
"Tech & AI",
"Content & Marketing",
"Finance & Crypto",
"Health & Wellness",
].includes(cat.name)
? "left-0"
: "right-0"
}`}
>
<div className="grid grid-cols-4 gap-x-8 gap-y-6">
{cat.topics.map((topic) => (
<div key={topic.title}>
<h4 className="font-bold text-slate-900 text-base mb-3 tracking-wide">{topic.title}</h4>
<ul className="space-y-1.5">
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
))}
</div>
</motion.div>
)}
</AnimatePresence>
</div>
))}
</div>

{/* Right: Search */}
<div className="flex items-center gap-4 shrink-0">
<button className="p-2 hover:bg-slate-100 rounded-full" aria-label="Search">
<MagnifyingGlassIcon className="w-5 h-5 text-slate-600" />
</button>
</div>
</nav>
</div>
);
}