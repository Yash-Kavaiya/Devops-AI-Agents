"use client";

import { useState, useEffect, useRef } from 'react';
import PageLayout from '@/components/PageLayout';
import MultiModalChat from '@/components/MultiModalChat';
import { 
  BsGear, 
  BsCheckCircle, 
  BsArrowRepeat, 
  BsBarChart, 
  BsGithub, 
  BsRobot, 
  BsLightning, 
  BsArrowClockwise,
  BsGit,
  BsPlay,
  BsServer,
  BsTerminal,
  BsQuestionCircle,
  BsChevronDown,
  BsChevronUp,
  BsDash,
  BsPlus,
  BsCodeSquare,
  BsClockHistory,
  BsHourglassSplit,
  BsXCircle,
  BsInfo,
  BsInfoCircle
} from 'react-icons/bs';
import { FaGitlab, FaBitbucket } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Types for our GitHub and AI integration data
interface GitHubWorkflow {
  id: string;
  name: string;
  status: 'success' | 'running' | 'failed';
  lastRun: string;
  duration: string;
  url: string;
  branch: string;
}

interface AIAnalysis {
  id: string;
  suggestion: string;
  improvement: string;
  confidenceScore: number;
  category: 'performance' | 'security' | 'reliability' | 'cost';
  applied: boolean;
}

interface MCPServerStatus {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'error';
  lastStarted?: string;
  port: number;
  endpoint: string;
}

interface GitPlatform {
  id: string;
  name: string;
  icon: JSX.Element;
  connected: boolean;
  url?: string;
}

