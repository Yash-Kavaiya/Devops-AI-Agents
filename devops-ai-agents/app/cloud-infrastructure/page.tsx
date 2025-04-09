"use client";

import { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { 
  BsCloud, 
  BsServer, 
  BsCurrencyDollar, 
  BsGear, 
  BsArrowClockwise, 
  BsCheck2Circle, 
  BsTerminal, 
  BsLightningCharge,
  BsBarChart,
  BsArrowRepeat,
  BsPlus,
  BsShield,
  BsArrowRight,
  BsCloudFill,
  BsExclamationTriangle, // Added for incidents
  BsExclamationTriangleFill, // Added for critical incidents
  BsBell,                 // Added for notifications
  BsClockHistory,         // Added for incident timeline
  BsCheckCircle,          // Added for resolved status
  BsFillPlayFill,         // Added for start response
  BsStopFill              // Added for stop incident
} from 'react-icons/bs';
import { FaAws, FaGoogle, FaMicrosoft, FaServer } from 'react-icons/fa';
import { SiOracle, SiDigitalocean } from 'react-icons/si';

// Types for our cloud infrastructure data
interface CloudProvider {
  id: string;
  name: string;
  icon: JSX.Element;
  connected: boolean;
  resources?: number;
  regions?: string[];
}

interface MCPServerCloudConfig {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'error';
  cloudProvider: string;
  region: string;
  lastSync: string | null;
  resourceCount: number;
}

interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  impact: string;
  savingsPercentage: number;
  category: 'cost' | 'performance' | 'security' | 'compliance';
  difficulty: 'easy' | 'medium' | 'hard';
  implemented: boolean;
}

interface ResourceMetric {
  name: string;
  usage: number;
  limit: number;
  unit: string;
}

// New interface for incident response
interface Incident {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'investigating' | 'mitigating' | 'resolved';
  affectedServices: string[];
  affectedRegions: string[];
  detectedAt: string;
  resolvedAt: string | null;
  cloudProvider: string;
  metrics?: {
    impactedUsers: number;
    serviceDowntime: number; // minutes
    responseTime: number; // minutes
  };
  timeline?: {
    time: string;
    event: string;
  }[];
}

