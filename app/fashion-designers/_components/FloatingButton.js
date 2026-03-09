import Link from "next/link";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FloatingButton = () => {
  const [expanded, setExpanded] = useState(false);



  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center bg-radial from-[#F4FCFF] to-[#CCE7F2] text-[#035A7A] rounded-full shadow-lg lg:hidden transition-all duration-300 ease-in-out
        ${expanded ? "pr-0" : ""}`}
    >
      {expanded && (
        <Link
          href="/fashion-designers/post-project"
          className="whitespace-nowrap text-xl font-bold pl-8 py-4 transition-opacity duration-300"
        >
          Post Project
        </Link>
      )}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`flex items-center justify-center transition-transform hover:scale-110 active:scale-95 ${expanded ? 'p-4' : 'w-[52px] h-[52px]'}`}
        aria-label={expanded ? "Collapse" : "Expand"}
      >
        <AnimatePresence mode="wait">
          {expanded ? (
            <motion.div
              key="minus"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Minus className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="plus"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Plus className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};

export default FloatingButton;
