"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

export function FeatureCard({ title, description, icon, link }: FeatureCardProps) {
  return (
    <Link href={link} className="block">
      <motion.div 
        className="relative p-6 rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden"
        whileHover={{ 
          y: -8,
          boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)",
          borderColor: "rgba(99, 102, 241, 0.3)"
        }}
        transition={{ 
          duration: 0.2,
          ease: "easeOut" 
        }}
      >
        {/* Animated gradient accent on hover */}
        <motion.div 
          className="absolute -top-1 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500"
          initial={{ scaleX: 0, originX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />
        
        {/* Subtle background pattern */}
        <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full border-8 border-indigo-100/30 opacity-20" />
        
        <div className="flex items-center mb-4 relative z-10">
          <motion.div 
            className="mr-4 p-3 rounded-lg bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center border border-indigo-100 shadow-sm"
            whileHover={{ 
              scale: 1.1,
              background: "linear-gradient(to bottom right, rgba(238, 242, 255, 1), rgba(219, 234, 254, 1))" 
            }}
          >
            <span className="text-indigo-600">
              {icon}
            </span>
          </motion.div>
          
          <motion.h3 
            className="text-lg font-semibold text-gray-800"
            initial={{ opacity: 1 }}
            whileHover={{ 
              background: "linear-gradient(to right, #4f46e5, #8b5cf6, #3b82f6)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            {title}
          </motion.h3>
        </div>
        
        <p className="text-gray-600 ml-1 relative z-10">{description}</p>
        
        {/* Animated arrow on hover */}
        <motion.div 
          className="mt-4 text-indigo-600 text-sm font-medium flex items-center"
          initial={{ opacity: 0.8, x: 0 }}
          whileHover={{ opacity: 1, x: 4 }}
        >
          Learn more
          <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.div>
      </motion.div>
    </Link>
  );
}