export default function CloudInfrastructurePage() {
  // State for cloud providers and AI recommendations
  const [cloudProviders, setCloudProviders] = useState<CloudProvider[]>([
    {
      id: 'aws',
      name: 'AWS',
      icon: <FaAws size={24} />,
      connected: true,
      resources: 42,
      regions: ['us-east-1', 'eu-west-1', 'ap-southeast-2']
    },
    {
      id: 'azure',
      name: 'Azure',
      icon: <FaMicrosoft size={24} />,
      connected: false
    },
    {
      id: 'gcp',
      name: 'Google Cloud',
      icon: <FaGoogle size={24} />,
      connected: true,
      resources: 27,
      regions: ['us-central1', 'europe-west1']
    },
    {
      id: 'oracle',
      name: 'Oracle Cloud',
      icon: <SiOracle size={24} />,
      connected: false
    },
    {
      id: 'ibm',
      name: 'IBM Cloud',
      icon: <FaServer size={24} />, // Using a generic server icon instead of SiIbm
      connected: false
    },
    {
      id: 'digitalocean',
      name: 'DigitalOcean',
      icon: <SiDigitalocean size={24} />,
      connected: false
    }
  ]);

  const [mcpServers, setMcpServers] = useState<MCPServerCloudConfig[]>([
    {
      id: 'mcp-1',
      name: 'Production MCP',
      status: 'running',
      cloudProvider: 'aws',
      region: 'us-east-1',
      lastSync: '2025-04-09T08:30:45Z',
      resourceCount: 18
    },
    {
      id: 'mcp-2',
      name: 'Development MCP',
      status: 'stopped',
      cloudProvider: 'gcp',
      region: 'us-central1',
      lastSync: '2025-04-08T14:15:22Z',
      resourceCount: 12
    }
  ]);

  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([
    {
      id: 'rec-1',
      title: 'Right-size underutilized EC2 instances',
      description: 'Detected 8 EC2 instances consistently running below 20% CPU utilization. Recommending to downsize to smaller instance types.',
      impact: 'Monthly savings of $320 with minimal performance impact',
      savingsPercentage: 12,
      category: 'cost',
      difficulty: 'easy',
      implemented: false
    },
    {
      id: 'rec-2',
      title: 'Enable auto-scaling for application tier',
      description: 'Current application tier has fixed capacity but handles variable load. Recommending auto-scaling policy based on CPU utilization.',
      impact: 'Improved resilience during peak loads and 15% cost reduction during low-traffic periods',
      savingsPercentage: 15,
      category: 'performance',
      difficulty: 'medium',
      implemented: false
    },
    {
      id: 'rec-3',
      title: 'Implement lifecycle policies for S3 buckets',
      description: 'Several S3 buckets are storing unnecessary data in high-cost tiers. Recommending lifecycle policies to transition older data to cheaper storage classes.',
      impact: 'Projected 30% reduction in storage costs without affecting accessibility',
      savingsPercentage: 30,
      category: 'cost',
      difficulty: 'easy',
      implemented: false
    }
  ]);

  const [resourceMetrics, setResourceMetrics] = useState<ResourceMetric[]>([
    { name: 'CPU', usage: 42, limit: 100, unit: '%' },
    { name: 'Memory', usage: 68, limit: 100, unit: '%' },
    { name: 'Storage', usage: 53, limit: 100, unit: '%' },
    { name: 'Network', usage: 37, limit: 100, unit: 'Gbps' }
  ]);

  // New state for incidents
  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: 'inc-1',
      title: 'API Gateway Latency Spike',
      description: 'Significant increase in response time for API Gateway endpoints in us-east-1',
      severity: 'high',
      status: 'active',
      affectedServices: ['API Gateway', 'Lambda'],
      affectedRegions: ['us-east-1'],
      detectedAt: new Date(Date.now() - 35 * 60000).toISOString(), // 35 minutes ago
      resolvedAt: null,
      cloudProvider: 'aws',
      metrics: {
        impactedUsers: 2840,
        serviceDowntime: 0, // not completely down
        responseTime: 35, // detected 35 minutes ago
      },
      timeline: [
        {
          time: new Date(Date.now() - 35 * 60000).toISOString(),
          event: 'Anomaly detection identified latency increase'
        },
        {
          time: new Date(Date.now() - 30 * 60000).toISOString(),
          event: 'Alert triggered for API response time > 500ms'
        },
        {
          time: new Date(Date.now() - 25 * 60000).toISOString(),
          event: 'Automated scaling policy activated'
        }
      ]
    },
    {
      id: 'inc-2',
      title: 'Database Connection Failures',
      description: 'Intermittent connection failures to primary RDS instance',
      severity: 'medium',
      status: 'investigating',
      affectedServices: ['RDS', 'Application Server'],
      affectedRegions: ['us-east-1'],
      detectedAt: new Date(Date.now() - 65 * 60000).toISOString(), // 65 minutes ago
      resolvedAt: null,
      cloudProvider: 'aws',
      metrics: {
        impactedUsers: 1250,
        serviceDowntime: 0,
        responseTime: 15,
      },
      timeline: [
        {
          time: new Date(Date.now() - 65 * 60000).toISOString(),
          event: 'Initial connection failures detected'
        },
        {
          time: new Date(Date.now() - 60 * 60000).toISOString(),
          event: 'Error rate exceeded threshold of 5%'
        },
        {
          time: new Date(Date.now() - 50 * 60000).toISOString(),
          event: 'Investigation started by on-call engineer'
        },
        {
          time: new Date(Date.now() - 45 * 60000).toISOString(),
          event: 'Database connections throttled to prevent cascading failure'
        }
      ]
    },
    {
      id: 'inc-3',
      title: 'S3 Access Permissions Issue',
      description: 'Configuration change caused temporary access issues to critical S3 buckets',
      severity: 'low',
      status: 'resolved',
      affectedServices: ['S3', 'CloudFront'],
      affectedRegions: ['global'],
      detectedAt: new Date(Date.now() - 240 * 60000).toISOString(), // 4 hours ago
      resolvedAt: new Date(Date.now() - 180 * 60000).toISOString(), // 3 hours ago
      cloudProvider: 'aws',
      metrics: {
        impactedUsers: 520,
        serviceDowntime: 60, // 60 minutes of downtime
        responseTime: 10,
      },
      timeline: [
        {
          time: new Date(Date.now() - 240 * 60000).toISOString(),
          event: 'Access denied errors detected for S3 read operations'
        },
        {
          time: new Date(Date.now() - 235 * 60000).toISOString(),
          event: 'Issue linked to recent IAM policy update'
        },
        {
          time: new Date(Date.now() - 210 * 60000).toISOString(),
          event: 'IAM policy rollback initiated'
        },
        {
          time: new Date(Date.now() - 180 * 60000).toISOString(),
          event: 'Access restored, incident resolved'
        }
      ]
    }
  ]);

  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  const [isRespondingToIncident, setIsRespondingToIncident] = useState(false);
  const [responseNotes, setResponseNotes] = useState('');

  const [loading, setLoading] = useState({
    providers: false,
    recommendations: false,
    metrics: false,
    incidents: false
  });

  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Connect to cloud provider
  const connectCloudProvider = (providerId: string) => {
    setLoading(prev => ({ ...prev, providers: true }));
    setTimeout(() => {
      const updatedProviders = cloudProviders.map(provider => {
        if (provider.id === providerId) {
          const isConnecting = !provider.connected;
          return {
            ...provider,
            connected: isConnecting,
            resources: isConnecting ? Math.floor(Math.random() * 50) + 5 : undefined,
            regions: isConnecting ? ['us-east-1', 'eu-west-1'] : undefined,
          };
        }
        return provider;
      });
      setCloudProviders(updatedProviders);
      setLoading(prev => ({ ...prev, providers: false }));
      const provider = updatedProviders.find(p => p.id === providerId);
      setFeedbackMessage(provider?.connected 
        ? `Successfully connected to ${provider.name}. Found ${provider.resources} resources.` 
        : `Disconnected from ${provider?.name}.`
      );
    }, 1000);
  };

  // Toggle MCP server
  const toggleMcpServer = (serverId: string) => {
    setLoading(prev => ({ ...prev, metrics: true }));
    setTimeout(() => {
      const updatedServers = mcpServers.map(server => {
        if (server.id === serverId) {
          // Fix: Explicitly cast the status to the allowed enum types
          const newStatus = server.status === 'running' ? 'stopped' as const : 'running' as const;
          return {
            ...server,
            status: newStatus,
            lastSync: newStatus === 'running' ? new Date().toISOString() : server.lastSync
          };
        }
        return server;
      });
      setMcpServers(updatedServers);
      setLoading(prev => ({ ...prev, metrics: false }));
      const server = updatedServers.find(s => s.id === serverId);
      setFeedbackMessage(server?.status === 'running' 
        ? `MCP Server "${server.name}" started and monitoring ${server.cloudProvider.toUpperCase()} resources` 
        : `MCP Server "${server?.name}" stopped`
      );
    }, 1500);
  };

  // Apply AI recommendation
  const applyRecommendation = (recommendationId: string) => {
    setLoading(prev => ({ ...prev, recommendations: true }));
    setTimeout(() => {
      const updatedRecommendations = recommendations.map(rec => {
        if (rec.id === recommendationId) {
          return { ...rec, implemented: true };
        }
        return rec;
      });
      setRecommendations(updatedRecommendations);
      setLoading(prev => ({ ...prev, recommendations: false }));
      const recommendation = updatedRecommendations.find(r => r.id === recommendationId);
      setFeedbackMessage(`Implementation of "${recommendation?.title}" initiated. Changes will be applied within the next 30 minutes.`);
      // Update metrics to simulate improvement
      const updatedMetrics = [...resourceMetrics];
      if (recommendation?.category === 'cost' || recommendation?.category === 'performance') {
        updatedMetrics[0].usage = Math.max(updatedMetrics[0].usage - 5, 20);
        updatedMetrics[1].usage = Math.max(updatedMetrics[1].usage - 7, 30);
      }
      setResourceMetrics(updatedMetrics);
    }, 2000);
  };

  // Refresh metrics
  const refreshMetrics = () => {
    setLoading(prev => ({ ...prev, metrics: true }));
    setTimeout(() => {
      const updatedMetrics = resourceMetrics.map(metric => ({
        ...metric,
        usage: Math.min(Math.max(metric.usage + (Math.random() * 10 - 5), 10), 90)
      }));
      setResourceMetrics(updatedMetrics);
      setLoading(prev => ({ ...prev, metrics: false }));
      setFeedbackMessage('Resource metrics refreshed');
    }, 1000);
  };

  // Generate new AI recommendations
  const generateRecommendations = () => {
    setLoading(prev => ({ ...prev, recommendations: true }));
    setTimeout(() => {
      const newRecommendation = {
        id: `rec-${recommendations.length + 1}`,
        title: 'Optimize CloudFront distribution settings',
        description: 'Current CloudFront configuration isn\'t utilizing compression optimally. Enabling Brotli compression can reduce data transfer costs.',
        impact: 'Estimated 18% reduction in CDN costs and improved page load times',
        savingsPercentage: 18,
        category: 'performance',
        difficulty: 'medium',
        implemented: false,
      } as AIRecommendation;
      setRecommendations([...recommendations, newRecommendation]);
      setLoading(prev => ({ ...prev, recommendations: false }));
      setFeedbackMessage('New optimization opportunities found!');
    }, 2000);
  };

  // New function to handle incident response
  const updateIncidentStatus = (incidentId: string, newStatus: Incident['status']) => {
    setLoading(prev => ({ ...prev, incidents: true }));
    setTimeout(() => {
      const updatedIncidents = incidents.map(incident => {
        if (incident.id === incidentId) {
          const updatedIncident = { 
            ...incident, 
            status: newStatus,
            timeline: [
              ...(incident.timeline || []),
              {
                time: new Date().toISOString(),
                event: `Status updated to ${newStatus}`
              }
            ]
          };
          
          // If resolving the incident, add resolved timestamp
          if (newStatus === 'resolved') {
            updatedIncident.resolvedAt = new Date().toISOString();
          }
          
          return updatedIncident;
        }
        return incident;
      });
      
      setIncidents(updatedIncidents);
      setLoading(prev => ({ ...prev, incidents: false }));
      
      const incident = updatedIncidents.find(i => i.id === incidentId);
      setFeedbackMessage(`Incident "${incident?.title}" status updated to ${newStatus}`);
      
      if (newStatus === 'resolved') {
        setIsRespondingToIncident(false);
        setSelectedIncident(null);
      }
    }, 1000);
  };

  // Submit incident response
  const submitIncidentResponse = (incidentId: string) => {
    if (!responseNotes.trim()) {
      setFeedbackMessage('Please add response notes before submitting');
      return;
    }

    setLoading(prev => ({ ...prev, incidents: true }));
    setTimeout(() => {
      const updatedIncidents = incidents.map(incident => {
        if (incident.id === incidentId) {
          return {
            ...incident,
            timeline: [
              ...(incident.timeline || []),
              {
                time: new Date().toISOString(),
                event: `Response action: ${responseNotes}`
              }
            ]
          };
        }
        return incident;
      });
      
      setIncidents(updatedIncidents);
      setLoading(prev => ({ ...prev, incidents: false }));
      setFeedbackMessage('Response actions recorded and team notified');
      setResponseNotes('');
    }, 1000);
  };

  // Create a new incident
  const createNewIncident = () => {
    const newIncident: Incident = {
      id: `inc-${incidents.length + 1}`,
      title: 'New Incident',
      description: 'Incident details pending...',
      severity: 'medium',
      status: 'active',
      affectedServices: [],
      affectedRegions: [],
      detectedAt: new Date().toISOString(),
      resolvedAt: null,
      cloudProvider: 'aws',
      timeline: [
        {
          time: new Date().toISOString(),
          event: 'Incident created'
        }
      ]
    };
    
    setIncidents([...incidents, newIncident]);
    setSelectedIncident(newIncident.id);
    setIsRespondingToIncident(true);
    setFeedbackMessage('New incident created. Please add details.');
  };

  return (
    <PageLayout
      title="Cloud Infrastructure Management"
      description="Optimize your cloud resources with AI-powered recommendations."
      agentType="cloud-infrastructure"
    >
      {/* Cloud Provider Integration */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <BsCloud size={20} className="text-msBlue-600 mr-2" />
            <h3 className="text-xl font-semibold">Cloud Providers</h3>
          </div>
          <span className="text-sm bg-msBlue-100 text-msBlue-800 py-1 px-3 rounded-full">
            {cloudProviders.filter(p => p.connected).length}/{cloudProviders.length} Connected
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cloudProviders.map((provider) => (
            <div 
              key={provider.id}
              className={`border rounded-lg p-4 ${
                provider.connected 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-white border-msGray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className={`text-${provider.id === 'aws' ? 'yellow-600' : 
                                          provider.id === 'azure' ? 'blue-600' : 
                                          provider.id === 'gcp' ? 'red-500' : 'msGray-600'} mr-3`}>
                    {provider.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{provider.name}</h4>
                    {provider.connected && (
                      <span className="text-xs text-msGray-600">
                        {provider.resources} resources
                      </span>
                    )}
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  provider.connected 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-msGray-200 text-msGray-500'
                }`}>
                  {provider.connected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              {provider.connected && provider.regions && (
                <div className="mb-3">
                  <div className="text-xs text-msGray-500 mb-1">Regions:</div>
                  <div className="flex flex-wrap gap-1">
                    {provider.regions.map(region => (
                      <span 
                        key={region} 
                        className="text-xs bg-msGray-100 text-msGray-700 px-2 py-0.5 rounded"
                      >
                        {region}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <button
                onClick={() => connectCloudProvider(provider.id)}
                disabled={loading.providers}
                className={`w-full text-sm py-1.5 rounded ${
                  provider.connected 
                    ? 'bg-msGray-100 hover:bg-msGray-200 text-msGray-700'
                    : 'bg-msBlue-600 hover:bg-msBlue-700 text-white'
                } transition-colors`}
              >
                {provider.connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* MCP Server Cloud Management */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <BsServer size={20} className="text-msBlue-600 mr-2" />
            <h3 className="text-xl font-semibold">MCP Server Cloud Integration</h3>
          </div>
          <button
            onClick={() => setMcpServers([...mcpServers, {
              id: `mcp-${mcpServers.length + 1}`,
              name: `New MCP Server`,
              status: 'stopped',
              cloudProvider: 'aws',
              region: 'us-east-1',
              lastSync: null,
              resourceCount: 0
            }])}
            className="flex items-center text-sm bg-msBlue-600 hover:bg-msBlue-700 text-white rounded-md px-3 py-1"
          >
            <BsPlus size={18} className="mr-1" /> New MCP Server
          </button>
        </div>
        <div className="space-y-4">
          {mcpServers.map(server => (
            <div 
              key={server.id}
              className={`border rounded-lg p-4 ${
                server.status === 'running' 
                  ? 'bg-green-50 border-green-200' 
                  : server.status === 'error'
                    ? 'bg-red-50 border-red-200'
                    : 'bg-white border-msGray-200'
              }`}
            >
              <div className="flex flex-wrap md:flex-nowrap md:items-center justify-between">
                <div className="mb-3 md:mb-0">
                  <div className="flex items-center">
                    <h4 className="font-medium text-lg">{server.name}</h4>
                    <span className={`ml-2 flex items-center text-xs px-2 py-1 rounded-full ${
                      server.status === 'running' 
                        ? 'bg-green-100 text-green-700' 
                        : server.status === 'error'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-msGray-200 text-msGray-500'
                    }`}>
                      <span className={`w-2 h-2 rounded-full mr-1 ${
                        server.status === 'running' 
                          ? 'bg-green-500' 
                          : server.status === 'error'
                            ? 'bg-red-500'
                            : 'bg-msGray-400'
                      }`}></span>
                      {server.status.charAt(0).toUpperCase() + server.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex flex-wrap text-sm text-msGray-600 mt-1">
                    <div className="flex items-center mr-4">
                      <span className="mr-1">Provider:</span>
                      {server.cloudProvider === 'aws' ? <FaAws /> : 
                       server.cloudProvider === 'azure' ? <FaMicrosoft /> : 
                       server.cloudProvider === 'gcp' ? <FaGoogle /> : null}
                      <span className="ml-1">{server.cloudProvider.toUpperCase()}</span>
                    </div>
                    <div className="mr-4">Region: <span className="font-medium">{server.region}</span></div>
                    {server.lastSync && (
                      <div>Last Sync: <span className="font-medium">
                        {new Date(server.lastSync).toLocaleString()}
                      </span></div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {server.status === 'running' && (
                    <div className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-md mr-2">
                      <span className="font-medium">{server.resourceCount}</span> resources monitored
                    </div>
                  )}
                  <button
                    onClick={() => toggleMcpServer(server.id)}
                    disabled={loading.metrics}
                    className={`flex items-center text-sm ${
                      server.status === 'running' 
                        ? 'bg-msGray-100 hover:bg-msGray-200 text-msGray-800'
                        : 'bg-msBlue-600 hover:bg-msBlue-700 text-white'
                    } rounded-md px-3 py-1.5`}
                  >
                    {server.status === 'running' ? (
                      <>
                        <BsTerminal className="mr-1" />
                        Stop Server
                      </>
                    ) : (
                      <>
                        <BsLightningCharge className="mr-1" />
                        Start Server
                      </>
                    )}
                  </button>
                </div>
              </div>
              {server.status === 'running' && (
                <div className="mt-3 pt-3 border-t border-green-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium mb-2">Monitored Services</div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>EC2 Instances</span>
                        <span>{Math.floor(server.resourceCount * 0.4)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>S3 Buckets</span>
                        <span>{Math.floor(server.resourceCount * 0.3)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>RDS Databases</span>
                        <span>{Math.floor(server.resourceCount * 0.2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Other Services</span>
                        <span>{Math.floor(server.resourceCount * 0.1)}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-2">Health Check Status</div>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <BsCheck2Circle className="text-green-500 mr-1" />
                        <span className="text-sm">All services operating normally</span>
                      </div>
                      <div className="flex items-center">
                        <BsShield className="text-green-500 mr-1" />
                        <span className="text-sm">Security checks passed</span>
                      </div>
                      <div className="flex items-center">
                        <BsArrowRepeat className="text-green-500 mr-1" />
                        <span className="text-sm">Automated backups enabled</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Resource Utilization and AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Resource Utilization Panel */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <BsBarChart size={20} className="text-msBlue-600 mr-2" />
              <h3 className="text-xl font-semibold">Resource Utilization</h3>
            </div>
            <button 
              onClick={refreshMetrics}
              disabled={loading.metrics}
              className="flex items-center text-sm bg-msGray-100 hover:bg-msGray-200 rounded-md px-2 py-1"
            >
              <BsArrowClockwise className={`mr-1 ${loading.metrics ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
          <div className="space-y-4">
            {resourceMetrics.map((metric, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span>{metric.name} Usage</span>
                  <span className={`font-medium ${
                    metric.usage > 80 ? 'text-red-600' :
                    metric.usage > 60 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {metric.usage}{metric.unit}
                  </span>
                </div>
                <div className="w-full bg-msGray-200 rounded-full h-2.5">
                  <div 
                    className={`${
                      metric.usage > 80 ? 'bg-red-600' :
                      metric.usage > 60 ? 'bg-yellow-600' : 'bg-msBlue-600'
                    } h-2.5 rounded-full`}
                    style={{ width: `${(metric.usage / metric.limit) * 100}%` }}
                  ></div>
                </div>
                {metric.usage > 80 && (
                  <div className="text-xs text-red-600 mt-1">
                    High utilization detected. Consider scaling resources.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* AI Recommendations Panel */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <BsLightningCharge size={20} className="text-msBlue-600 mr-2" />
              <h3 className="text-xl font-semibold">AI Recommendations</h3>
            </div>
            <button 
              onClick={generateRecommendations}
              disabled={loading.recommendations}
              className="flex items-center text-sm bg-msGray-100 hover:bg-msGray-200 rounded-md px-2 py-1"
            >
              <BsArrowClockwise className={`mr-1 ${loading.recommendations ? 'animate-spin' : ''}`} />
              Analyze
            </button>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
            {recommendations.map((rec) => (
              <div 
                key={rec.id}
                className="border border-msBlue-200 rounded-lg p-3 bg-gradient-to-r from-msBlue-50 to-white"
              >
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-msBlue-800">{rec.title}</h4>
                  <div className={`text-xs px-2 py-0.5 rounded ${
                    rec.category === 'cost' ? 'bg-green-100 text-green-800' :
                    rec.category === 'performance' ? 'bg-blue-100 text-blue-800' :
                    rec.category === 'security' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {rec.category.charAt(0).toUpperCase() + rec.category.slice(1)}
                  </div>
                </div>
                <p className="text-sm text-msGray-600 mt-2 mb-3">{rec.description}</p>
                <div className="flex flex-wrap justify-between items-center text-sm mb-3">
                  <div className="flex items-center mr-4">
                    <BsCurrencyDollar className="text-green-600 mr-1" />
                    <span>{rec.impact}</span>
                  </div>
                  <div className="flex items-center">
                    <BsGear className="text-msGray-600 mr-1" />
                    <span className="capitalize">{rec.difficulty} complexity</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-green-100 text-green-800 font-medium text-sm px-2 py-0.5 rounded">
                      {rec.savingsPercentage}% improvement
                    </div>
                  </div>
                  {rec.implemented ? (
                    <div className="flex items-center text-green-600 text-sm">
                      <BsCheck2Circle className="mr-1" />
                      Implemented
                    </div>
                  ) : (
                    <button
                      onClick={() => applyRecommendation(rec.id)}
                      className="flex items-center text-sm bg-msBlue-600 hover:bg-msBlue-700 text-white rounded px-3 py-1"
                    >
                      <BsArrowRight className="mr-1" />
                      Apply
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Incident Response System */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <BsExclamationTriangle size={20} className="text-orange-500 mr-2" />
            <h3 className="text-xl font-semibold">Incident Response</h3>
          </div>
          <div className="flex space-x-2">
            <span className="text-sm bg-red-100 text-red-800 py-1 px-3 rounded-full flex items-center">
              <BsExclamationTriangleFill className="mr-1" />
              {incidents.filter(i => i.status !== 'resolved').length} Active Incidents
            </span>
            <button
              onClick={createNewIncident}
              className="flex items-center text-sm bg-msBlue-600 hover:bg-msBlue-700 text-white rounded-md px-3 py-1"
            >
              <BsPlus size={18} className="mr-1" /> New Incident
            </button>
          </div>
        </div>
        
        {selectedIncident && isRespondingToIncident ? (
          // Incident Response Interface
          <div className="border rounded-lg p-4 bg-orange-50 mb-4">
            {incidents.filter(inc => inc.id === selectedIncident).map(incident => (
              <div key={incident.id} className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-medium text-orange-800 flex items-center">
                      <BsExclamationTriangle className="mr-2 text-orange-500" />
                      {incident.title}
                    </h4>
                    <p className="text-msGray-600 mt-1">{incident.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      incident.severity === 'critical' ? 'bg-red-100 text-red-800' :
                      incident.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                      incident.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {incident.severity.toUpperCase()}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      incident.status === 'active' ? 'bg-red-100 text-red-800' :
                      incident.status === 'investigating' ? 'bg-blue-100 text-blue-800' :
                      incident.status === 'mitigating' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {incident.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg">
                  <div>
                    <h5 className="font-medium mb-2 text-msGray-700">Affected Resources</h5>
                    <div className="space-y-2">
                      <div>
                        <div className="text-sm text-msGray-600">Services:</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {incident.affectedServices.map(service => (
                            <span key={service} className="text-xs bg-msGray-100 px-2 py-0.5 rounded">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-msGray-600">Regions:</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {incident.affectedRegions.map(region => (
                            <span key={region} className="text-xs bg-msGray-100 px-2 py-0.5 rounded">
                              {region}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-msGray-600">Cloud Provider:</div>
                        <div className="flex items-center mt-1">
                          {incident.cloudProvider === 'aws' ? <FaAws className="mr-1" /> : 
                           incident.cloudProvider === 'azure' ? <FaMicrosoft className="mr-1" /> : 
                           incident.cloudProvider === 'gcp' ? <FaGoogle className="mr-1" /> : null}
                          <span>{incident.cloudProvider.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-2 text-msGray-700">Impact Metrics</h5>
                    {incident.metrics ? (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-msGray-600">Impacted Users:</span>
                          <span className="font-medium">{incident.metrics.impactedUsers.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-msGray-600">Service Downtime:</span>
                          <span className="font-medium">{incident.metrics.serviceDowntime} minutes</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-msGray-600">Response Time:</span>
                          <span className="font-medium">{incident.metrics.responseTime} minutes</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-msGray-600">Detected:</span>
                          <span className="font-medium">{new Date(incident.detectedAt).toLocaleString()}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-msGray-500 italic">No metrics available</p>
                    )}
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-2 text-msGray-700">Timeline</h5>
                    <div className="max-h-40 overflow-y-auto pr-2">
                      {incident.timeline && incident.timeline.length > 0 ? (
                        <div className="space-y-2">
                          {incident.timeline.map((event, idx) => (
                            <div key={idx} className="text-sm border-l-2 border-msBlue-300 pl-3 pb-2">
                              <div className="text-xs text-msGray-500">{new Date(event.time).toLocaleString()}</div>
                              <div>{event.event}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-msGray-500 italic">No timeline events</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h5 className="font-medium mb-3 text-msGray-700">Response Actions</h5>
                  <div className="mb-3">
                    <textarea 
                      className="w-full border border-msGray-300 rounded-md p-2 text-sm"
                      rows={4}
                      placeholder="Document your response actions here..."
                      value={responseNotes}
                      onChange={(e) => setResponseNotes(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => submitIncidentResponse(incident.id)}
                      disabled={!responseNotes.trim() || loading.incidents}
                      className="flex items-center bg-msBlue-600 hover:bg-msBlue-700 text-white text-sm rounded px-3 py-1.5 disabled:opacity-50"
                    >
                      <BsFillPlayFill className="mr-1" />
                      Submit Response
                    </button>
                    <button
                      onClick={() => updateIncidentStatus(incident.id, 'investigating')}
                      disabled={incident.status === 'investigating' || loading.incidents}
                      className="flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm rounded px-3 py-1.5 disabled:opacity-50"
                    >
                      <BsClockHistory className="mr-1" />
                      Start Investigation
                    </button>
                    <button
                      onClick={() => updateIncidentStatus(incident.id, 'mitigating')}
                      disabled={incident.status === 'mitigating' || loading.incidents}
                      className="flex items-center bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded px-3 py-1.5 disabled:opacity-50"
                    >
                      <BsShield className="mr-1" />
                      Begin Mitigation
                    </button>
                    <button
                      onClick={() => updateIncidentStatus(incident.id, 'resolved')}
                      disabled={loading.incidents}
                      className="flex items-center bg-green-600 hover:bg-green-700 text-white text-sm rounded px-3 py-1.5"
                    >
                      <BsCheckCircle className="mr-1" />
                      Resolve Incident
                    </button>
                    <button
                      onClick={() => {
                        setIsRespondingToIncident(false);
                        setSelectedIncident(null);
                      }}
                      className="flex items-center bg-msGray-200 hover:bg-msGray-300 text-msGray-800 text-sm rounded px-3 py-1.5 ml-auto"
                    >
                      <BsStopFill className="mr-1" />
                      Exit Response
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Incident List
          <div className="space-y-3">
            {incidents.length === 0 ? (
              <div className="text-center py-8 text-msGray-500">
                <BsExclamationTriangle size={32} className="mx-auto mb-3 text-msGray-400" />
                <p>No incidents reported. All systems operational.</p>
              </div>
            ) : (
              incidents.map(incident => (
                <div 
                  key={incident.id}
                  className={`border rounded-lg p-4 ${
                    incident.status === 'resolved'
                      ? 'bg-green-50 border-green-200'
                      : incident.severity === 'critical'
                        ? 'bg-red-50 border-red-200'
                        : incident.severity === 'high'
                          ? 'bg-orange-50 border-orange-200'
                          : 'bg-yellow-50 border-yellow-200'
                  }`}
                >
                  <div className="flex flex-wrap md:flex-nowrap justify-between items-start">
                    <div className="mb-3 md:mb-0 md:mr-4">
                      <div className="flex items-center">
                        <h4 className="font-medium text-lg">{incident.title}</h4>
                        <div className="flex ml-2 space-x-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            incident.severity === 'critical' ? 'bg-red-100 text-red-800' :
                            incident.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                            incident.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {incident.severity.toUpperCase()}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            incident.status === 'active' ? 'bg-red-100 text-red-800' :
                            incident.status === 'investigating' ? 'bg-blue-100 text-blue-800' :
                            incident.status === 'mitigating' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {incident.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-msGray-600 mt-1">{incident.description}</p>
                      <div className="flex flex-wrap items-center text-xs text-msGray-500 mt-2">
                        <div className="mr-3">
                          <span className="font-medium">Detected:</span> {new Date(incident.detectedAt).toLocaleString()}
                        </div>
                        {incident.resolvedAt && (
                          <div className="mr-3">
                            <span className="font-medium">Resolved:</span> {new Date(incident.resolvedAt).toLocaleString()}
                          </div>
                        )}
                        <div className="flex items-center mr-3">
                          <span className="font-medium mr-1">Provider:</span>
                          {incident.cloudProvider === 'aws' ? <FaAws size={12} /> : 
                           incident.cloudProvider === 'azure' ? <FaMicrosoft size={12} /> : 
                           incident.cloudProvider === 'gcp' ? <FaGoogle size={12} /> : null}
                          <span className="ml-1">{incident.cloudProvider.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {incident.metrics && (
                        <div className="text-sm bg-white px-3 py-1 rounded-md mr-2">
                          <span className="font-medium">{incident.metrics.impactedUsers.toLocaleString()}</span> users affected
                        </div>
                      )}
                      {incident.status !== 'resolved' ? (
                        <button
                          onClick={() => {
                            setSelectedIncident(incident.id);
                            setIsRespondingToIncident(true);
                          }}
                          className="flex items-center text-sm bg-msBlue-600 hover:bg-msBlue-700 text-white rounded-md px-3 py-1.5"
                        >
                          <BsArrowRight className="mr-1" />
                          Respond
                        </button>
                      ) : (
                        <div className="flex items-center text-sm text-green-700">
                          <BsCheckCircle className="mr-1" />
                          Resolved
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      
      {/* Cost Analysis */}
      <div className="card">
        <div className="flex items-center mb-4">
          <BsCurrencyDollar size={20} className="text-msBlue-600 mr-2" />
          <h3 className="text-xl font-semibold">Cost Analysis</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-msGray-200">
            <span>Current Monthly Cost</span>
            <span className="font-medium">$4,325.78</span>
          </div>
          <div className="flex justify-between py-2 border-b border-msGray-200">
            <span>Projected Savings</span>
            <span className="font-medium text-green-600">$876.23</span>
          </div>
          <div className="flex justify-between py-2 border-b border-msGray-200">
            <span>Optimization Opportunity</span>
            <span className="font-medium text-msBlue-600">20.3%</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Estimated Next Month</span>
            <span className="font-medium text-green-600">$3,449.55</span>
          </div>
        </div>
      </div>
      {/* Feedback message */}
      {feedbackMessage && (
        <div className="mt-4 p-3 bg-msBlue-100 text-msBlue-800 rounded-md">
          {feedbackMessage}
        </div>
      )}
    </PageLayout>
  );
}
