"use client";
import { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import {
  BsLightningCharge,
  BsBarChart,
  BsBell,
  BsActivity,
  BsClockHistory,
  BsCpu
} from 'react-icons/bs';

export default function PerformanceMonitoringPage() {
  const [realtimeUsage, setRealtimeUsage] = useState<number>(72);
  const [alerts, setAlerts] = useState<string[]>([
    "CPU usage spike detected on node01",
    "Memory usage threshold exceeded on node03"
  ]);
  const [heatmapData, setHeatmapData] = useState<number[][]>([]);
  const [correlationData, setCorrelationData] = useState<{ metricA: number[], metricB: number[] }>({
    metricA: [/* ...sample data... */],
    metricB: [/* ...sample data... */]
  });
  const [history, setHistory] = useState<number[]>([/* ...sample data... */]);

  // Additional KPIs
  const [additionalKpis, setAdditionalKpis] = useState([
    { name: 'Response Time', value: '120ms' },
    { name: 'Throughput', value: '1.2k ops/sec' },
    { name: 'Error Rate', value: '0.4%' },
    { name: 'CPU Time', value: '2.1s' },
    { name: 'Memory Usage', value: '65%' },
  ]);

  // Simulate real-time metric updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeUsage(Math.min(Math.max(realtimeUsage + (Math.random() * 10 - 5), 20), 95));
    }, 2000);
    return () => clearInterval(interval);
  }, [realtimeUsage]);

  // Generate placeholder heatmap data
  useEffect(() => {
    const data = [];
    for (let i = 0; i < 6; i++) {
      data.push(Array.from({ length: 24 }, () => Math.floor(Math.random() * 100)));
    }
    setHeatmapData(data);
  }, []);

  return (
    <PageLayout
      title="Performance Monitoring"
      description="Gain insights into system metrics with real-time updates and analytical charts."
      agentType="performance-monitoring"
    >
      {/* Real-time Metrics */}
      <div className="card mb-6 p-4">
        <div className="flex items-center mb-2">
          <BsLightningCharge className="text-red-600 mr-2" />
          <h2 className="text-lg font-semibold">Real-time Metrics</h2>
        </div>
        <div className="text-3xl font-bold text-red-600">
          {realtimeUsage}%
        </div>
        <div className="text-sm text-msGray-600">Current CPU Usage</div>
      </div>

      {/* Performance Alerts */}
      <div className="card mb-6 p-4">
        <div className="flex items-center mb-2">
          <BsBell className="text-yellow-600 mr-2" />
          <h2 className="text-lg font-semibold">Performance Alerts</h2>
        </div>
        {alerts.length === 0 ? (
          <div className="text-sm text-msGray-600">No alerts at this time.</div>
        ) : (
          <ul className="list-disc list-inside text-msGray-700 text-sm space-y-1">
            {alerts.map((alert, idx) => (
              <li key={idx}>{alert}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Usage Heatmap */}
      <div className="card mb-6 p-4">
        <div className="flex items-center mb-2">
          <BsActivity className="text-green-600 mr-2" />
          <h2 className="text-lg font-semibold">Usage Heatmap</h2>
        </div>
        <div className="grid grid-cols-24 gap-1 max-w-full overflow-x-auto">
          {heatmapData.map((row, i) => (
            <div key={i} className="flex gap-1">
              {row.map((val, j) => (
                <div
                  key={`${i}-${j}`}
                  style={{ backgroundColor: `rgba(255,0,0,${val / 100})` }}
                  className="w-4 h-4 rounded-sm"
                  title={`Usage: ${val}%`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Resource Correlation */}
      <div className="card mb-6 p-4">
        <div className="flex items-center mb-2">
          <BsCpu className="text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold">Resource Correlation</h2>
        </div>
        <div className="text-sm text-msGray-600">
          Compare two performance metrics side by side
        </div>
        <div className="my-2">
          Metric A: {correlationData.metricA.length} data points
        </div>
        <div>
          Metric B: {correlationData.metricB.length} data points
        </div>
      </div>

      {/* Historical Trends */}
      <div className="card mb-6 p-4">
        <div className="flex items-center mb-2">
          <BsClockHistory className="text-purple-600 mr-2" />
          <h2 className="text-lg font-semibold">Historical Trends</h2>
        </div>
        <div className="text-msGray-600 text-sm mb-2">Daily performance data</div>
        <div className="flex gap-1">
          {history.map((val, index) => (
            <div
              key={index}
              style={{ height: `${val}px` }}
              className="w-2 bg-msBlue-600"
              title={`Value: ${val}`}
            ></div>
          ))}
        </div>
      </div>

      {/* New KPIs Section */}
      <div className="card p-4 mt-6">
        <h2 className="text-lg font-semibold mb-4">Additional KPIs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {additionalKpis.map((kpi, index) => (
            <div key={index} className="border rounded p-3 text-center">
              <div className="text-msGray-600 text-sm mb-1">{kpi.name}</div>
              <div className="text-xl font-bold text-red-600">{kpi.value}</div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
