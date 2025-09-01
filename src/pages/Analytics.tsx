import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, Package, Truck, Clock, DollarSign, MapPin, AlertTriangle } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const deliveryData = [
  { month: "Jan", delivered: 1240, delayed: 89, pending: 145 },
  { month: "Feb", delivered: 1456, delayed: 67, pending: 123 },
  { month: "Mar", delivered: 1632, delayed: 45, pending: 134 },
  { month: "Apr", delivered: 1789, delayed: 78, pending: 156 },
  { month: "May", delivered: 1923, delayed: 34, pending: 167 },
  { month: "Jun", delivered: 2145, delayed: 56, pending: 178 }
];

const revenueData = [
  { month: "Jan", revenue: 45600 },
  { month: "Feb", revenue: 52340 },
  { month: "Mar", revenue: 48920 },
  { month: "Apr", revenue: 61250 },
  { month: "May", revenue: 58740 },
  { month: "Jun", revenue: 67890 }
];

const regionData = [
  { name: "Northeast", value: 35, color: "hsl(var(--primary))" },
  { name: "Southeast", value: 28, color: "hsl(var(--secondary))" },
  { name: "Midwest", value: 22, color: "hsl(var(--accent))" },
  { name: "West", value: 15, color: "hsl(var(--muted))" }
];

const performanceMetrics = [
  {
    title: "On-Time Delivery Rate",
    value: "94.2%",
    change: "+3.1%",
    isPositive: true,
    icon: Clock,
    trend: "up"
  },
  {
    title: "Average Delivery Time",
    value: "2.4 days",
    change: "-0.3 days",
    isPositive: true,
    icon: TrendingUp,
    trend: "down"
  },
  {
    title: "Fleet Utilization",
    value: "87.5%",
    change: "+5.2%",
    isPositive: true,
    icon: Truck,
    trend: "up"
  },
  {
    title: "Customer Satisfaction",
    value: "4.8/5",
    change: "+0.2",
    isPositive: true,
    icon: Package,
    trend: "up"
  }
];

const recentAlerts = [
  {
    type: "delay",
    message: "Shipment SH-2024-003 delayed by 4 hours",
    severity: "high",
    time: "2 min ago"
  },
  {
    type: "maintenance",
    message: "Vehicle V-003 requires immediate maintenance",
    severity: "medium",
    time: "15 min ago"
  },
  {
    type: "fuel",
    message: "Vehicle V-005 fuel level below 25%",
    severity: "medium",
    time: "1 hour ago"
  },
  {
    type: "route",
    message: "Route optimization suggested for Northeast region",
    severity: "low",
    time: "2 hours ago"
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "high":
      return "bg-status-delayed text-status-delayed";
    case "medium":
      return "bg-status-in-transit text-status-in-transit";
    case "low":
      return "bg-status-pending text-status-pending";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-card-foreground">Analytics & Reports</h1>
          <p className="text-muted-foreground">Performance insights and operational metrics</p>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="border-card-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                      <p className="text-2xl font-bold text-card-foreground">{metric.value}</p>
                      <div className="flex items-center gap-1">
                        {metric.trend === "up" ? (
                          <TrendingUp className="w-3 h-3 text-status-delivered" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-status-delivered" />
                        )}
                        <p className="text-xs font-medium text-status-delivered">
                          {metric.change} from last month
                        </p>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-background-secondary rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Delivery Performance */}
          <Card className="border-card-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Delivery Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={deliveryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar dataKey="delivered" fill="hsl(var(--primary))" name="Delivered" />
                  <Bar dataKey="delayed" fill="hsl(var(--destructive))" name="Delayed" />
                  <Bar dataKey="pending" fill="hsl(var(--muted))" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue Trend */}
          <Card className="border-card-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                Revenue Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                    formatter={(value) => [`$${value?.toLocaleString()}`, "Revenue"]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Regional Distribution */}
          <Card className="border-card-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Regional Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={regionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {regionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card className="border-card-border bg-card lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-primary" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background-secondary border border-card-border">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-card-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className={`${getSeverityColor(alert.severity)}/10 border-transparent`}>
                    {alert.severity.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Analytics;