"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 md:top-4 w-full z-50 ">
      <div className="md:max-w-fit md:border-2 md:rounded-full mx-auto px-7 py-2 bg-zinc-200/50 dark:bg-slate-900/50 backdrop-blur-3xl">
        <div className="flex justify-between items-center gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <img src="/favicon.png" alt="JL Logo" className="h-8 w-8" />
          </motion.div>
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex items-center space-x-8">
              {["Overview", "Stack", "Experience", "Projects", "Services", "Testimonials", "Blog", "Contact"].map((item, index) => (
                <motion.a
                  key={item}
                  href={item === "Services" ? "/services" : `#${item.toLowerCase()}`}
                  onClick={() => trackEvent(AnalyticsEvents.NAVIGATION_CLICKED, { item })}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-300 text-sm font-medium"
                >
                  {item}
                </motion.a>
              ))}
            </div>
            {/* Theme Toggle */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Icon icon="solar:sun-bold" className="text-yellow-500" width={20} height={20} />
              ) : (
                <Icon icon="solar:moon-bold" className="text-blue-500" width={20} height={20} />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
} 