"use client";
import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import {
  BsGraphUp,
  BsGearFill,
  BsLightning,
  BsClockHistory,
  BsCardChecklist,
  BsAlarm,
  BsTools,
  BsClipboardData,
  BsCalendar2Check,
  BsArrowRepeat,
  BsBarChart
} from 'react-icons/bs';

export default function LoadTestingPage() {
  const [testScenarios, setTestScenarios] = useState([{ name: 'Basic Scenario', load: 50 }]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Add KPIs for load testing 
  const [loadTestKpis, setLoadTestKpis] = useState([
    { name: 'Response Time', value: '230ms', trend: 'down', target: '<300ms' },
    { name: 'Throughput', value: '542 req/s', trend: 'up', target: '>500 req/s' },
    { name: 'Error Rate', value: '1.2%', trend: 'down', target: '<2%' },
    { name: 'Concurrent Users', value: '1,250', trend: 'up', target: '>1,000' },
    { name: 'Resource Utilization', value: '68%', trend: 'stable', target: '<75%' },
    { name: 'Latency (P95)', value: '410ms', trend: 'down', target: '<500ms' },
    { name: 'Time to First Byte', value: '125ms', trend: 'down', target: '<150ms' },
    { name: 'Success Rate', value: '98.8%', trend: 'up', target: '>98%' }
  ]);
  
  // Additional load test scenarios
  const [scenarios, setScenarios] = useState([
    { name: 'Peak Load', description: 'Simulates maximum expected traffic', vus: 1500, duration: '10m' },
    { name: 'Stress Test', description: 'Gradually increasing load until failure', vus: 2500, duration: '15m' },
    { name: 'Soak Test', description: 'Sustained moderate load over time', vus: 800, duration: '60m' }
  ]);

  // 1. Test Scenarios
  const addScenario = () => {
    setTestScenarios([...testScenarios, { name: `Scenario ${testScenarios.length + 1}`, load: 10 }]);
  };

  // 2. Configuration
  const configureTest = () => {
    // ...placeholder...
  };

  // 3. Ramp Up
  const rampUp = () => {
    // ...placeholder...
  };

  // 4. Ramp Down
  const rampDown = () => {
    // ...placeholder...
  };

  // 5. Live Metrics
  const runTest = () => {
    setLoading(true);
    setTimeout(() => {
      setResults([...results, { scenario: testScenarios[0].name, tps: 120, errors: 2 }]);
      setLoading(false);
    }, 1500);
  };

  // 6. Result Analysis
  // ...placeholder...

  // 7. Scheduling
  // ...placeholder...

  // 8. Alerts
  // ...placeholder...

  // 9. Logging / History
  // ...placeholder...

  return (
    <PageLayout
      title="Load Testing"
      description="Simulate traffic and analyze system performance under load."
      agentType="load-testing"
    >
      {/* Add KPI Dashboard */}
      <div className="card p-4 mb-4">
        <div className="flex items-center mb-4">
          <BsBarChart className="text-green-600 mr-2" />
          <h2 className="text-lg font-semibold">Key Performance Indicators</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {loadTestKpis.map((kpi, idx) => (
            <div key={idx} className="border rounded-lg p-3">
              <div className="text-sm text-msGray-600">{kpi.name}</div>
              <div className="flex items-end justify-between">
                <div className="text-xl font-bold">{kpi.value}</div>
                <div className="flex items-center text-xs">
                  <span className={`mr-1 ${
                    kpi.trend === 'up' ? 'text-green-600' : 
                    kpi.trend === 'down' ? 'text-red-600' : 'text-msGray-600'
                  }`}>
                    {kpi.trend === 'up' ? '↑' : kpi.trend === 'down' ? '↓' : '→'}
                  </span>
                  <span className="text-msGray-500">Target: {kpi.target}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-4 mb-4">
        <div className="flex items-center mb-2">
          <BsCardChecklist className="text-msBlue-600 mr-2" />
          <h2 className="text-lg font-semibold">Test Scenarios</h2>
        </div>
        <ul className="list-inside list-disc ml-4 text-sm text-msGray-700">
          {testScenarios.map((scenario, idx) => (
            <li key={idx} className="mb-1">
              {scenario.name} ({scenario.load} VUs)
            </li>
          ))}
        </ul>
        <button
          onClick={addScenario}
          className="mt-3 bg-msBlue-600 hover:bg-msBlue-700 text-white text-sm px-3 py-1 rounded"
        >
          New Scenario
        </button>
      </div>

      {/* Test Scenario Templates */}
      <div className="card p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <BsCardChecklist className="text-msBlue-600 mr-2" />
            <h2 className="text-lg font-semibold">Test Scenario Templates</h2>
          </div>
          <button className="text-sm bg-msBlue-100 text-msBlue-800 px-2 py-1 rounded">
            Create New Template
          </button>
        </div>
        <div className="space-y-3">
          {scenarios.map((scenario, idx) => (
            <div key={idx} className="flex justify-between items-center border-b pb-2 last:border-0">
              <div>
                <div className="font-medium">{scenario.name}</div>
                <div className="text-sm text-msGray-600">{scenario.description}</div>
              </div>
              <div className="flex space-x-4 text-sm">
                <div className="text-msGray-600">{scenario.vus} VUs</div>
                <div className="text-msGray-600">{scenario.duration}</div>
                <button className="text-msBlue-600 hover:underline">Run</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-4 mb-4 grid grid-cols-2 gap-4">
        <button
          onClick={configureTest}
          className="flex items-center bg-msGray-100 hover:bg-msGray-200 rounded p-2"
        >
          <BsGearFill className="mr-2" /> Configure
        </button>
        <button
          onClick={rampUp}
          className="flex items-center bg-msGray-100 hover:bg-msGray-200 rounded p-2"
        >
          <BsLightning className="mr-2" /> Ramp Up
        </button>
        <button
          onClick={rampDown}
          className="flex items-center bg-msGray-100 hover:bg-msGray-200 rounded p-2"
        >
          <BsTools className="mr-2" /> Ramp Down
        </button>
        <button
          onClick={runTest}
          disabled={loading}
          className={`flex items-center ${loading ? 'bg-msGray-200' : 'bg-msBlue-600 hover:bg-msBlue-700'} text-white rounded p-2`}
        >
          <BsGraphUp className="mr-2" /> {loading ? 'Running...' : 'Run Test'}
        </button>
      </div>

      <div className="card p-4 mb-4">
        <div className="flex items-center mb-2">
          <BsClipboardData className="text-msBlue-600 mr-2" />
          <h2 className="text-lg font-semibold">Live Metrics & Results</h2>
        </div>
        <div className="text-sm text-msGray-700 space-y-2">
          {results.map((res, idx) => (
            <div key={idx} className="bg-msGray-100 p-2 rounded">
              {res.scenario} - TPS: {res.tps}, Errors: {res.errors}
            </div>
          ))}
          {results.length === 0 && (
            <div>No test results yet.</div>
          )}
        </div>
      </div>

      <div className="card p-4 mb-4 grid grid-cols-2 gap-4">
        <button className="flex items-center bg-msGray-100 hover:bg-msGray-200 rounded p-2">
          <BsCalendar2Check className="mr-2" /> Scheduling
        </button>
        <button className="flex items-center bg-msGray-100 hover:bg-msGray-200 rounded p-2">
          <BsAlarm className="mr-2" /> Alerts
        </button>
        <button className="flex items-center bg-msGray-100 hover:bg-msGray-200 rounded p-2">
          <BsClockHistory className="mr-2" /> History
        </button>
        <button className="flex items-center bg-msGray-100 hover:bg-msGray-200 rounded p-2">
          <BsArrowRepeat className="mr-2" /> Analysis
        </button>
      </div>
    </PageLayout>
  );
}
