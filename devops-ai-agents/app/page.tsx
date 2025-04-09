"use client";

import { FeatureCard } from '@/components/FeatureCard';
import { BsGear, BsCloud, BsCodeSquare, BsShieldCheck, BsDiagram3, BsGraphUp, BsSpeedometer, BsBug, BsRobot, BsArrowRight, BsStars, BsLightning } from 'react-icons/bs';
import { motion } from 'framer-motion';
import AgentChat from '@/components/AgentChat';

export default function Home() {
  const features = [
    {
      title: "CI/CD Pipeline Management",
      description: "Automate your continuous integration and delivery pipelines",
      icon: <BsGear size={24} />,
      link: "/ci-cd"
    },
    {
      title: "Cloud Infrastructure",
      description: "Manage and optimize your cloud resources",
      icon: <BsCloud size={24} />,
      link: "/cloud-infrastructure"
    },
    {
      title: "Code Analysis",
      description: "Analyze your code for quality and security issues",
      icon: <BsCodeSquare size={24} />,
      link: "/code-analysis"
    },
    {
      title: "Security Scanning",
      description: "Identify and remediate security vulnerabilities",
      icon: <BsShieldCheck size={24} />,
      link: "/security-scanning"
    },
    {
      title: "Container Orchestration",
      description: "Manage containerized applications and services",
      icon: <BsDiagram3 size={24} />,
      link: "/container-orchestration"
    },
    {
      title: "Performance Monitoring",
      description: "Monitor and optimize application performance",
      icon: <BsGraphUp size={24} />,
      link: "/performance-monitoring"
    },
    {
      title: "Load Testing",
      description: "Test system performance under various load conditions",
      icon: <BsSpeedometer size={24} />,
      link: "/load-testing"
    },
    {
      title: "Incident Response",
      description: "Detect and respond to system incidents automatically",
      icon: <BsBug size={24} />,
      link: "/incident-response"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="relative">
      {/* AI-themed background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10 px-4 py-12">
        {/* Hero section with gradient */}
        <div className="relative overflow-hidden mb-16 rounded-2xl bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-700 shadow-xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} 
                  className="absolute rounded-full bg-white/20" 
                  style={{ 
                    width: `${Math.random() * 300 + 50}px`, 
                    height: `${Math.random() * 300 + 50}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.5
                  }}
                ></div>
              ))}
            </div>
          </div>
          
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center">
            <div className="mb-8 md:mb-0 md:w-2/3">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-4">
                  <BsStars className="mr-2 text-yellow-300" />
                  AI-Powered DevOps Platform
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  DevOps AI Agent Platform
                </h1>
                <p className="text-lg text-white/80 mb-6 max-w-2xl">
                  Leverage the power of artificial intelligence to streamline your DevOps workflows, 
                  automate routine tasks, and optimize your infrastructure.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center bg-white text-indigo-700 hover:bg-indigo-50 font-medium px-5 py-2.5 rounded-lg transition-colors shadow-md">
                    <BsLightning className="mr-2" />
                    Get Started
                  </button>
                  <button className="flex items-center bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium px-5 py-2.5 rounded-lg transition-colors">
                    Learn More
                    <BsArrowRight className="ml-2" />
                  </button>
                </div>
              </motion.div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 backdrop-blur-sm p-1 flex items-center justify-center">
                  <div className="w-full h-full rounded-full border-2 border-white/20 flex items-center justify-center">
                    <BsRobot className="text-white w-16 h-16 md:w-24 md:h-24" />
                  </div>
                </div>
                <div className="absolute top-0 left-0 right-0 bottom-0 animate-spin-slow opacity-70" style={{ animationDuration: '20s' }}>
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="absolute w-2 h-2 bg-white rounded-full" 
                    style={{ 
                      top: `calc(50% + ${Math.sin(i * Math.PI / 4) * 140}px)`,
                      left: `calc(50% + ${Math.cos(i * Math.PI / 4) * 140}px)`
                    }}></div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Features heading */}
        <div className="text-center mb-12">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 inline-block mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            AI-Enhanced DevOps Features
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Select an operation to get started with AI-powered automation, optimization, and insights.
          </motion.p>
        </div>
        
        {/* Features grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </motion.div>

        {/* AI platform benefits section */}
        <div className="mt-20 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Why AI-Powered DevOps?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform uses advanced AI algorithms to supercharge your DevOps workflows
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Automate Routine Tasks",
                description: "Let AI handle repetitive DevOps tasks while your team focuses on innovation",
                icon: <BsGear className="text-indigo-600" size={24} />
              },
              {
                title: "Optimize Resources",
                description: "AI continuously analyzes and optimizes your cloud infrastructure for cost and performance",
                icon: <BsCloud className="text-blue-600" size={24} />
              },
              {
                title: "Detect Issues Early",
                description: "Proactive issue detection and remediation before they impact your systems",
                icon: <BsShieldCheck className="text-purple-600" size={24} />
              }
            ].map((benefit, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Add floating AI assistant button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button 
          className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <BsRobot size={24} />
          <span className="sr-only">AI Assistant</span>
        </motion.button>
      </div>
      
      {/* Add custom animation class to your global CSS */}
      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
      <AgentChat agentType="home" />
    </div>
  );
}