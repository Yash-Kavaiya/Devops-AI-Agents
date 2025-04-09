"use client";

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import {
  BsShieldLock,
  BsSearch,
  BsExclamationTriangle,
  BsBug,
  BsShieldCheck,
  BsBarChart,
  BsArrowRepeat,
  BsCheckCircle,
  BsEye,
  BsFileCode,
  BsLock,
  BsClockHistory,
  BsFilter,
  BsList,
  BsGrid,
  BsTag
} from 'react-icons/bs';
import { FaServer, FaDatabase, FaRegFileCode } from 'react-icons/fa';

export default function SecurityScanningPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewMode, setViewMode] = useState('list');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [selectedScan, setSelectedScan] = useState<string | null>(null);

  // Sample vulnerability data
  const vulnerabilityData = {
    critical: 5,
    high: 12,
    medium: 24,
    low: 18,
    info: 8,
    total: 67,
    fixed: 23,
    fixRate: 34
  };

  // Sample security scan history
  const scanHistory = [
    { 
      id: 'scan-001', 
      timestamp: '2025-04-09T08:30:00Z', 
      type: 'Full',
      target: 'Production Environment', 
      status: 'Completed',
      vulnerabilities: {
        critical: 5,
        high: 12,
        medium: 24,
        low: 18
      },
      duration: '12m 45s'
    },
    { 
      id: 'scan-002', 
      timestamp: '2025-04-08T15:12:00Z', 
      type: 'Code',
      target: 'Backend API', 
      status: 'Completed',
      vulnerabilities: {
        critical: 0,
        high: 4,
        medium: 9,
        low: 7
      },
      duration: '8m 12s'
    },
    { 
      id: 'scan-003', 
      timestamp: '2025-04-07T11:45:00Z', 
      type: 'Container',
      target: 'Docker Images', 
      status: 'Completed',
      vulnerabilities: {
        critical: 2,
        high: 5,
        medium: 11,
        low: 6
      },
      duration: '10m 38s'
    },
    { 
      id: 'scan-004', 
      timestamp: '2025-04-06T10:00:00Z', 
      type: 'Dependencies',
      target: 'Node Packages', 
      status: 'Completed',
      vulnerabilities: {
        critical: 3,
        high: 7,
        medium: 15,
        low: 10
      },
      duration: '6m 20s'
    }
  ];

  // Sample vulnerabilities found
  const vulnerabilities = [
    {
      id: 'vuln-001',
      title: 'SQL Injection Vulnerability',
      severity: 'Critical',
      category: 'Injection',
      location: 'src/controllers/user.js:42',
      description: 'User input is directly concatenated into SQL query without proper sanitization, allowing for potential SQL injection attacks.',
      cwe: 'CWE-89',
      cvss: 8.8,
      remediation: 'Use parameterized queries or prepared statements instead of direct string concatenation.',
      status: 'Open',
      discovered: '2025-04-09T08:30:00Z'
    },
    {
      id: 'vuln-002',
      title: 'Cross-Site Scripting (XSS)',
      severity: 'High',
      category: 'XSS',
      location: 'src/views/dashboard.jsx:157',
      description: 'User-supplied data is rendered directly to the DOM without proper escaping or sanitization.',
      cwe: 'CWE-79',
      cvss: 6.4,
      remediation: 'Sanitize user input before inserting into HTML content and implement Content Security Policy.',
      status: 'Open',
      discovered: '2025-04-09T08:30:00Z'
    },
    {
      id: 'vuln-003',
      title: 'Insecure Direct Object Reference',
      severity: 'High',
      category: 'Access Control',
      location: 'src/api/resources.js:89',
      description: 'API endpoint does not properly verify user authorization before providing access to resources.',
      cwe: 'CWE-639',
      cvss: 7.1,
      remediation: 'Implement proper authorization checks for all resource access and validate user permissions.',
      status: 'Fixed',
      discovered: '2025-04-07T11:45:00Z'
    },
    {
      id: 'vuln-004',
      title: 'Outdated Library with Known Vulnerabilities',
      severity: 'Medium',
      category: 'Dependencies',
      location: 'package.json',
      description: 'The application uses lodash version 4.17.15 which contains multiple known vulnerabilities.',
      cwe: 'CWE-1104',
      cvss: 5.3,
      remediation: 'Update lodash to version 4.17.21 or later.',
      status: 'Open',
      discovered: '2025-04-08T15:12:00Z'
    },
    {
      id: 'vuln-005',
      title: 'Insufficient Password Hashing',
      severity: 'Critical',
      category: 'Authentication',
      location: 'src/services/auth.js:123',
      description: 'Passwords are hashed using MD5, which is cryptographically broken and unsuitable for password storage.',
      cwe: 'CWE-916',
      cvss: 9.1,
      remediation: 'Replace MD5 with a modern hashing algorithm designed for password storage, such as bcrypt, Argon2, or PBKDF2.',
      status: 'Open',
      discovered: '2025-04-09T08:30:00Z'
    }
  ].filter(v => filterSeverity === 'all' || v.severity.toLowerCase() === filterSeverity);

  const securityCompliance = [
    { standard: 'OWASP Top 10', compliance: 72, icon: <BsShieldLock size={18} /> },
    { standard: 'GDPR', compliance: 85, icon: <BsShieldCheck size={18} /> },
    { standard: 'PCI DSS', compliance: 90, icon: <BsLock size={18} /> },
    { standard: 'ISO 27001', compliance: 78, icon: <BsShieldCheck size={18} /> }
  ];

  // Sample categories for security scanning
  const scanCategories = [
    {
      id: 'code',
      name: 'Code Analysis',
      description: 'Static analysis of application source code to detect security vulnerabilities',
      icon: <BsFileCode size={22} />,
      last_scan: '2 days ago',
      metrics: { issues: 37, fixed: 12 }
    },
    {
      id: 'dependencies',
      name: 'Dependency Scanning',
      description: 'Identifies vulnerable dependencies and libraries in your application',
      icon: <BsTag size={22} />,
      last_scan: '1 day ago',
      metrics: { issues: 15, fixed: 6 }
    },
    {
      id: 'secrets',
      name: 'Secret Detection',
      description: 'Detects hardcoded secrets, credentials, and sensitive data in your codebase',
      icon: <BsEye size={22} />,
      last_scan: '3 days ago',
      metrics: { issues: 5, fixed: 3 }
    },
    {
      id: 'container',
      name: 'Container Scanning',
      description: 'Analyzes container images for known vulnerabilities in the OS packages',
      icon: <FaServer size={22} />,
      last_scan: '2 days ago',
      metrics: { issues: 24, fixed: 9 }
    },
    {
      id: 'database',
      name: 'Database Scanning',
      description: 'Checks database configurations and access controls for security issues',
      icon: <FaDatabase size={22} />,
      last_scan: '4 days ago',
      metrics: { issues: 10, fixed: 6 }
    },
    {
      id: 'infra',
      name: 'Infrastructure Scan',
      description: 'Evaluates cloud infrastructure for misconfigurations and security gaps',
      icon: <FaServer size={22} />,
      last_scan: '3 days ago',
      metrics: { issues: 14, fixed: 8 }
    }
  ];

  return (
    <PageLayout
      title="Security Scanning"
      description="Detect and remediate security vulnerabilities in your codebase and infrastructure"
      agentType="security-scanning"
    >
      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto mb-6 border-b">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 mr-2 font-medium ${
            activeTab === 'dashboard'
              ? 'text-red-600 border-b-2 border-red-600'
              : 'text-msGray-600 hover:text-red-600'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('vulnerabilities')}
          className={`px-4 py-2 mr-2 font-medium ${
            activeTab === 'vulnerabilities'
              ? 'text-red-600 border-b-2 border-red-600'
              : 'text-msGray-600 hover:text-red-600'
          }`}
        >
          Vulnerabilities
        </button>
        <button
          onClick={() => setActiveTab('scans')}
          className={`px-4 py-2 mr-2 font-medium ${
            activeTab === 'scans'
              ? 'text-red-600 border-b-2 border-red-600'
              : 'text-msGray-600 hover:text-red-600'
          }`}
        >
          Scan History
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'settings'
              ? 'text-red-600 border-b-2 border-red-600'
              : 'text-msGray-600 hover:text-red-600'
          }`}
        >
          Settings
        </button>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <>
          {/* Security Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="card p-4 border-l-4 border-l-red-500">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-msGray-600">Critical Vulnerabilities</h3>
                <span className="text-red-500">
                  <BsExclamationTriangle size={20} />
                </span>
              </div>
              <div className="flex items-end">
                <span className="text-2xl font-bold">{vulnerabilityData.critical}</span>
                <span className="ml-2 text-xs text-red-600">Requires immediate attention</span>
              </div>
            </div>

            <div className="card p-4 border-l-4 border-l-orange-500">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-msGray-600">Total Vulnerabilities</h3>
                <span className="text-orange-500">
                  <BsBug size={20} />
                </span>
              </div>
              <div className="flex items-end">
                <span className="text-2xl font-bold">{vulnerabilityData.total}</span>
                <span className="ml-2 text-xs text-orange-600">Across all systems</span>
              </div>
            </div>

            <div className="card p-4 border-l-4 border-l-green-500">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-msGray-600">Fixed Issues</h3>
                <span className="text-green-500">
                  <BsCheckCircle size={20} />
                </span>
              </div>
              <div className="flex items-end">
                <span className="text-2xl font-bold">{vulnerabilityData.fixed}</span>
                <span className="ml-2 text-xs text-green-600">Issues remediated</span>
              </div>
            </div>

            <div className="card p-4 border-l-4 border-l-blue-500">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-msGray-600">Fix Rate</h3>
                <span className="text-blue-500">
                  <BsBarChart size={20} />
                </span>
              </div>
              <div className="flex items-end">
                <span className="text-2xl font-bold">{vulnerabilityData.fixRate}%</span>
                <span className="ml-2 text-xs text-blue-600">Last 30 days</span>
              </div>
            </div>
          </div>

          {/* Vulnerability Distribution */}
          <div className="card p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Vulnerability Distribution</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-4">
              {[
                { label: 'Critical', count: vulnerabilityData.critical, color: 'bg-red-600' },
                { label: 'High', count: vulnerabilityData.high, color: 'bg-orange-500' },
                { label: 'Medium', count: vulnerabilityData.medium, color: 'bg-yellow-500' },
                { label: 'Low', count: vulnerabilityData.low, color: 'bg-blue-400' },
                { label: 'Info', count: vulnerabilityData.info, color: 'bg-green-400' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.label}</span>
                    <span className="font-medium">{item.count}</span>
                  </div>
                  <div className="w-full bg-msGray-100 rounded-full h-3">
                    <div 
                      className={`${item.color} h-3 rounded-full`} 
                      style={{ width: `${Math.min((item.count / vulnerabilityData.total) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance and Scan Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Compliance Standards */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">Security Compliance</h2>
              <div className="space-y-4">
                {securityCompliance.map((item, i) => (
                  <div key={i} className="flex items-center">
                    <div className="mr-3 text-msGray-600">
                      {item.icon}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{item.standard}</span>
                        <span>{item.compliance}%</span>
                      </div>
                      <div className="w-full bg-msGray-100 rounded-full h-2">
                        <div 
                          className={`${
                            item.compliance >= 90 ? 'bg-green-500' :
                            item.compliance >= 75 ? 'bg-blue-500' :
                            item.compliance >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          } h-2 rounded-full`} 
                          style={{ width: `${item.compliance}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button className="px-4 py-2 text-sm border border-msGray-300 rounded hover:bg-msGray-50">
                  View Compliance Reports
                </button>
              </div>
            </div>

            {/* Recent Vulnerabilities */}
            <div className="card p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recent Vulnerabilities</h2>
                <button className="text-sm text-red-600 hover:underline">View All</button>
              </div>
              <div className="space-y-3">
                {vulnerabilities.slice(0, 4).map((vuln) => (
                  <div key={vuln.id} className="border-b border-msGray-100 pb-3 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{vuln.title}</div>
                        <div className="text-sm text-msGray-600">{vuln.location}</div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        vuln.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                        vuln.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                        vuln.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {vuln.severity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scan Categories */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Security Scan Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scanCategories.map((category) => (
                <div key={category.id} className="border rounded-lg p-4 hover:border-red-200 hover:bg-red-50 transition-colors">
                  <div className="flex items-center mb-3">
                    <div className="p-2 rounded-lg bg-red-100 text-red-600 mr-3">
                      {category.icon}
                    </div>
                    <h3 className="font-medium">{category.name}</h3>
                  </div>
                  <p className="text-sm text-msGray-600 mb-3">{category.description}</p>
                  <div className="flex justify-between text-sm">
                    <div className="text-msGray-500">
                      <span className="mr-1">Last scan:</span>
                      <span className="font-medium">{category.last_scan}</span>
                    </div>
                    <div>
                      <span className="text-red-600 font-medium">{category.metrics.issues - category.metrics.fixed}</span>
                      <span className="text-msGray-500"> open issues</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Vulnerabilities Tab */}
      {activeTab === 'vulnerabilities' && (
        <div className="card p-6">
          {/* Controls */}
          <div className="flex flex-wrap justify-between items-center mb-6">
            <div className="flex space-x-2 mb-4 sm:mb-0">
              <select 
                className="px-3 py-2 border border-msGray-300 rounded text-sm"
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <select className="px-3 py-2 border border-msGray-300 rounded text-sm">
                <option>All Categories</option>
                <option>Injection</option>
                <option>Authentication</option>
                <option>XSS</option>
                <option>Access Control</option>
                <option>Dependencies</option>
              </select>
              <select className="px-3 py-2 border border-msGray-300 rounded text-sm">
                <option>All Statuses</option>
                <option>Open</option>
                <option>Fixed</option>
                <option>In Progress</option>
                <option>Ignored</option>
              </select>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 border rounded ${viewMode === 'list' ? 'bg-red-50 border-red-200 text-red-600' : 'border-msGray-300'}`}
              >
                <BsList />
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 border rounded ${viewMode === 'grid' ? 'bg-red-50 border-red-200 text-red-600' : 'border-msGray-300'}`}
              >
                <BsGrid />
              </button>
              <button className="flex items-center bg-red-600 hover:bg-red-700 text-white rounded px-3 py-2 text-sm">
                <BsFilter className="mr-1" /> Filter
              </button>
            </div>
          </div>

          {/* Vulnerabilities List */}
          {viewMode === 'list' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left bg-msGray-50 border-y border-msGray-200">
                    <th className="px-4 py-3 font-medium">Severity</th>
                    <th className="px-4 py-3 font-medium">Title</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Location</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">CVSS</th>
                  </tr>
                </thead>
                <tbody>
                  {vulnerabilities.map((vuln) => (
                    <tr 
                      key={vuln.id} 
                      className="border-b border-msGray-200 hover:bg-msGray-50 cursor-pointer"
                      onClick={() => setSelectedScan(vuln.id === selectedScan ? null : vuln.id)}
                    >
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          vuln.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                          vuln.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                          vuln.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {vuln.severity}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium">{vuln.title}</td>
                      <td className="px-4 py-3 text-sm">{vuln.category}</td>
                      <td className="px-4 py-3 text-sm font-mono">{vuln.location}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          vuln.status === 'Open' ? 'bg-red-100 text-red-800' :
                          vuln.status === 'Fixed' ? 'bg-green-100 text-green-800' : 
                          'bg-msGray-100 text-msGray-800'
                        }`}>
                          {vuln.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium">
                        <span className={`${
                          vuln.cvss >= 7 ? 'text-red-600' :
                          vuln.cvss >= 4 ? 'text-orange-600' : 
                          'text-yellow-600'
                        }`}>
                          {vuln.cvss.toFixed(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vulnerabilities.map((vuln) => (
                <div 
                  key={vuln.id} 
                  className={`border rounded-lg p-4 cursor-pointer ${
                    selectedScan === vuln.id ? 'border-red-300 bg-red-50' : 'hover:border-red-200 hover:bg-red-50'
                  }`}
                  onClick={() => setSelectedScan(vuln.id === selectedScan ? null : vuln.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      vuln.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                      vuln.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                      vuln.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {vuln.severity}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      vuln.status === 'Open' ? 'bg-red-100 text-red-800' :
                      vuln.status === 'Fixed' ? 'bg-green-100 text-green-800' : 
                      'bg-msGray-100 text-msGray-800'
                    }`}>
                      {vuln.status}
                    </span>
                  </div>
                  <h3 className="font-medium mb-2">{vuln.title}</h3>
                  <div className="text-xs mb-3 text-msGray-500">
                    <span className="font-mono">{vuln.location}</span> | {vuln.category}
                  </div>
                  <p className="text-sm text-msGray-600 mb-3 line-clamp-2">{vuln.description}</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-msGray-500">CVSS: 
                      <span className={`font-medium ml-1 ${
                        vuln.cvss >= 7 ? 'text-red-600' :
                        vuln.cvss >= 4 ? 'text-orange-600' : 
                        'text-yellow-600'
                      }`}>
                        {vuln.cvss.toFixed(1)}
                      </span>
                    </span>
                    <span className="text-msGray-500">
                      {new Date(vuln.discovered).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Selected Vulnerability Details */}
          {selectedScan && (
            <div className="mt-6 p-4 border border-red-200 bg-red-50 rounded-lg">
              {(() => {
                const vuln = vulnerabilities.find(v => v.id === selectedScan);
                if (!vuln) return null;
                
                return (
                  <>
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-semibold">{vuln.title}</h2>
                      <button 
                        onClick={() => setSelectedScan(null)}
                        className="text-msGray-500 hover:text-msGray-700"
                      >
                        &times;
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-msGray-600 mb-1">Severity</div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          vuln.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                          vuln.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                          vuln.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {vuln.severity}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm text-msGray-600 mb-1">Category</div>
                        <div>{vuln.category}</div>
                      </div>
                      <div>
                        <div className="text-sm text-msGray-600 mb-1">Location</div>
                        <div className="font-mono">{vuln.location}</div>
                      </div>
                      <div>
                        <div className="text-sm text-msGray-600 mb-1">Status</div>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          vuln.status === 'Open' ? 'bg-red-100 text-red-800' :
                          vuln.status === 'Fixed' ? 'bg-green-100 text-green-800' : 
                          'bg-msGray-100 text-msGray-800'
                        }`}>
                          {vuln.status}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm text-msGray-600 mb-1">CVSS Score</div>
                        <div className={`${
                          vuln.cvss >= 7 ? 'text-red-600' :
                          vuln.cvss >= 4 ? 'text-orange-600' : 
                          'text-yellow-600'
                        } font-medium`}>
                          {vuln.cvss.toFixed(1)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-msGray-600 mb-1">CWE</div>
                        <div>{vuln.cwe}</div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-sm text-msGray-600 mb-1">Description</div>
                      <div className="p-3 bg-white rounded border border-msGray-200">
                        {vuln.description}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm text-msGray-600 mb-1">Remediation</div>
                      <div className="p-3 bg-white rounded border border-msGray-200">
                        {vuln.remediation}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button className="px-3 py-1.5 border border-msGray-300 hover:bg-msGray-50 rounded text-sm">
                        Mark as False Positive
                      </button>
                      {vuln.status === 'Open' ? (
                        <button className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-sm">
                          Fix Issue
                        </button>
                      ) : (
                        <button className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-sm" disabled>
                          Issue Fixed
                        </button>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* Scan History Tab */}
      {activeTab === 'scans' && (
        <div className="card p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Security Scan History</h2>
            <button className="flex items-center bg-red-600 hover:bg-red-700 text-white rounded px-3 py-2 text-sm">
              <BsSearch className="mr-1" /> Start New Scan
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-msGray-50 border-y border-msGray-200">
                  <th className="px-4 py-3 font-medium">Timestamp</th>
                  <th className="px-4 py-3 font-medium">Scan Type</th>
                  <th className="px-4 py-3 font-medium">Target</th>
                  <th className="px-4 py-3 font-medium">Issues Found</th>
                  <th className="px-4 py-3 font-medium">Duration</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {scanHistory.map((scan) => (
                  <tr key={scan.id} className="border-b border-msGray-200 hover:bg-msGray-50">
                    <td className="px-4 py-3">
                      {new Date(scan.timestamp).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 font-medium">{scan.type}</td>
                    <td className="px-4 py-3">{scan.target}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        {scan.vulnerabilities.critical > 0 && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                            {scan.vulnerabilities.critical} Critical
                          </span>
                        )}
                        {scan.vulnerabilities.high > 0 && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                            {scan.vulnerabilities.high} High
                          </span>
                        )}
                        <span className="text-sm text-msGray-600">
                          +{scan.vulnerabilities.medium + scan.vulnerabilities.low} more
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{scan.duration}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        {scan.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 border rounded-lg border-msGray-200 p-4">
            <h3 className="font-medium mb-3">Schedule Automated Scans</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-1">Scan Type</label>
                <select className="w-full px-3 py-2 border border-msGray-300 rounded text-sm">
                  <option>Full Scan</option>
                  <option>Code Analysis</option>
                  <option>Dependency Check</option>
                  <option>Container Scan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Frequency</label>
                <select className="w-full px-3 py-2 border border-msGray-300 rounded text-sm">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>On PR/Merge</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Notification</label>
                <select className="w-full px-3 py-2 border border-msGray-300 rounded text-sm">
                  <option>Email</option>
                  <option>Slack</option>
                  <option>Teams</option>
                  <option>None</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm">
                Schedule Scan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-6">Security Scan Settings</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Scan Configuration</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-msGray-200 rounded">
                <div>
                  <h4 className="font-medium">SAST (Static Application Security Testing)</h4>
                  <p className="text-sm text-msGray-600">Analyze source code for security vulnerabilities</p>
                </div>
                <div className="switch">
                  <input type="checkbox" id="sast" defaultChecked />
                  <label htmlFor="sast" className="slider round"></label>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-msGray-200 rounded">
                <div>
                  <h4 className="font-medium">Dependency Scanning</h4>
                  <p className="text-sm text-msGray-600">Check libraries and dependencies for known vulnerabilities</p>
                </div>
                <div className="switch">
                  <input type="checkbox" id="dependency" defaultChecked />
                  <label htmlFor="dependency" className="slider round"></label>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-msGray-200 rounded">
                <div>
                  <h4 className="font-medium">Secret Detection</h4>
                  <p className="text-sm text-msGray-600">Find hardcoded secrets, tokens, and credentials in your code</p>
                </div>
                <div className="switch">
                  <input type="checkbox" id="secrets" defaultChecked />
                  <label htmlFor="secrets" className="slider round"></label>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-msGray-200 rounded">
                <div>
                  <h4 className="font-medium">Container Scanning</h4>
                  <p className="text-sm text-msGray-600">Check container images for security vulnerabilities</p>
                </div>
                <div className="switch">
                  <input type="checkbox" id="container" defaultChecked />
                  <label htmlFor="container" className="slider round"></label>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-msGray-200 rounded">
                <div>
                  <h4 className="font-medium">DAST (Dynamic Application Security Testing)</h4>
                  <p className="text-sm text-msGray-600">Test running applications for security vulnerabilities</p>
                </div>
                <div className="switch">
                  <input type="checkbox" id="dast" />
                  <label htmlFor="dast" className="slider round"></label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Integrations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">GitHub Integration</h4>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Connected</span>
                </div>
                <p className="text-sm text-msGray-600 mb-2">Run security scans on pull requests and commits</p>
                <button className="text-sm text-red-600 hover:underline">Configure</button>
              </div>
              
              <div className="border rounded p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Jira Integration</h4>
                  <span className="px-2 py-1 bg-msGray-100 text-msGray-800 text-xs rounded">Not Connected</span>
                </div>
                <p className="text-sm text-msGray-600 mb-2">Create issues for security vulnerabilities</p>
                <button className="text-sm text-red-600 hover:underline">Connect</button>
              </div>
              
              <div className="border rounded p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Slack Notifications</h4>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Connected</span>
                </div>
                <p className="text-sm text-msGray-600 mb-2">Receive alerts for critical vulnerabilities</p>
                <button className="text-sm text-red-600 hover:underline">Configure</button>
              </div>
              
              <div className="border rounded p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">CI/CD Pipeline</h4>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Connected</span>
                </div>
                <p className="text-sm text-msGray-600 mb-2">Automate security scanning in your pipeline</p>
                <button className="text-sm text-red-600 hover:underline">Configure</button>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-msGray-200 rounded">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-msGray-600">Send email reports after each security scan</p>
                </div>
                <div className="switch">
                  <input type="checkbox" id="email-notify" defaultChecked />
                  <label htmlFor="email-notify" className="slider round"></label>
                </div>
              </div>
              
              <div>
                <label className="block font-medium mb-2">Recipients</label>
                <input type="text" className="w-full px-3 py-2 border border-msGray-300 rounded" defaultValue="security-team@company.com, devops@company.com" />
              </div>
              
              <div>
                <label className="block font-medium mb-2">Severity Threshold for Notifications</label>
                <select className="w-full px-3 py-2 border border-msGray-300 rounded">
                  <option>Critical Only</option>
                  <option>Critical and High</option>
                  <option>All Vulnerabilities</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button className="px-4 py-2 bg-msGray-100 hover:bg-msGray-200 rounded text-sm">Cancel</button>
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm">Save Settings</button>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
