'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { BsGear, BsCloud, BsCodeSquare, BsShieldCheck, 
         BsDiagram3, BsGraphUp, BsSpeedometer, BsBug, 
         BsHouseDoor, BsList, BsX, BsLightbulb, BsRobot } from 'react-icons/bs';

const menuItems = [
  { icon: <BsHouseDoor size={20} />, name: "Home", path: "/" },
  { icon: <BsGear size={20} />, name: "CI/CD Pipeline", path: "/ci-cd" },
  { icon: <BsCloud size={20} />, name: "Cloud Infrastructure", path: "/cloud-infrastructure" },
  { icon: <BsCodeSquare size={20} />, name: "Code Analysis", path: "/code-analysis" },
  { icon: <BsShieldCheck size={20} />, name: "Security Scanning", path: "/security-scanning" },
  { icon: <BsDiagram3 size={20} />, name: "Container Orchestration", path: "/container-orchestration" },
  { icon: <BsGraphUp size={20} />, name: "Performance Monitoring", path: "/performance-monitoring" },
  { icon: <BsSpeedometer size={20} />, name: "Load Testing", path: "/load-testing" },
  { icon: <BsBug size={20} />, name: "Incident Response", path: "/incident-response" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  
  useEffect(() => {
    // Find the active menu item index based on the current pathname
    const activeIndex = menuItems.findIndex(item => item.path === pathname);
    setActiveItemIndex(activeIndex >= 0 ? activeIndex : null);
  }, [pathname]);
  
  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="fixed top-4 left-4 z-40 p-2 rounded-md bg-gradient-to-r from-indigo-600 to-blue-500 text-white md:hidden hover:shadow-lg transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <BsX size={24} /> : <BsList size={24} />}
      </button>
      
      {/* Sidebar */}
      <motion.div 
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg z-30 md:relative md:block ${isOpen ? 'block' : 'hidden'}`}
        initial={{ width: 0 }}
        animate={{ width: isOpen || typeof window !== 'undefined' && window.innerWidth >= 768 ? 280 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center mb-8">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500 flex items-center justify-center mr-3 shadow-md">
              <BsRobot className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500">DevOps AI Agents</h1>
          </div>
          
          <nav className="flex-grow">
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li key={item.path}>
                  <Link 
                    href={item.path}
                    className={`flex items-center py-3 px-4 rounded-lg transition-all duration-200 ${
                      pathname === item.path 
                        ? 'bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 font-medium shadow-sm border-l-4 border-indigo-600' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className={`mr-3 transition-transform duration-200 ${pathname === item.path ? 'text-indigo-600 transform scale-110' : ''}`}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                    {pathname === item.path && (
                      <motion.div
                        className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="mt-6">
            <div className="p-4 rounded-lg bg-gradient-to-r from-indigo-600/10 via-purple-500/10 to-blue-500/10 border border-indigo-100 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500"></div>
              <div className="flex items-start">
                <BsLightbulb className="text-indigo-600 mt-1 mr-3" size={18} />
                <div>
                  <h4 className="text-sm font-medium text-gray-800 mb-1">AI Assistant</h4>
                  <p className="text-xs text-gray-600 mb-2">
                    Need help with your DevOps workflows? Ask our AI assistant!
                  </p>
                  <button className="text-xs bg-white hover:bg-indigo-50 text-indigo-700 font-medium py-1.5 px-3 rounded-md transition-colors shadow-sm border border-indigo-100">
                    Get AI Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
