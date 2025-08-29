'use client';

import { useState, useEffect } from 'react';

interface PerformanceMetrics {
  responseTime: number;
  toolsAvailable: number;
  serverStatus: 'online' | 'slow' | 'offline';
  lastChecked: number;
}

export default function MCPPerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkServerPerformance = async () => {
    setIsChecking(true);
    const startTime = Date.now();
    
    try {
      const response = await fetch('/api/mcp', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/event-stream'
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'tools/list',
          id: Date.now()
        })
      });
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      if (response.ok) {
        const responseText = await response.text();
        let data;
        
        if (response.headers.get("content-type")?.includes("text/event-stream")) {
          // Handle SSE response
          const lines = responseText.split("\n");
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const jsonStr = line.slice(6);
              if (jsonStr !== "[DONE]") {
                try {
                  data = JSON.parse(jsonStr);
                  break;
                } catch (e) {
                  // Skip invalid JSON lines
                }
              }
            }
          }
        } else {
          // Fallback for regular JSON responses
          try {
            data = JSON.parse(responseText);
          } catch (e) {
            throw new Error('Invalid response format');
          }
        }
        
        const toolCount = data?.result?.tools?.length || 0;
        
        setMetrics({
          responseTime,
          toolsAvailable: toolCount,
          serverStatus: responseTime < 500 ? 'online' : 'slow',
          lastChecked: Date.now()
        });
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      setMetrics({
        responseTime: 0,
        toolsAvailable: 0,
        serverStatus: 'offline',
        lastChecked: Date.now()
      });
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkServerPerformance();
    const interval = setInterval(checkServerPerformance, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'slow': return 'text-yellow-600 bg-yellow-100';
      case 'offline': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500 animate-pulse';
      case 'slow': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Live Server Status</h3>
        <button
          onClick={checkServerPerformance}
          disabled={isChecking}
          className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded text-sm font-medium transition-colors disabled:opacity-50"
        >
          {isChecking ? 'Checking...' : 'Refresh'}
        </button>
      </div>

      {metrics ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <span className={`w-3 h-3 rounded-full ${getStatusDot(metrics.serverStatus)} mr-2`}></span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metrics.serverStatus)}`}>
                {metrics.serverStatus.toUpperCase()}
              </span>
            </div>
            <div className="text-xs text-gray-500">Server Status</div>
          </div>

          <div className="text-center">
            <div className="text-lg font-bold text-gray-900 mb-1">
              {metrics.responseTime}ms
            </div>
            <div className="text-xs text-gray-500">Response Time</div>
          </div>

          <div className="text-center">
            <div className="text-lg font-bold text-gray-900 mb-1">
              {metrics.toolsAvailable}
            </div>
            <div className="text-xs text-gray-500">Tools Available</div>
          </div>

          <div className="text-center">
            <div className="text-sm font-mono text-gray-600 mb-1">
              {formatTime(metrics.lastChecked)}
            </div>
            <div className="text-xs text-gray-500">Last Checked</div>
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <div className="text-sm text-gray-600">Checking server status...</div>
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium text-blue-900">Production MCP Server</span>
        </div>
        <p className="text-xs text-blue-700 mt-1">
          This is a live production server implementing MCP 2025-03-26 protocol. 
          The AI chat interface uses this exact server for real-time professional data access.
        </p>
      </div>
    </div>
  );
}
