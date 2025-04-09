"use client";

import { motion } from 'framer-motion';
import AgentChat from './AgentChat';
import { BsRobot, BsLightningCharge, BsBraces } from 'react-icons/bs';

interface PageLayoutProps {
  title: string;
  description: string;
  agentType: string;
  children?: React.ReactNode;
}

export default function PageLayout({ 
  title, 
  description, 
  agentType,
  children 
}: PageLayoutProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-6"
    >
      {/* Header Section with Gradient */}
      <div className="mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent rounded-full -mr-20 -mt-20 z-0"></div>
        
        <div className="relative z-10">
          <div className="flex items-center mb-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 flex items-center justify-center mr-3 shadow-md">
              {agentType === 'ci-cd' ? <BsBraces className="text-white" size={20} /> :
               agentType === 'cloud-infrastructure' ? <BsLightningCharge className="text-white" size={20} /> :
               <BsRobot className="text-white" size={20} />}
            </div>
            <motion.h1 
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {title}
            </motion.h1>
          </div>
          
          <motion.p 
            className="text-lg ml-13 pl-0.5 text-gray-600 max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {description}
          </motion.p>
          
          <div className="h-1 w-24 bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500 rounded-full mt-4"></div>
        </div>
      </div>
      
      {/* AI Agent Pulse Indicator */}
      <div className="flex items-center mb-6">
        <div className="relative mr-2">
          <div className="h-3 w-3 bg-green-500 rounded-full"></div>
          <div className="absolute top-0 left-0 h-3 w-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
        </div>
        <p className="text-sm font-medium text-gray-700">
          AI Agent <span className="text-green-600">active</span> and ready to assist with {agentType.replace('-', ' ')} tasks
        </p>
      </div>
      
      {/* Main Content Grid with Enhanced Styling */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          className="order-2 lg:order-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="p-1 bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500"></div>
          <div className="p-4">
            <AgentChat agentType={agentType} />
          </div>
        </motion.div>
        
        <motion.div 
          className="order-1 lg:order-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
      
      {/* Subtle AI Pattern Background */}
      <div className="fixed top-0 right-0 w-full h-full pointer-events-none opacity-5 z-0">
        <div className="absolute top-10 right-10 w-40 h-40 border-4 border-indigo-600 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 border-4 border-purple-500 rounded-full"></div>
        <div className="absolute top-40 left-10 w-20 h-20 border-4 border-blue-500 rounded-full"></div>
      </div>
    </motion.div>
  );
}
