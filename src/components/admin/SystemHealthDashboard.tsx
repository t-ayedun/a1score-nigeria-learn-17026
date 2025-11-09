import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Server, Database, Wifi, Cpu, HardDrive, Users, Activity, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";

interface SystemHealthDashboardProps {
  onBack: () => void;
}

const SystemHealthDashboard = ({ onBack }: SystemHealthDashboardProps) => {
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Mock system metrics
  const [systemMetrics, setSystemMetrics] = useState({
    server: {
      status: "healthy",
      uptime: "99.9%",
      cpu: 24,
      memory: 67,
      disk: 45,
      responseTime: 245
    },
    database: {
      status: "healthy",
      connections: 45,
      maxConnections: 100,
      queryTime: 12,
      size: "2.4GB"
    },
    ai: {
      status: "healthy",
      queriesPerHour: 1247,
      avgProcessingTime: 0.8,
      successRate: 99.2,
      costThisMonth: 2847
    },
    users: {
      online: 234,
      peakToday: 567,
      totalRegistered: 1247,
      activeToday: 789
    }
  });

  const alerts = [
    {
      id: 1,
      type: "warning",
      message: "High AI API usage detected - 85% of monthly quota used",
      time: "5 minutes ago",
      severity: "medium"
    },
    {
      id: 2,
      type: "info",
      message: "Scheduled maintenance window tonight 2:00-4:00 AM",
      time: "1 hour ago",
      severity: "low"
    },
    {
      id: 3,
      type: "success",
      message: "Database backup completed successfully",
      time: "2 hours ago",
      severity: "low"
    }
  ];

  const services = [
    { name: "Main Application", status: "online", latency: "142ms" },
    { name: "AI Processing Service", status: "online", latency: "89ms" },
    { name: "Authentication Service", status: "online", latency: "67ms" },
    { name: "File Storage Service", status: "online", latency: "234ms" },
    { name: "Email Service", status: "online", latency: "156ms" },
    { name: "Analytics Service", status: "degraded", latency: "567ms" },
    { name: "Payment Processing", status: "online", latency: "98ms" },
    { name: "Mobile API", status: "online", latency: "123ms" }
  ];

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Simulate metric updates
      setSystemMetrics(prev => ({
        ...prev,
        server: {
          ...prev.server,
          cpu: Math.max(15, Math.min(85, prev.server.cpu + (Math.random() - 0.5) * 10)),
          memory: Math.max(45, Math.min(90, prev.server.memory + (Math.random() - 0.5) * 5)),
          responseTime: Math.max(100, Math.min(500, prev.server.responseTime + (Math.random() - 0.5) * 50))
        },
        users: {
          ...prev.users,
          online: Math.max(100, Math.min(400, prev.users.online + Math.floor((Math.random() - 0.5) * 20)))
        }
      }));
      setLastRefresh(new Date());
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": case "healthy": return "bg-green-500";
      case "degraded": case "warning": return "bg-yellow-500";
      case "offline": case "error": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case "high": return "border-red-200 bg-red-50";
      case "medium": return "border-yellow-200 bg-yellow-50";
      case "low": return "border-blue-200 bg-blue-50";
      default: return "border-gray-200 bg-gray-50";
    }
  };

  const refreshMetrics = () => {
    setLastRefresh(new Date());
    // In a real app, this would fetch fresh data
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold">System Health Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={refreshMetrics}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Badge variant="outline">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </Badge>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Server className="h-6 w-6 text-blue-600" />
              <div className={`w-3 h-3 rounded-full ${getStatusColor(systemMetrics.server.status)}`} />
            </div>
            <h3 className="font-medium">Server Health</h3>
            <p className="text-2xl font-bold">{systemMetrics.server.uptime}</p>
            <p className="text-sm text-muted-foreground">Uptime</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Database className="h-6 w-6 text-green-600" />
              <div className={`w-3 h-3 rounded-full ${getStatusColor(systemMetrics.database.status)}`} />
            </div>
            <h3 className="font-medium">Database</h3>
            <p className="text-2xl font-bold">{systemMetrics.database.connections}</p>
            <p className="text-sm text-muted-foreground">Active connections</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Activity className="h-6 w-6 text-purple-600" />
              <div className={`w-3 h-3 rounded-full ${getStatusColor(systemMetrics.ai.status)}`} />
            </div>
            <h3 className="font-medium">AI Services</h3>
            <p className="text-2xl font-bold">{systemMetrics.ai.successRate}%</p>
            <p className="text-sm text-muted-foreground">Success rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-6 w-6 text-orange-600" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <h3 className="font-medium">Active Users</h3>
            <p className="text-2xl font-bold">{systemMetrics.users.online}</p>
            <p className="text-sm text-muted-foreground">Online now</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5" />
              Server Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>CPU Usage</span>
                <span>{systemMetrics.server.cpu}%</span>
              </div>
              <Progress value={systemMetrics.server.cpu} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>Memory Usage</span>
                <span>{systemMetrics.server.memory}%</span>
              </div>
              <Progress value={systemMetrics.server.memory} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>Disk Usage</span>
                <span>{systemMetrics.server.disk}%</span>
              </div>
              <Progress value={systemMetrics.server.disk} className="h-2" />
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between">
                <span>Response Time</span>
                <span className="font-medium">{systemMetrics.server.responseTime}ms</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5" />
              Database Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Connections</p>
                <p className="text-2xl font-bold">
                  {systemMetrics.database.connections}/{systemMetrics.database.maxConnections}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Query Time</p>
                <p className="text-2xl font-bold">{systemMetrics.database.queryTime}ms</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Database Size</p>
                <p className="text-2xl font-bold">{systemMetrics.database.size}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className="bg-green-100 text-green-800">Healthy</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="h-5 w-5" />
            Service Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service) => (
              <div key={service.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-sm">{service.name}</p>
                  <p className="text-xs text-muted-foreground">{service.latency}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(service.status)}`} />
                  <span className="text-xs capitalize">{service.status}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            System Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.severity)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                  <Badge variant={alert.severity === 'high' ? 'destructive' : alert.severity === 'medium' ? 'default' : 'secondary'}>
                    {alert.severity}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemHealthDashboard;