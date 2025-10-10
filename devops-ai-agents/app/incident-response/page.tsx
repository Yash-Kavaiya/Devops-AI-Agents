import PageLayout from '@/components/PageLayout';
import MultiModalChat from '@/components/MultiModalChat';
import { BsBug, BsClockHistory, BsExclamationCircle, BsCheck2Circle } from 'react-icons/bs';

export default function IncidentResponsePage() {
  return (
    <PageLayout
      title="Incident Response"
      description="Detect and respond to system incidents with AI-assisted troubleshooting and remediation."
      agentType="incident-response"
    >
      <div className="card mb-6">
        <div className="flex items-center mb-4">
          <BsExclamationCircle size={20} className="text-msBlue-600 mr-2" />
          <h3 className="text-xl font-semibold">Active Incidents</h3>
        </div>
        <div className="space-y-3">
          <div className="p-3 bg-red-50 rounded-md border border-red-200">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <BsExclamationCircle className="text-red-500 mr-2" />
                <span className="font-medium">Database Connection Issues</span>
              </div>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Critical</span>
            </div>
            <p className="text-sm text-msGray-700 mb-2">Connection pool exhaustion causing intermittent failures.</p>
            <div className="flex justify-between text-xs text-msGray-500">
              <span>Detected 35 minutes ago</span>
              <span>24 affected services</span>
            </div>
          </div>
          
          <div className="p-3 bg-yellow-50 rounded-md border border-yellow-200">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <BsExclamationCircle className="text-yellow-500 mr-2" />
                <span className="font-medium">High API Latency</span>
              </div>
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Warning</span>
            </div>
            <p className="text-sm text-msGray-700 mb-2">Payment processing API response times exceeding thresholds.</p>
            <div className="flex justify-between text-xs text-msGray-500">
              <span>Detected 2 hours ago</span>
              <span>3 affected services</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center mb-4">
          <BsClockHistory size={20} className="text-msBlue-600 mr-2" />
          <h3 className="text-xl font-semibold">Recent Incidents</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-2 bg-green-50 rounded border border-green-200">
            <div className="flex items-center">
              <BsCheck2Circle className="text-green-500 mr-2" />
              <div>
                <div className="font-medium">CDN Cache Failure</div>
                <div className="text-xs text-msGray-500">Resolved 2 hours ago</div>
              </div>
            </div>
            <span className="text-xs">MTTR: 42m</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-green-50 rounded border border-green-200">
            <div className="flex items-center">
              <BsCheck2Circle className="text-green-500 mr-2" />
              <div>
                <div className="font-medium">Authentication Service Outage</div>
                <div className="text-xs text-msGray-500">Resolved 1 day ago</div>
              </div>
            </div>
            <span className="text-xs">MTTR: 28m</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-green-50 rounded border border-green-200">
            <div className="flex items-center">
              <BsCheck2Circle className="text-green-500 mr-2" />
              <div>
                <div className="font-medium">Network Degradation</div>
                <div className="text-xs text-msGray-500">Resolved 3 days ago</div>
              </div>
            </div>
            <span className="text-xs">MTTR: 1h 13m</span>
          </div>
        </div>
      </div>
      
      {/* Multi-Modal AI Chat Widget */}
      <MultiModalChat />
    </PageLayout>
  );
}