export default function CiCdPage() {
  // State for GitHub workflows
  const [workflows, setWorkflows] = useState<GitHubWorkflow[]>([]);
  
  // State for AI analysis
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis[]>([]);
  
  // State for MCP servers
  const [mcpServers, setMcpServers] = useState<MCPServerStatus[]>([
    {
      id: 'mcp-1',
      name: 'Production MCP',
      status: 'running',
      lastStarted: new Date().toISOString(),
      port: 8080,
      endpoint: '/api/v1/production'
    },
    {
      id: 'mcp-2',
      name: 'Staging MCP',
      status: 'stopped',
      port: 8081,
      endpoint: '/api/v1/staging'
    },
    {
      id: 'mcp-3',
      name: 'Development MCP',
      status: 'stopped',
      port: 8082,
      endpoint: '/api/v1/development'
    }
  ]);
  
  // Loading states
  const [loading, setLoading] = useState({
    github: false,
    ai: false,
    mcp: false,
    git: false
  });
  
  // Feedback message
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const feedbackTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Git platforms
  const [gitPlatforms, setGitPlatforms] = useState<GitPlatform[]>([
    {
      id: 'github',
      name: 'GitHub',
      icon: <BsGithub size={18} />,
      connected: true,
      url: 'https://github.com/organization/repo'
    },
    {
      id: 'gitlab',
      name: 'GitLab',
      icon: <FaGitlab size={18} />,
      connected: false
    },
    {
      id: 'bitbucket',
      name: 'Bitbucket',
      icon: <FaBitbucket size={18} />,
      connected: false
    }
  ]);

  // AI-generated placeholder questions
  const aiQuestions = [
    "How can I optimize my Docker build steps to reduce build time?",
    "What are the common failure points in my CI pipeline for the feature branch?",
    "How should I configure resource limits for my Kubernetes deployments?"
  ];
  
  // Selected question
  const [selectedQuestion, setSelectedQuestion] = useState('');
  
  // Expanded sections
  const [expandedSections, setExpandedSections] = useState({
    gitPlatforms: true,
    mcpServers: true,
    workflows: true,
    aiQuestions: true,
    aiAnalysis: true
  });

  // Toggle section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Fetch GitHub workflows
  const fetchGitHubWorkflows = async () => {
    setLoading(prev => ({ ...prev, github: true }));
    
    try {
      // In a real implementation, this would be an API call
      // Example: const response = await fetch('/api/github/workflows');
      
      // Simulated data
      setTimeout(() => {
        const mockWorkflows: GitHubWorkflow[] = [
          {
            id: 'wf-1',
            name: 'Main Build Pipeline',
            status: 'success',
            lastRun: new Date(Date.now() - 40 * 60000).toISOString(), // 40 minutes ago
            duration: '8m 12s',
            url: 'https://github.com/organization/repo/actions/workflows/main.yml',
            branch: 'main'
          },
          {
            id: 'wf-2',
            name: 'Integration Tests',
            status: 'running',
            lastRun: new Date(Date.now() - 15 * 60000).toISOString(), // 15 minutes ago
            duration: '15m 47s',
            url: 'https://github.com/organization/repo/actions/workflows/integration.yml',
            branch: 'feature/new-api'
          },
          {
            id: 'wf-3',
            name: 'Deploy to Staging',
            status: 'failed',
            lastRun: new Date(Date.now() - 120 * 60000).toISOString(), // 2 hours ago
            duration: '3m 45s',
            url: 'https://github.com/organization/repo/actions/workflows/deploy-staging.yml',
            branch: 'release/v2.3'
          },
          {
            id: 'wf-4',
            name: 'Security Scan',
            status: 'success',
            lastRun: new Date(Date.now() - 180 * 60000).toISOString(), // 3 hours ago
            duration: '12m 33s',
            url: 'https://github.com/organization/repo/actions/workflows/security.yml',
            branch: 'main'
          }
        ];
        
        setWorkflows(mockWorkflows);
        setLoading(prev => ({ ...prev, github: false }));
      }, 1200);
    } catch (error) {
      console.error("Error fetching GitHub workflows:", error);
      setLoading(prev => ({ ...prev, github: false }));
    }
  };

  // Fetch AI analysis
  const fetchAIAnalysis = async () => {
    setLoading(prev => ({ ...prev, ai: true }));
    
    try {
      // In a real implementation, this would analyze the workflows
      // Example: const response = await fetch('/api/ai/analyze-workflows', { method: 'POST', body: JSON.stringify({ workflows }) });
      
      // Simulated data
      setTimeout(() => {
        const mockAnalysis: AIAnalysis[] = [
          {
            id: 'ai-1',
            suggestion: 'Optimize Docker Image Caching',
            improvement: 'Current Docker build times could be reduced by ~42% by implementing proper layer caching strategies in your Dockerfiles.',
            confidenceScore: 0.89,
            category: 'performance',
            applied: false
          },
          {
            id: 'ai-2',
            suggestion: 'Parallelize Test Execution',
            improvement: 'Split your test suite into multiple parallel jobs to reduce total build time by approximately 65%.',
            confidenceScore: 0.78,
            category: 'performance',
            applied: false
          },
          {
            id: 'ai-3',
            suggestion: 'Add Secret Scanning',
            improvement: 'Implement automated secret scanning in your pipeline to detect potential credential leaks before they reach production.',
            confidenceScore: 0.95,
            category: 'security',
            applied: false
          }
        ];
        
        setAiAnalysis(mockAnalysis);
        setLoading(prev => ({ ...prev, ai: false }));
      }, 2000);
    } catch (error) {
      console.error("Error fetching AI analysis:", error);
      setLoading(prev => ({ ...prev, ai: false }));
    }
  };

  // Apply AI optimization
  const applyAIOptimization = (id: string) => {
    setAiAnalysis(prev => 
      prev.map(item => 
        item.id === id ? { ...item, applied: true } : item
      )
    );
    
    setFeedbackMessage(`Optimization "${aiAnalysis.find(a => a.id === id)?.suggestion}" has been applied successfully.`);
  };

  // Toggle MCP server
  const toggleMcpServer = async (serverId: string) => {
    setLoading(prev => ({ ...prev, mcp: true }));
    
    try {
      // In a real implementation, this would start/stop the server
      // Example: await fetch(`/api/mcp/${serverId}/toggle`, { method: 'POST' });
      
      // Simulated logic
      setTimeout(() => {
        const updatedServers = mcpServers.map(s => {
          if (s.id === serverId) {
            // Fix: Explicitly casting the status to the allowed types
            const newStatus = s.status === 'running' ? 'stopped' as const : 'running' as const;
            const lastStarted = newStatus === 'running' ? new Date().toISOString() : s.lastStarted;
            
            return {
              ...s,
              status: newStatus,
              lastStarted
            };
          }
          
          return s;
        });
        
        setMcpServers(updatedServers);
        setLoading(prev => ({ ...prev, mcp: false }));
        
        const server = updatedServers.find(s => s.id === serverId);
        if (server?.status === 'running') {
          showFeedbackMessage(`MCP Server "${server.name}" started on port ${server.port}`);
        } else {
          showFeedbackMessage(`MCP Server "${server?.name}" stopped`);
        }
      }, 1500);
    } catch (error) {
      console.error("Error toggling MCP server:", error);
      setLoading(prev => ({ ...prev, mcp: false }));
      showFeedbackMessage('Failed to toggle server. Please try again.');
    }
  };

  // Connect to Git platform
  const connectGitPlatform = async (platformId: string) => {
    setLoading(prev => ({ ...prev, git: true }));
    
    try {
      // In a real implementation, this would authenticate with the Git service
      // Example: window.open(`/api/auth/${platformId}`, '_blank');
      
      // Simulated logic
      setTimeout(() => {
        const updatedPlatforms = gitPlatforms.map(p => {
          if (p.id === platformId) {
            return {
              ...p,
              connected: !p.connected,
              url: !p.connected ? `https://${p.id}.com/organization/repo` : undefined
            };
          }
          return p;
        });
        
        setGitPlatforms(updatedPlatforms);
        setLoading(prev => ({ ...prev, git: false }));
        
        const platform = updatedPlatforms.find(p => p.id === platformId);
        if (platform?.connected) {
          showFeedbackMessage(`Connected to ${platform.name} successfully`);
        } else {
          showFeedbackMessage(`Disconnected from ${platform?.name}`);
        }
      }, 1000);
    } catch (error) {
      console.error(`Error connecting to ${platformId}:`, error);
      setLoading(prev => ({ ...prev, git: false }));
      showFeedbackMessage(`Failed to connect to ${platformId}. Please try again.`);
    }
  };

  // Ask AI a question
  const askAIQuestion = (question: string) => {
    setSelectedQuestion(question);
    showFeedbackMessage(`Analyzing: "${question}". The AI is processing your question...`);
    
    // In a real implementation, this would send the question to an AI service
    // Example: fetch('/api/ai/ask', { method: 'POST', body: JSON.stringify({ question }) });
    
    setTimeout(() => {
      showFeedbackMessage(`AI Response: Based on my analysis of your CI/CD pipelines, I recommend optimizing your test parallelization strategy. You could reduce build times by up to 35% with proper test distribution across multiple runners.`);
    }, 2000);
  };

  // Helper function to show feedback message with auto-dismiss
  const showFeedbackMessage = (message: string) => {
    setFeedbackMessage(message);
    
    // Clear any existing timeout
    if (feedbackTimeout.current) {
      clearTimeout(feedbackTimeout.current);
    }
    
    // Set new timeout to clear message after 8 seconds
    feedbackTimeout.current = setTimeout(() => {
      setFeedbackMessage('');
    }, 8000);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (feedbackTimeout.current) {
        clearTimeout(feedbackTimeout.current);
      }
    };
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    fetchGitHubWorkflows();
  }, []);

  // Fetch AI analysis after workflows are loaded
  useEffect(() => {
    if (workflows.length > 0) {
      fetchAIAnalysis();
    }
  }, [workflows]);

  return (
    <PageLayout
      title="CI/CD Pipeline Management"
      description="Optimize your continuous integration and delivery pipelines with AI-driven insights."
      agentType="ci-cd"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="card p-4 border-l-4 border-l-green-500">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-msGray-600">Total Workflows</div>
              <div className="text-2xl font-semibold">{workflows.length}</div>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <BsCodeSquare size={20} className="text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="card p-4 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-msGray-600">Running Workflows</div>
              <div className="text-2xl font-semibold">{workflows.filter(w => w.status === 'running').length}</div>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <BsHourglassSplit size={20} className="text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="card p-4 border-l-4 border-l-red-500">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-msGray-600">Failed Workflows</div>
              <div className="text-2xl font-semibold">{workflows.filter(w => w.status === 'failed').length}</div>
            </div>
            <div className="p-3 rounded-full bg-red-100">
              <BsXCircle size={20} className="text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Git Platform Integration */}
      <motion.div 
        className="card mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => toggleSection('gitPlatforms')}>
          <div className="flex items-center">
            <BsGit size={20} className="text-msBlue-600 mr-2" />
            <h3 className="text-xl font-semibold">Git Platform Integration</h3>
          </div>
          <button className="text-msGray-500 hover:text-msGray-700">
            {expandedSections.gitPlatforms ? <BsChevronUp /> : <BsChevronDown />}
          </button>
        </div>
        
        <AnimatePresence>
          {expandedSections.gitPlatforms && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {gitPlatforms.map(platform => (
                  <div 
                    key={platform.id} 
                    className={`border rounded-md p-4 transition-all duration-300 ${
                      platform.connected 
                        ? 'bg-green-50 border-green-200 hover:border-green-300' 
                        : 'bg-msGray-50 border-msGray-200 hover:border-msGray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <span className="mr-2 text-msGray-600">{platform.icon}</span>
                        <h4 className="font-medium">{platform.name}</h4>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        platform.connected 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-msGray-200 text-msGray-600'
                      }`}>
                        {platform.connected ? 'Connected' : 'Disconnected'}
                      </span>
                    </div>
                    
                    {platform.connected && platform.url && (
                      <div className="text-xs text-msGray-600 mb-3 truncate">
                        Repository: <a href={platform.url} target="_blank" rel="noopener noreferrer" className="text-msBlue-600 hover:underline">{platform.url}</a>
                      </div>
                    )}
                    
                    <button
                      onClick={() => connectGitPlatform(platform.id)}
                      className={`w-full text-sm py-1.5 rounded-md transition-colors ${
                        platform.connected 
                          ? 'bg-msGray-100 hover:bg-msGray-200 text-msGray-700' 
                          : 'bg-msBlue-600 hover:bg-msBlue-700 text-white'
                      }`}
                      disabled={loading.git}
                    >
                      {platform.connected ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
              <div className="text-sm text-msGray-600 bg-msBlue-50 p-3 rounded-md border border-msBlue-100 flex items-start">
                <BsInfoCircle className="text-msBlue-600 mr-2 mt-0.5" />
                <p>Connect your Git repositories to enable automatic workflow discovery and CI/CD pipeline integration.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* MCP Server Controls */}
      <motion.div 
        className="card mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => toggleSection('mcpServers')}>
          <div className="flex items-center">
            <BsServer size={20} className="text-msBlue-600 mr-2" />
            <h3 className="text-xl font-semibold">MCP Server Controls</h3>
          </div>
          <button className="text-msGray-500 hover:text-msGray-700">
            {expandedSections.mcpServers ? <BsChevronUp /> : <BsChevronDown />}
          </button>
        </div>
        
        <AnimatePresence>
          {expandedSections.mcpServers && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                {mcpServers.map(server => (
                  <div key={server.id} className="border rounded-md p-4 bg-white hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium mb-1">{server.name}</h4>
                        <div className="text-sm text-msGray-600">
                          <span className="mr-3">Endpoint: {server.endpoint}</span>
                          {server.status === 'running' && server.lastStarted && (
                            <span>Started: {new Date(server.lastStarted).toLocaleTimeString()}</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <span className={`flex items-center mr-3 px-2 py-1 rounded-full text-xs ${
                          server.status === 'running' 
                            ? 'bg-green-100 text-green-700' 
                            : server.status === 'error'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-msGray-200 text-msGray-600'
                        }`}>
                          <span className={`w-2 h-2 rounded-full mr-1 ${
                            server.status === 'running' 
                              ? 'bg-green-500' 
                              : server.status === 'error'
                                ? 'bg-red-500'
                                : 'bg-msGray-500'
                          }`}></span>
                          {server.status.charAt(0).toUpperCase() + server.status.slice(1)}
                        </span>
                        
                        <button
                          onClick={() => toggleMcpServer(server.id)}
                          className={`flex items-center rounded-md px-3 py-1.5 text-sm transition-colors ${
                            server.status === 'running'
                              ? 'bg-msGray-100 hover:bg-msGray-200 text-msGray-700'
                              : 'bg-msBlue-600 hover:bg-msBlue-700 text-white'
                          }`}
                          disabled={loading.mcp}
                        >
                          {server.status === 'running' ? (
                            <>
                              <BsTerminal className="mr-1" />
                              Stop Server
                            </>
                          ) : (
                            <>
                              <BsPlay className="mr-1" />
                              Start Server
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    
                    {server.status === 'running' && (
                      <motion.div 
                        className="mt-3 pt-3 border-t border-green-200"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center text-sm">
                          <span className="font-medium text-msGray-700 mr-1">Server URL:</span>
                          <code className="bg-green-50 px-2 py-1 rounded text-green-800 font-mono">http://localhost:{server.port}{server.endpoint}</code>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* GitHub Workflow Integration */}
      <motion.div 
        className="card mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => toggleSection('workflows')}>
          <div className="flex items-center">
            <BsGithub size={20} className="text-msBlue-600 mr-2" />
            <h3 className="text-xl font-semibold">GitHub Workflow Status</h3>
          </div>
          <div className="flex items-center">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                fetchGitHubWorkflows();
              }}
              className="flex items-center bg-msGray-100 hover:bg-msGray-200 rounded-md px-3 py-1 text-sm mr-2"
              disabled={loading.github}
            >
              <BsArrowClockwise className={`mr-1 ${loading.github ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button className="text-msGray-500 hover:text-msGray-700">
              {expandedSections.workflows ? <BsChevronUp /> : <BsChevronDown />}
            </button>
          </div>
        </div>
        
        <AnimatePresence>
          {expandedSections.workflows && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {loading.github ? (
                <div className="flex justify-center items-center py-8">
                  <BsArrowClockwise className="animate-spin text-msBlue-600 mr-2" />
                  <span>Loading workflows...</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {workflows.map(workflow => (
                    <div 
                      key={workflow.id} 
                      className={`border rounded-md p-4 transition-all duration-200 ${
                        workflow.status === 'success'
                          ? 'bg-green-50 border-green-200'
                          : workflow.status === 'running'
                            ? 'bg-blue-50 border-blue-200'
                            : 'bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <div>
                          <div className="flex items-center mb-1">
                            {workflow.status === 'success' && <BsCheckCircle className="text-green-600 mr-1" />}
                            {workflow.status === 'running' && <BsArrowRepeat className="text-blue-600 animate-spin mr-1" />}
                            {workflow.status === 'failed' && <BsXCircle className="text-red-600 mr-1" />}
                            <h4 className="font-medium">{workflow.name}</h4>
                            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-msGray-200 text-msGray-700">{workflow.branch}</span>
                          </div>
                          <div className="flex flex-wrap text-sm text-msGray-600">
                            <span className="mr-3">
                              Last Run: {new Date(workflow.lastRun).toLocaleString()}
                            </span>
                            <span className="mr-3">
                              Duration: {workflow.duration}
                            </span>
                            <a 
                              href={workflow.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-msBlue-600 hover:underline text-sm"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Details
                            </a>
                          </div>
                        </div>
                        
                        <div className="mt-2 sm:mt-0">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                            workflow.status === 'success'
                              ? 'bg-green-100 text-green-800'
                              : workflow.status === 'running'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                          }`}>
                            {workflow.status === 'success' && 'Success'}
                            {workflow.status === 'running' && 'Running'}
                            {workflow.status === 'failed' && 'Failed'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* AI Questions & Analysis */}
      <motion.div 
        className="card mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div className="flex items-center mb-4 justify-between cursor-pointer" onClick={() => toggleSection('aiQuestions')}>
          <div className="flex items-center">
            <BsQuestionCircle size={20} className="text-msBlue-600 mr-2" />
            <h3 className="text-xl font-semibold">Ask AI About Your CI/CD</h3>
          </div>
          <button className="text-msGray-500 hover:text-msGray-700">
            {expandedSections.aiQuestions ? <BsChevronUp /> : <BsChevronDown />}
          </button>
        </div>
        
        <AnimatePresence>
          {expandedSections.aiQuestions && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-3 mb-4">
                <p className="text-msGray-600">Select a question or type your own:</p>
                
                <div className="space-y-2">
                  {aiQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => askAIQuestion(question)}
                      className={`block w-full text-left p-3 rounded-md border hover:bg-msBlue-50 hover:border-msBlue-200 transition-colors ${
                        selectedQuestion === question
                          ? 'bg-msBlue-50 border-msBlue-300 shadow-sm'
                          : 'bg-white border-msGray-200'
                      }`}
                    >
                      {question}
                    </button>
                  ))}
                </div>
                
                <div className="flex mt-4">
                  <input
                    type="text"
                    placeholder="Ask a custom question about your CI/CD pipelines..."
                    className="flex-grow px-4 py-2 border border-msGray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-msBlue-500"
                    onKeyPress={(e) => e.key === 'Enter' && askAIQuestion(e.currentTarget.value)}
                  />
                  <button
                    onClick={() => {
                      const input = document.querySelector('input') as HTMLInputElement;
                      if (input.value) {
                        askAIQuestion(input.value);
                        input.value = '';
                      }
                    }}
                    className="bg-msBlue-600 hover:bg-msBlue-700 text-white px-4 py-2 rounded-r-md"
                  >
                    Ask AI
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* AI Analysis Integration */}
      <motion.div 
        className="card mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => toggleSection('aiAnalysis')}>
          <div className="flex items-center">
            <BsRobot size={20} className="text-msBlue-600 mr-2" />
            <h3 className="text-xl font-semibold">AI Pipeline Analysis</h3>
          </div>
          <div className="flex items-center">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                fetchAIAnalysis();
              }}
              className="flex items-center bg-msGray-100 hover:bg-msGray-200 rounded-md px-3 py-1 text-sm mr-2"
              disabled={loading.ai || workflows.length === 0}
            >
              <BsArrowClockwise className={`mr-1 ${loading.ai ? 'animate-spin' : ''}`} />
              Analyze
            </button>
            <button className="text-msGray-500 hover:text-msGray-700">
              {expandedSections.aiAnalysis ? <BsChevronUp /> : <BsChevronDown />}
            </button>
          </div>
        </div>
        
        <AnimatePresence>
          {expandedSections.aiAnalysis && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {loading.ai ? (
                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                  <div className="flex items-center">
                    <BsRobot className="text-msBlue-600 mr-2" size={24} />
                    <span className="text-msGray-700 font-medium">AI analyzing your CI/CD pipelines...</span>
                  </div>
                  <div className="w-48 h-1.5 bg-msGray-200 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-msBlue-600 rounded-full" 
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  {aiAnalysis.length > 0 ? (
                    <div className="space-y-4">
                      {aiAnalysis.map(analysis => (
                        <div 
                          key={analysis.id} 
                          className={`border rounded-md p-4 ${
                            analysis.applied
                              ? 'bg-green-50 border-green-200'
                              : 'bg-white border-msGray-200 hover:border-msBlue-200 transition-colors'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className={`px-2 py-1 rounded-full text-xs ${
                              analysis.category === 'performance'
                                ? 'bg-blue-100 text-blue-800'
                                : analysis.category === 'security'
                                  ? 'bg-red-100 text-red-800'
                                  : analysis.category === 'reliability'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-green-100 text-green-800'
                            }`}>
                              {analysis.category.charAt(0).toUpperCase() + analysis.category.slice(1)}
                            </div>
                            <div className="flex items-center">
                              <BsBarChart className="text-msGray-600 mr-1" />
                              <span className="text-sm text-msGray-600">
                                Confidence: {Math.round(analysis.confidenceScore * 100)}%
                              </span>
                            </div>
                          </div>
                          <h4 className="text-lg font-medium mb-1">{analysis.suggestion}</h4>
                          <p className="text-msGray-600 mb-3">{analysis.improvement}</p>
                          {!analysis.applied && (
                            <div className="flex justify-end">
                              <button
                                onClick={() => applyAIOptimization(analysis.id)}
                                className="flex items-center bg-msBlue-600 hover:bg-msBlue-700 text-white rounded-md px-3 py-1 text-sm transition-colors"
                              >
                                <BsLightning className="mr-1" />
                                Apply Optimization
                              </button>
                            </div>
                          )}
                          {analysis.applied && (
                            <div className="flex items-center text-green-600">
                              <BsCheckCircle className="mr-1" />
                              <span className="text-sm font-medium">Optimization Applied</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-msGray-500">
                      <BsRobot size={32} className="mx-auto mb-2 text-msGray-400" />
                      <p>No AI analysis available yet. Click "Analyze" to get started.</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Feedback message */}
      <AnimatePresence>
        {feedbackMessage && (
          <motion.div 
            className="mt-4 p-3 bg-msBlue-100 text-msBlue-800 rounded-md shadow-sm border border-msBlue-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {feedbackMessage}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Multi-Modal AI Chat Widget */}
      <MultiModalChat />
    </PageLayout>
  );
}
