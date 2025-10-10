"use client";
import { useState, useRef, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import MultiModalChat from '@/components/MultiModalChat';
import {
  BsFillGrid3X3GapFill,
  BsCpu,
  BsCheckCircleFill,
  BsArrowRepeat,
  BsGearWideConnected,
  BsPlusCircle,
  BsArrowClockwise,
  BsTrash,
  BsChevronDown,
  BsChevronUp,
  BsDash,  // Changed from BsMinus
  BsPlus,
  BsHddNetwork,
  BsServer,
  BsCloudUpload,
  BsShieldCheck,
  BsInfoCircle,
  BsExclamationTriangle,
  BsClipboardCheck,
  BsGraphUp,
  BsBarChart
} from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';

interface Cluster {
  id: string;
  name: string;
  status: 'running' | 'pending' | 'failed';
  nodeCount: number;
  workloads: number;
  region: string;
}

interface Deployment {
  id: string;
  name: string;
  status: 'running' | 'pending' | 'failed';
  replicas: number;
  cpu: string;
  memory: string;
  created: string;
}

interface Metric {
  name: string;
  value: number;
  unit: string;
  change: number;
}

export default function ContainerOrchestrationPage() {
  // State for clusters
  const [clusters, setClusters] = useState<Cluster[]>([
    { id: 'cluster-1', name: 'Production Cluster', status: 'running', nodeCount: 5, workloads: 12, region: 'us-east-1' },
    { id: 'cluster-2', name: 'Staging Cluster', status: 'pending', nodeCount: 3, workloads: 7, region: 'eu-west-1' },
    { id: 'cluster-3', name: 'Development Cluster', status: 'running', nodeCount: 2, workloads: 5, region: 'ap-southeast-1' }
  ]);
  
  // State for deployments
  const [deployments, setDeployments] = useState<Deployment[]>([
    { 
      id: 'dep-1', 
      name: 'frontend-app', 
      status: 'running', 
      replicas: 3, 
      cpu: '200m', 
      memory: '512Mi',
      created: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    { 
      id: 'dep-2', 
      name: 'backend-api', 
      status: 'running', 
      replicas: 2, 
      cpu: '500m', 
      memory: '1Gi',
      created: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    { 
      id: 'dep-3', 
      name: 'database', 
      status: 'pending', 
      replicas: 1, 
      cpu: '1000m', 
      memory: '2Gi',
      created: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]);
  
  // Performance metrics
  const [metrics, setMetrics] = useState<Metric[]>([
    { name: 'CPU Usage', value: 42, unit: '%', change: -5 },
    { name: 'Memory Usage', value: 65, unit: '%', change: 8 },
    { name: 'Network I/O', value: 25.4, unit: 'MB/s', change: 12 },
    { name: 'Disk I/O', value: 8.7, unit: 'MB/s', change: -3 }
  ]);
  
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const feedbackTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Expanded sections
  const [expandedSections, setExpandedSections] = useState({
    clusters: true,
    deployments: true,
    metrics: true,
    actions: true
  });

  // Toggle section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle deployment
  const handleDeployWorkload = () => {
    setLoading(true);
    setTimeout(() => {
      const newDeployment: Deployment = {
        id: `dep-${deployments.length + 1}`,
        name: `new-service-${Math.floor(Math.random() * 100)}`,
        status: 'pending',
        replicas: 1,
        cpu: '100m',
        memory: '256Mi',
        created: new Date().toISOString()
      };
      
      setDeployments(prev => [...prev, newDeployment]);
      showFeedbackMessage('New workload deployment initiated! The service will be available shortly.');
      setLoading(false);
      
      // Simulate deployment completion
      setTimeout(() => {
        setDeployments(prev => 
          prev.map(d => 
            d.id === newDeployment.id 
              ? { ...d, status: 'running' }
              : d
          )
        );
        showFeedbackMessage('Deployment complete! New service is now running.');
      }, 3000);
    }, 1000);
  };

  // Scaling clusters
  const scaleCluster = (id: string, increment: number) => {
    setLoading(true);
    setTimeout(() => {
      setClusters(prev => prev.map(cluster => {
        if (cluster.id === id) {
          const newNodeCount = Math.max(1, cluster.nodeCount + increment);
          return { ...cluster, nodeCount: newNodeCount };
        }
        return cluster;
      }));
      showFeedbackMessage(`Cluster ${id} scaled by ${increment > 0 ? '+' : ''}${increment} node(s).`);
      setLoading(false);
    }, 1000);
  };

  // Health checks
  const runHealthCheck = () => {
    setLoading(true);
    setTimeout(() => {
      // Simulate health check results
      const healthIssues = Math.random() > 0.7;
      
      if (healthIssues) {
        // Find a random cluster to have issues
        const randomClusterIndex = Math.floor(Math.random() * clusters.length);
        setClusters(prev => 
          prev.map((cluster, index) => 
            index === randomClusterIndex 
              ? { ...cluster, status: 'failed' }
              : cluster
          )
        );
        showFeedbackMessage(`Health check detected issues with cluster ${clusters[randomClusterIndex].name}. Remediation recommended.`);
      } else {
        showFeedbackMessage('All clusters passed health checks. Systems operating normally.');
      }
      
      setLoading(false);
    }, 1500);
  };

  // Rolling updates
  const performRollingUpdate = (id: string) => {
    setLoading(true);
    setTimeout(() => {
      showFeedbackMessage(`Rolling update initiated for cluster ${id}.`);
      
      // Update first to pending status
      setClusters(prev => 
        prev.map(cluster => 
          cluster.id === id 
            ? { ...cluster, status: 'pending' }
            : cluster
        )
      );
      
      // Then simulate completion after delay
      setTimeout(() => {
        setClusters(prev => 
          prev.map(cluster => 
            cluster.id === id 
              ? { ...cluster, status: 'running' }
              : cluster
          )
        );
        showFeedbackMessage(`Rolling update completed for cluster ${id}. All nodes are now running the latest version.`);
      }, 3000);
      
      setLoading(false);
    }, 1200);
  };
  
  // Delete deployment
  const deleteDeployment = (id: string) => {
    setLoading(true);
    setTimeout(() => {
      const deployment = deployments.find(d => d.id === id);
      setDeployments(prev => prev.filter(d => d.id !== id));
      showFeedbackMessage(`Deployment "${deployment?.name}" has been deleted.`);
      setLoading(false);
    }, 1000);
  };
  
  // Scale deployment
  const scaleDeployment = (id: string, replicas: number) => {
    setLoading(true);
    setTimeout(() => {
      setDeployments(prev => 
        prev.map(deployment => 
          deployment.id === id 
            ? { ...deployment, replicas }
            : deployment
        )
      );
      showFeedbackMessage(`Deployment scaled to ${replicas} replica${replicas !== 1 ? 's' : ''}.`);
      setLoading(false);
    }, 800);
  };
  
  // Helper function to show feedback message with auto-dismiss
  const showFeedbackMessage = (message: string) => {
    setFeedback(message);
    
    // Clear any existing timeout
    if (feedbackTimeout.current) {
      clearTimeout(feedbackTimeout.current);
    }
    
    // Set new timeout to clear message after 6 seconds
    feedbackTimeout.current = setTimeout(() => {
      setFeedback('');
    }, 6000);
  };
  
  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (feedbackTimeout.current) {
        clearTimeout(feedbackTimeout.current);
      }
    };
  }, []);
  
  // Refresh metrics periodically
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      setMetrics(prev => 
        prev.map(metric => ({
          ...metric,
          value: Math.max(0, Math.min(100, metric.value + (Math.random() * 10 - 5))),
          change: Math.round((Math.random() * 20 - 10) * 10) / 10
        }))
      );
    }, 10000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <PageLayout
      title="Container Orchestration"
      description="Manage your containerized workloads like a pro."
      agentType="container-orchestration"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="card p-4 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-msGray-600">Total Clusters</div>
              <div className="text-2xl font-semibold">{clusters.length}</div>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <BsFillGrid3X3GapFill size={20} className="text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="card p-4 border-l-4 border-l-green-500">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-msGray-600">Total Nodes</div>
              <div className="text-2xl font-semibold">{clusters.reduce((acc, cluster) => acc + cluster.nodeCount, 0)}</div>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <BsServer size={20} className="text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="card p-4 border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-msGray-600">Deployments</div>
              <div className="text-2xl font-semibold">{deployments.length}</div>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <BsCloudUpload size={20} className="text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="card p-4 border-l-4 border-l-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-msGray-600">Total Workloads</div>
              <div className="text-2xl font-semibold">{clusters.reduce((acc, cluster) => acc + cluster.workloads, 0)}</div>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <BsHddNetwork size={20} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Cluster Overview */}
      <motion.div 
        className="card mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => toggleSection('clusters')}>
          <div className="flex items-center">
            <BsFillGrid3X3GapFill className="mr-2 text-msBlue-600" size={20} />
            <h3 className="text-xl font-semibold">Cluster Overview</h3>
          </div>
          <div className="flex items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                runHealthCheck();
              }}
              className="bg-msGray-100 hover:bg-msGray-200 text-sm px-3 py-1 rounded mr-3 flex items-center"
              disabled={loading}
            >
              <BsGearWideConnected className={`mr-1 ${loading ? 'animate-spin' : ''}`} />
              Health Check
            </button>
            <button className="text-msGray-500 hover:text-msGray-700">
              {expandedSections.clusters ? <BsChevronUp /> : <BsChevronDown />}
            </button>
          </div>
        </div>
        
        <AnimatePresence>
          {expandedSections.clusters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clusters.map(cluster => (
                  <div
                    key={cluster.id}
                    className={`px-4 py-3 rounded border ${
                      cluster.status === 'running' ? 'border-green-300 bg-green-50' :
                      cluster.status === 'failed' ? 'border-red-300 bg-red-50' :
                      'border-yellow-300 bg-yellow-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium flex items-center">
                          {cluster.status === 'running' && <BsCheckCircleFill className="text-green-500 mr-1" />}
                          {cluster.status === 'pending' && <BsArrowRepeat className="text-yellow-500 animate-spin mr-1" />}
                          {cluster.status === 'failed' && <BsExclamationTriangle className="text-red-500 mr-1" />}
                          {cluster.name}
                        </h3>
                        <div className="text-sm text-msGray-600 mb-2">
                          <span className="mr-3">Region: {cluster.region}</span>
                          <span className="mr-3">Nodes: {cluster.nodeCount}</span>
                          <span>Workloads: {cluster.workloads}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        cluster.status === 'running' ? 'bg-green-100 text-green-800' :
                        cluster.status === 'failed' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {cluster.status.charAt(0).toUpperCase() + cluster.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      <div className="flex items-center border rounded-md overflow-hidden">
                        <button 
                          onClick={() => scaleCluster(cluster.id, -1)}
                          className="px-2 py-1 bg-msGray-100 hover:bg-msGray-200 border-r text-msGray-700"
                          disabled={loading || cluster.nodeCount <= 1}
                        >
                          <BsDash size={14} />  {/* Changed from BsMinus */}
                        </button>
                        <div className="px-3 py-1 bg-white text-sm">
                          {cluster.nodeCount} Nodes
                        </div>
                        <button 
                          onClick={() => scaleCluster(cluster.id, 1)}
                          className="px-2 py-1 bg-msGray-100 hover:bg-msGray-200 border-l text-msGray-700"
                          disabled={loading}
                        >
                          <BsPlus size={14} />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => performRollingUpdate(cluster.id)}
                        className="flex items-center text-sm px-3 py-1 rounded-md border border-msBlue-200 bg-msBlue-50 hover:bg-msBlue-100 text-msBlue-800"
                        disabled={loading || cluster.status !== 'running'}
                      >
                        <BsArrowClockwise className="mr-1" />
                        Rolling Update
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-sm text-msGray-600 bg-msBlue-50 p-3 rounded-md border border-msBlue-100 flex items-start">
                <BsInfoCircle className="text-msBlue-600 mr-2 mt-0.5 flex-shrink-0" />
                <p>Clusters represent your Kubernetes or Docker Swarm environments. Use the controls to scale nodes up or down based on your workload requirements.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Deployments */}
      <motion.div 
        className="card mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => toggleSection('deployments')}>
          <div className="flex items-center">
            <BsCloudUpload className="mr-2 text-msBlue-600" size={20} />
            <h3 className="text-xl font-semibold">Deployments</h3>
          </div>
          <div className="flex items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeployWorkload();
              }}
              className="bg-msBlue-600 hover:bg-msBlue-700 text-white text-sm px-3 py-1 rounded mr-3 flex items-center"
              disabled={loading}
            >
              <BsPlusCircle className="mr-1" />
              New Deployment
            </button>
            <button className="text-msGray-500 hover:text-msGray-700">
              {expandedSections.deployments ? <BsChevronUp /> : <BsChevronDown />}
            </button>
          </div>
        </div>
        
        <AnimatePresence>
          {expandedSections.deployments && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-msGray-200">
                  <thead className="bg-msGray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-msGray-600 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-msGray-600 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-msGray-600 uppercase tracking-wider">Replicas</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-msGray-600 uppercase tracking-wider">Resources</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-msGray-600 uppercase tracking-wider">Created</th>
                      <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-msGray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-msGray-200">
                    {deployments.map((deployment) => (
                      <tr key={deployment.id} className="hover:bg-msGray-50">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="font-medium text-msGray-800">{deployment.name}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                            deployment.status === 'running' ? 'bg-green-100 text-green-800' :
                            deployment.status === 'failed' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {deployment.status === 'running' && <BsCheckCircleFill className="mr-1" />}
                            {deployment.status === 'pending' && <BsArrowRepeat className="mr-1 animate-spin" />}
                            {deployment.status === 'failed' && <BsExclamationTriangle className="mr-1" />}
                            {deployment.status.charAt(0).toUpperCase() + deployment.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center space-x-1">
                            <button 
                              onClick={() => scaleDeployment(deployment.id, Math.max(1, deployment.replicas - 1))}
                              className="p-1 text-msGray-500 hover:text-msGray-700 rounded"
                              disabled={deployment.replicas <= 1 || deployment.status !== 'running'}
                            >
                              <BsDash size={10} />  {/* Changed from BsMinus */}
                            </button>
                            <span className="text-sm font-medium">{deployment.replicas}</span>
                            <button 
                              onClick={() => scaleDeployment(deployment.id, deployment.replicas + 1)}
                              className="p-1 text-msGray-500 hover:text-msGray-700 rounded"
                              disabled={deployment.status !== 'running'}
                            >
                              <BsPlus size={10} />
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <div className="text-msGray-600">
                            CPU: <span className="font-medium">{deployment.cpu}</span>
                          </div>
                          <div className="text-msGray-600">
                            Memory: <span className="font-medium">{deployment.memory}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-msGray-600">
                          {new Date(deployment.created).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                          <button
                            onClick={() => deleteDeployment(deployment.id)}
                            className="text-red-600 hover:text-red-800 mr-2"
                            title="Delete Deployment"
                          >
                            <BsTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {deployments.length === 0 && (
                <div className="text-center py-8 text-msGray-500">
                  <p>No deployments found. Click "New Deployment" to create one.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Performance Metrics */}
      <motion.div 
        className="card mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => toggleSection('metrics')}>
          <div className="flex items-center">
            <BsGraphUp className="mr-2 text-msBlue-600" size={20} />
            <h3 className="text-xl font-semibold">Performance Metrics</h3>
          </div>
          <button className="text-msGray-500 hover:text-msGray-700">
            {expandedSections.metrics ? <BsChevronUp /> : <BsChevronDown />}
          </button>
        </div>
        
        <AnimatePresence>
          {expandedSections.metrics && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {metrics.map((metric) => (
                  <div key={metric.name} className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{metric.name}</h4>
                      <div className={`flex items-center text-xs ${
                        metric.change > 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {metric.change > 0 ? '↑' : '↓'} {Math.abs(metric.change)}%
                      </div>
                    </div>
                    
                    <div className="flex items-end mb-2">
                      <div className="text-2xl font-semibold">{metric.value.toFixed(1)}</div>
                      <div className="text-sm text-msGray-600 ml-1">{metric.unit}</div>
                    </div>
                    
                    <div className="w-full h-2 bg-msGray-200 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full rounded-full ${
                          metric.value > 80 ? 'bg-red-500' :
                          metric.value > 60 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        initial={{ width: '0%' }}
                        animate={{ width: `${Math.min(100, metric.value)}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-sm text-msGray-600 bg-msBlue-50 p-3 rounded-md border border-msBlue-100 flex items-start">
                <BsInfoCircle className="text-msBlue-600 mr-2 mt-0.5 flex-shrink-0" />
                <p>These metrics provide a real-time overview of your container infrastructure performance. Data refreshes every 10 seconds.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Quick Actions */}
      <motion.div 
        className="card mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => toggleSection('actions')}>
          <div className="flex items-center">
            <BsGearWideConnected className="mr-2 text-msBlue-600" size={20} />
            <h3 className="text-xl font-semibold">Quick Actions</h3>
          </div>
          <button className="text-msGray-500 hover:text-msGray-700">
            {expandedSections.actions ? <BsChevronUp /> : <BsChevronDown />}
          </button>
        </div>
        
        <AnimatePresence>
          {expandedSections.actions && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <button 
                  className="p-4 border rounded-md hover:bg-msGray-50 flex flex-col items-center text-msGray-800 transition-colors"
                  onClick={runHealthCheck}
                >
                  <BsShieldCheck className="text-msBlue-600 mb-2" size={24} />
                  <span className="text-sm font-medium">Health Check</span>
                </button>
                
                <button 
                  className="p-4 border rounded-md hover:bg-msGray-50 flex flex-col items-center text-msGray-800 transition-colors"
                  onClick={handleDeployWorkload}
                >
                  <BsCloudUpload className="text-msBlue-600 mb-2" size={24} />
                  <span className="text-sm font-medium">Deploy Workload</span>
                </button>
                
                <button 
                  className="p-4 border rounded-md hover:bg-msGray-50 flex flex-col items-center text-msGray-800 transition-colors"
                  onClick={() => showFeedbackMessage("Network policies updated successfully.")}
                >
                  <BsHddNetwork className="text-msBlue-600 mb-2" size={24} />
                  <span className="text-sm font-medium">Network Policies</span>
                </button>
                
                <button 
                  className="p-4 border rounded-md hover:bg-msGray-50 flex flex-col items-center text-msGray-800 transition-colors"
                  onClick={() => showFeedbackMessage("Resource quotas have been optimized based on current usage patterns.")}
                >
                  <BsBarChart className="text-msBlue-600 mb-2" size={24} />
                  <span className="text-sm font-medium">Optimize Resources</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Feedback message */}
      <AnimatePresence>
        {feedback && (
          <motion.div 
            className="mt-4 p-3 bg-msBlue-100 text-msBlue-800 rounded-md shadow-sm border border-msBlue-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {feedback}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Multi-Modal AI Chat Widget */}
      <MultiModalChat />
    </PageLayout>
  );
}
