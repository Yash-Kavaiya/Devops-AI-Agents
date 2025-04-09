'use client';

import { useState, useRef, useEffect } from 'react';
import { BsSend, BsRobot, BsLightningCharge, BsStars } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

interface AgentChatProps {
  agentType: string;
}

export default function AgentChat({ agentType }: AgentChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: `Hello! I'm your ${agentType} AI assistant. How can I help you today?`,
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Add new refs and states for enhanced functionality
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTypingNew, setIsTypingNew] = useState(false);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Simulate AI "thinking" before responding
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setIsTypingNew(true), 300);
      return () => clearTimeout(timer);
    }
    setIsTypingNew(false);
  }, [loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = { role: 'user' as const, content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // In a real application, this would be an API call to your AI service
    setTimeout(() => {
      // Simulate AI response
      const aiResponses: Record<string, string> = {
        "ci-cd": "I've analyzed your pipeline and found an optimization opportunity. Your build steps could be parallelized to reduce execution time by approximately 30%.",
        "cloud-infrastructure": "Based on your usage patterns, I recommend resizing your instances to save costs. Your current utilization is only at 35% capacity.",
        "code-analysis": "I've detected 3 potential code quality issues: 2 memory leaks and 1 race condition in the authentication module.",
        "security-scanning": "Security scan complete. Found 2 medium vulnerabilities in your dependencies. I recommend updating package X to version 2.3.1.",
        "container-orchestration": "I've optimized your container configuration. Resource allocation is now better balanced across your cluster.",
        "performance-monitoring": "I've detected an anomaly in your API response times. There was a 40% increase in latency starting at 2:15 PM today.",
        "load-testing": "Load test results show your system can handle 1000 concurrent users with a 99th percentile response time of 230ms.",
        "incident-response": "I've identified the root cause of the recent outage: a database connection pool exhaustion due to a slow query.",
      };
      
      const aiMessage = { 
        role: 'assistant' as const, 
        content: aiResponses[agentType] || "I'm analyzing your DevOps environment. How can I assist with specific tasks?",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setLoading(false);
    }, 1500); // Slightly longer to show typing animation
  };

  // Get agent-specific theme colors based on agent type
  const getAgentTheme = () => {
    const themes = {
      "ci-cd": "from-blue-600 via-indigo-600 to-indigo-700",
      "cloud-infrastructure": "from-sky-500 via-blue-600 to-blue-700",
      "code-analysis": "from-indigo-600 via-purple-600 to-purple-700",
      "security-scanning": "from-red-500 via-red-600 to-red-700",
      "container-orchestration": "from-cyan-500 via-blue-600 to-blue-700",
      "performance-monitoring": "from-emerald-500 via-teal-600 to-teal-700",
      "load-testing": "from-amber-500 via-orange-500 to-orange-600",
      "incident-response": "from-rose-500 via-red-600 to-red-700",
    };
    
    return themes[agentType as keyof typeof themes] || "from-indigo-600 via-purple-600 to-blue-700";
  };

  const agentTheme = getAgentTheme();
  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <div className="flex flex-col h-[500px] border-0 rounded-xl overflow-hidden shadow-lg bg-white">
      {/* Enhanced Header with Gradient */}
      <div className={`bg-gradient-to-r ${agentTheme} p-5 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative">
              <BsRobot size={20} className="mr-2" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full">
                <span className="absolute inset-0 w-full h-full bg-green-400 rounded-full animate-ping opacity-75"></span>
              </span>
            </div>
            <div>
              <h3 className="font-semibold flex items-center">
                {agentType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} 
                <BsLightningCharge className="ml-2 text-yellow-300" size={14} />
              </h3>
              <div className="text-xs text-white/80 flex items-center mt-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></span>
                Powered by AI
              </div>
            </div>
          </div>
          <div className="flex items-center bg-white/10 rounded-full px-2 py-0.5 text-xs backdrop-blur-sm">
            <BsStars className="mr-1 text-yellow-300" size={10} />
            AI Enhanced
          </div>
        </div>
      </div>
      
      {/* Improved Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white">
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div 
              key={idx} 
              className={`mb-4 ${msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={messageVariants}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 shadow-sm ${
                  msg.role === 'user' 
                    ? `bg-gradient-to-br ${agentTheme} text-white rounded-tr-none` 
                    : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
                }`}
              >
                <div className="mb-1">{msg.content}</div>
                {msg.timestamp && (
                  <div className={`text-xs ${msg.role === 'user' ? 'text-white/70' : 'text-gray-400'} mt-1 text-right`}>
                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Enhanced Typing Indicator */}
        {loading && (
          <motion.div 
            className="flex justify-start mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white border border-gray-100 text-gray-800 rounded-lg rounded-tl-none shadow-sm p-3 max-w-[80%]">
              <div className="flex items-center">
                <div className="mr-2">
                  <BsRobot className="text-gray-400" size={14} />
                </div>
                {isTypingNew ? (
                  <div className="flex space-x-1">
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatType: "loop" }}
                    />
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.8, delay: 0.2, repeat: Infinity, repeatType: "loop" }}
                    />
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.8, delay: 0.4, repeat: Infinity, repeatType: "loop" }}
                    />
                  </div>
                ) : (
                  <div className="text-xs text-gray-500">Analyzing your request...</div>
                )}
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Enhanced Input Area */}
      <form onSubmit={handleSend} className="p-3 border-t border-gray-100 bg-white">
        <div className="flex items-center p-1 bg-gray-50 rounded-lg border border-gray-200 focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the AI agent..."
            className="flex-1 p-2 bg-transparent border-none focus:outline-none text-sm"
            disabled={loading}
          />
          <button 
            type="submit" 
            className={`p-2 rounded-md ${input.trim() ? `bg-gradient-to-r ${agentTheme}` : 'bg-gray-200'} text-white transition-all`}
            disabled={loading || !input.trim()}
          >
            <BsSend />
          </button>
        </div>
        <div className="mt-2 text-center">
          <span className="text-xs text-gray-500">
            AI responses are generated based on your DevOps environment
          </span>
        </div>
      </form>
    </div>
  );
}
