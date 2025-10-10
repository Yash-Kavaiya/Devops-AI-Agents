"use client";

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import MultiModalChat from '@/components/MultiModalChat';
import {
  BsCodeSlash,
  BsShieldCheck,
  BsSpeedometer2,
  BsBarChart,
  BsArrowRepeat,
  BsGearWideConnected,
  BsCheck2Circle,
  BsExclamationTriangle,
  BsLightbulbFill,
  BsChevronRight
} from 'react-icons/bs';

export default function CodeAnalysisPage() {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample code quality metrics
  const codeMetrics = {
    bugs: 42,
    vulnerabilities: 7,
    codeCoverage: 68,
    duplications: 3.2,
    complexity: 'Medium',
    techDebt: '4d 2h',
    qualityGate: 'Passed'
  };

  // Top features of code analysis
  const features = [
    {
      id: 'static-analysis',
      title: 'Static Code Analysis',
      description: 'Analyze code without execution to find bugs, vulnerabilities, and code smells early in development.',
      icon: <BsCodeSlash className="text-blue-500" size={24} />,
      metrics: ['156 issues resolved this month', '24% improvement in code quality'],
      integrations: ['GitHub', 'GitLab', 'BitBucket', 'Azure DevOps']
    },
    {
      id: 'security',
      title: 'Security Analysis',
      description: 'Identify security vulnerabilities including OWASP Top 10 and industry-specific compliance requirements.',
      icon: <BsShieldCheck className="text-green-600" size={24} />,
      metrics: ['7 critical vulnerabilities detected', '3 security hotspots need review'],
      integrations: ['Snyk', 'SonarQube', 'Veracode', 'Checkmarx']
    },
    {
      id: 'performance',
      title: 'Performance Optimization',
      description: 'Detect performance bottlenecks and resource-intensive code patterns for optimization.',
      icon: <BsSpeedometer2 className="text-orange-500" size={24} />,
      metrics: ['15% average response time improvement', '23 slow database queries optimized'],
      integrations: ['New Relic', 'Datadog', 'Dynatrace', 'Lighthouse']
    },
    {
      id: 'metrics',
      title: 'Code Quality Metrics',
      description: 'Track code quality metrics over time with historical trends and team performance insights.',
      icon: <BsBarChart className="text-purple-600" size={24} />,
      metrics: ['Technical debt reduced by 18%', 'Test coverage increased to 68%'],
      integrations: ['SonarQube', 'CodeClimate', 'Codacy', 'Codecov']
    },
    {
      id: 'integration',
      title: 'CI/CD Integration',
      description: 'Seamlessly integrate with CI/CD pipelines to enforce quality gates and prevent problematic deployments.',
      icon: <BsGearWideConnected className="text-gray-600" size={24} />,
      metrics: ['24 failed builds prevented', '8 minutes average for full analysis'],
      integrations: ['Jenkins', 'GitHub Actions', 'CircleCI', 'Travis CI', 'TeamCity']
    }
  ];

  // Latest analysis issues
  const issues = [
    { id: 1, severity: 'Critical', type: 'Security', description: 'SQL injection vulnerability in login form', file: 'src/controllers/auth.js', line: 42 },
    { id: 2, severity: 'Major', type: 'Bug', description: 'Possible null reference exception', file: 'src/services/user.ts', line: 127 },
    { id: 3, severity: 'Minor', type: 'Code Smell', description: 'Function has a complexity of 15, maximum allowed is 10', file: 'src/utils/parser.js', line: 85 },
    { id: 4, severity: 'Critical', type: 'Security', description: 'Hard-coded credentials in configuration file', file: 'src/config/database.js', line: 23 },
    { id: 5, severity: 'Major', type: 'Bug', description: 'Race condition in concurrent operations', file: 'src/services/transaction.ts', line: 94 }
  ];

  return (
    <PageLayout
      title="Code Analysis"
      description="Analyze your code for quality, security, and performance"
      agentType="code-analysis"
    >
      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto mb-6 border-b">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 mr-2 font-medium ${
            activeTab === 'overview'
              ? 'text-msBlue-600 border-b-2 border-msBlue-600'
              : 'text-msGray-600 hover:text-msBlue-600'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('issues')}
          className={`px-4 py-2 mr-2 font-medium ${
            activeTab === 'issues'
              ? 'text-msBlue-600 border-b-2 border-msBlue-600'
              : 'text-msGray-600 hover:text-msBlue-600'
          }`}
        >
          Issues
        </button>
        <button
          onClick={() => setActiveTab('features')}
          className={`px-4 py-2 mr-2 font-medium ${
            activeTab === 'features'
              ? 'text-msBlue-600 border-b-2 border-msBlue-600'
              : 'text-msGray-600 hover:text-msBlue-600'
          }`}
        >
          Features
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'settings'
              ? 'text-msBlue-600 border-b-2 border-msBlue-600'
              : 'text-msGray-600 hover:text-msBlue-600'
          }`}
        >
          Settings
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="card p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-msGray-600">Code Quality</h3>
                <span className="text-green-500">
                  <BsCheck2Circle size={20} />
                </span>
              </div>
              <div className="flex items-end">
                <span className="text-2xl font-bold">A+</span>
                <span className="ml-2 text-xs text-green-600">↑ 12% from last scan</span>
              </div>
            </div>

            <div className="card p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-msGray-600">Issues</h3>
                <span className="text-yellow-500">
                  <BsExclamationTriangle size={20} />
                </span>
              </div>
              <div className="flex items-end">
                <span className="text-2xl font-bold">{codeMetrics.bugs + codeMetrics.vulnerabilities}</span>
                <span className="ml-2 text-xs text-red-600">↑ 3 new issues</span>
              </div>
            </div>

            <div className="card p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-msGray-600">Test Coverage</h3>
                <span className="text-blue-500">
                  <BsBarChart size={20} />
                </span>
              </div>
              <div className="flex items-end">
                <span className="text-2xl font-bold">{codeMetrics.codeCoverage}%</span>
                <span className="ml-2 text-xs text-green-600">↑ 5% from last scan</span>
              </div>
            </div>

            <div className="card p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-msGray-600">Technical Debt</h3>
                <span className="text-purple-500">
                  <BsLightbulbFill size={20} />
                </span>
              </div>
              <div className="flex items-end">
                <span className="text-2xl font-bold">{codeMetrics.techDebt}</span>
                <span className="ml-2 text-xs text-green-600">↓ 8% from last scan</span>
              </div>
            </div>
          </div>

          {/* Code Metrics */}
          <div className="card p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Code Quality Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm text-msGray-600 mb-2">Reliability</h3>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span>Bugs</span>
                    <span className="font-medium">{codeMetrics.bugs}</span>
                  </div>
                  <div className="w-full bg-msGray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: `${Math.min(codeMetrics.bugs / 100 * 100, 100)}%` }}></div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm text-msGray-600 mb-2">Security</h3>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span>Vulnerabilities</span>
                    <span className="font-medium">{codeMetrics.vulnerabilities}</span>
                  </div>
                  <div className="w-full bg-msGray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${Math.min(codeMetrics.vulnerabilities / 20 * 100, 100)}%` }}></div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm text-msGray-600 mb-2">Maintainability</h3>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span>Code Smells</span>
                    <span className="font-medium">124</span>
                  </div>
                  <div className="w-full bg-msGray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-msGray-200 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm text-msGray-600 mb-2">Test Coverage</h3>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span>Coverage</span>
                    <span className="font-medium">{codeMetrics.codeCoverage}%</span>
                  </div>
                  <div className="w-full bg-msGray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${codeMetrics.codeCoverage}%` }}></div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm text-msGray-600 mb-2">Duplication</h3>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span>Duplicated Lines</span>
                    <span className="font-medium">{codeMetrics.duplications}%</span>
                  </div>
                  <div className="w-full bg-msGray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${codeMetrics.duplications * 10}%` }}></div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm text-msGray-600 mb-2">Complexity</h3>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span>Cyclomatic Complexity</span>
                    <span className="font-medium">{codeMetrics.complexity}</span>
                  </div>
                  <div className="w-full bg-msGray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button className="flex items-center text-msBlue-600 text-sm font-medium">
                View detailed report <BsChevronRight className="ml-1" />
              </button>
            </div>
          </div>

          {/* Recent Issues */}
          <div className="card p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Issues</h2>
              <button className="flex items-center text-sm bg-msGray-100 hover:bg-msGray-200 rounded-md px-3 py-1">
                <BsArrowRepeat className="mr-1" /> Refresh
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-msGray-600 border-b border-msGray-200">
                    <th className="pb-2 font-medium">Severity</th>
                    <th className="pb-2 font-medium">Type</th>
                    <th className="pb-2 font-medium">Description</th>
                    <th className="pb-2 font-medium">File</th>
                  </tr>
                </thead>
                <tbody>
                  {issues.map(issue => (
                    <tr key={issue.id} className="border-b border-msGray-200">
                      <td className="py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          issue.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                          issue.severity === 'Major' ? 'bg-orange-100 text-orange-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {issue.severity}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`text-sm ${
                          issue.type === 'Security' ? 'text-red-600' :
                          issue.type === 'Bug' ? 'text-orange-600' : 
                          'text-blue-600'
                        }`}>
                          {issue.type}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="text-sm">{issue.description}</span>
                      </td>
                      <td className="py-3">
                        <span className="text-sm text-msGray-600">{issue.file}:{issue.line}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="text-msBlue-600 text-sm font-medium">View all issues</button>
            </div>
          </div>
        </div>
      )}

      {/* Features Tab */}
      {activeTab === 'features' && (
        <div className="space-y-6">
          {features.map(feature => (
            <div key={feature.id} className="card p-6">
              <div className="flex items-start">
                <div className="mr-4">{feature.icon}</div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
                  <p className="text-msGray-600 mb-4">{feature.description}</p>
                  
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Key Metrics</h3>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {feature.metrics.map((metric, idx) => (
                        <li key={idx}>{metric}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Integrations</h3>
                    <div className="flex flex-wrap gap-2">
                      {feature.integrations.map((integration, idx) => (
                        <span key={idx} className="bg-msGray-100 text-msGray-700 text-xs rounded-full px-3 py-1">
                          {integration}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Issues Tab */}
      {activeTab === 'issues' && (
        <div className="card p-6">
          <div className="flex flex-wrap justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Code Issues</h2>
            <div className="flex space-x-2">
              <select className="px-3 py-1.5 border border-msGray-300 rounded bg-white text-sm">
                <option>All Severities</option>
                <option>Critical</option>
                <option>Major</option>
                <option>Minor</option>
              </select>
              <select className="px-3 py-1.5 border border-msGray-300 rounded bg-white text-sm">
                <option>All Types</option>
                <option>Security</option>
                <option>Bug</option>
                <option>Code Smell</option>
              </select>
              <button className="flex items-center bg-msBlue-600 hover:bg-msBlue-700 text-white text-sm rounded px-3 py-1.5">
                <BsArrowRepeat className="mr-1" /> Refresh
              </button>
            </div>
          </div>
          
          {/* Issues table - expanded version */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-msGray-50 text-msGray-600 border-y border-msGray-200">
                  <th className="px-4 py-3 font-medium">Severity</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Description</th>
                  <th className="px-4 py-3 font-medium">File</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {issues.map(issue => (
                  <tr key={issue.id} className="border-b border-msGray-200 hover:bg-msGray-50">
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        issue.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                        issue.severity === 'Major' ? 'bg-orange-100 text-orange-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {issue.severity}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        {issue.type === 'Security' && <BsShieldCheck className="text-red-500 mr-1.5" />}
                        {issue.type === 'Bug' && <BsExclamationTriangle className="text-orange-500 mr-1.5" />}
                        {issue.type === 'Code Smell' && <BsLightbulbFill className="text-blue-500 mr-1.5" />}
                        <span>{issue.type}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm">{issue.description}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{issue.file}</span>
                        <span className="text-xs text-msGray-500">Line {issue.line}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex space-x-2">
                        <button className="text-msBlue-600 hover:text-msBlue-800 text-sm font-medium">Fix</button>
                        <button className="text-msGray-600 hover:text-msGray-800 text-sm">Ignore</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-msGray-600">
              Showing 5 of 48 issues
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-msGray-300 rounded text-sm" disabled>Previous</button>
              <button className="px-3 py-1 bg-msBlue-600 text-white rounded text-sm">1</button>
              <button className="px-3 py-1 border border-msGray-300 rounded text-sm">2</button>
              <button className="px-3 py-1 border border-msGray-300 rounded text-sm">3</button>
              <button className="px-3 py-1 border border-msGray-300 rounded text-sm">Next</button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-6">Code Analysis Settings</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Repository Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Repository URL</label>
                <input type="text" className="w-full px-3 py-2 border border-msGray-300 rounded" placeholder="https://github.com/username/repo" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Branch</label>
                <input type="text" className="w-full px-3 py-2 border border-msGray-300 rounded" placeholder="main" />
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Analysis Configuration</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-msGray-200 rounded">
                <div>
                  <h4 className="font-medium">Run analysis on pull requests</h4>
                  <p className="text-sm text-msGray-600">Analyze code changes when a pull request is created or updated</p>
                </div>
                <label className="switch">
                  <input type="checkbox" checked />
                  <span className="slider round"></span>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-msGray-200 rounded">
                <div>
                  <h4 className="font-medium">Enforce quality gates</h4>
                  <p className="text-sm text-msGray-600">Block merging of code that doesn't pass quality checks</p>
                </div>
                <label className="switch">
                  <input type="checkbox" checked />
                  <span className="slider round"></span>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-msGray-200 rounded">
                <div>
                  <h4 className="font-medium">Security scanning</h4>
                  <p className="text-sm text-msGray-600">Enable SAST and dependency vulnerability scanning</p>
                </div>
                <label className="switch">
                  <input type="checkbox" checked />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button className="px-4 py-2 bg-msGray-100 hover:bg-msGray-200 rounded text-sm">Cancel</button>
            <button className="px-4 py-2 bg-msBlue-600 hover:bg-msBlue-700 text-white rounded text-sm">Save Settings</button>
          </div>
        </div>
      )}
      
      {/* Multi-Modal AI Chat Widget */}
      <MultiModalChat />
    </PageLayout>
  );
}
