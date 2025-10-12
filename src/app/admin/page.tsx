"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Clock,
  CreditCard,
  Star
} from "lucide-react";
import { BarChart } from "@/components/admin/bar-chart";
import { LineChart } from "@/components/admin/line-chart";
import { DonutChart } from "@/components/admin/donut-chart";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminDashboardPage() {
  // Mock data - in real app, fetch from API
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Total Orders",
      value: "2,350",
      change: "+15.3%",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      title: "Total Products",
      value: "856",
      change: "+5.2%",
      trend: "up",
      icon: Package,
    },
    {
      title: "Total Users",
      value: "12,234",
      change: "-2.4%",
      trend: "down",
      icon: Users,
    },
  ];

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      email: "john@example.com",
      amount: "$299.99",
      status: "Completed",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      email: "jane@example.com",
      amount: "$599.99",
      status: "Processing",
    },
    {
      id: "ORD-003",
      customer: "Bob Johnson",
      email: "bob@example.com",
      amount: "$149.99",
      status: "Pending",
    },
    {
      id: "ORD-004",
      customer: "Alice Brown",
      email: "alice@example.com",
      amount: "$449.99",
      status: "Completed",
    },
    {
      id: "ORD-005",
      customer: "Charlie Wilson",
      email: "charlie@example.com",
      amount: "$899.99",
      status: "Processing",
    },
  ];

  // Revenue chart data (last 7 days)
  const revenueData = [
    { label: "Mon", value: 4500 },
    { label: "Tue", value: 5200 },
    { label: "Wed", value: 4800 },
    { label: "Thu", value: 6100 },
    { label: "Fri", value: 7200 },
    { label: "Sat", value: 8500 },
    { label: "Sun", value: 6800 },
  ];

  // Orders by category
  const ordersByCategory = [
    { label: "Electronics", value: 450, color: "#3b82f6" },
    { label: "Clothing", value: 320, color: "#8b5cf6" },
    { label: "Books", value: 180, color: "#10b981" },
    { label: "Home", value: 220, color: "#f59e0b" },
    { label: "Sports", value: 150, color: "#ef4444" },
    { label: "Other", value: 100, color: "#6b7280" },
  ];

  // Sales by product category (for donut chart)
  const salesByCategory = [
    { label: "Electronics", value: 12500, color: "#3b82f6" },
    { label: "Clothing", value: 8500, color: "#8b5cf6" },
    { label: "Home & Garden", value: 6200, color: "#10b981" },
    { label: "Sports", value: 4800, color: "#f59e0b" },
    { label: "Other", value: 3200, color: "#6b7280" },
  ];

  // Top products
  const topProducts = [
    { name: "Wireless Headphones", sales: 324, revenue: "$9,720", trend: "up" },
    { name: "Smart Watch", sales: 289, revenue: "$8,670", trend: "up" },
    { name: "Laptop Stand", sales: 256, revenue: "$5,120", trend: "down" },
    { name: "USB-C Cable", sales: 234, revenue: "$2,340", trend: "up" },
    { name: "Phone Case", sales: 198, revenue: "$3,960", trend: "up" },
  ];

  // Traffic sources
  const trafficSources = [
    { source: "Direct", visitors: 4523, percentage: 45 },
    { source: "Organic Search", visitors: 3012, percentage: 30 },
    { source: "Social Media", visitors: 1508, percentage: 15 },
    { source: "Referral", visitors: 1005, percentage: 10 },
  ];

  // Additional metrics
  const additionalMetrics = [
    {
      title: "Avg. Order Value",
      value: "$85.50",
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "+0.5%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Active Sessions",
      value: "573",
      change: "+12.3%",
      trend: "up",
      icon: Eye,
    },
    {
      title: "Avg. Response Time",
      value: "2.4h",
      change: "-15.2%",
      trend: "up",
      icon: Clock,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your store
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-1">
            Last updated: Just now
          </Badge>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  <span className={`text-xs font-medium flex items-center gap-1 ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}>
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {stat.change}
                  </span>
                  <span className="text-xs text-muted-foreground">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Revenue Chart */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <p className="text-sm text-muted-foreground">
              Daily revenue for the last 7 days
            </p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="week" className="space-y-4">
              <TabsList>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
              <TabsContent value="week" className="space-y-4">
                <LineChart data={revenueData} height={250} color="#3b82f6" />
              </TabsContent>
              <TabsContent value="month" className="space-y-4">
                <LineChart data={revenueData} height={250} color="#8b5cf6" />
              </TabsContent>
              <TabsContent value="year" className="space-y-4">
                <LineChart data={revenueData} height={250} color="#10b981" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Sales by Category */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <p className="text-sm text-muted-foreground">
              Distribution of sales across categories
            </p>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <DonutChart data={salesByCategory} size={220} thickness={45} />
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {additionalMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className={`text-xs flex items-center gap-1 mt-1 ${
                  metric.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {metric.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {metric.change} from last week
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Analytics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Orders by Category Bar Chart */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Orders by Category</CardTitle>
            <p className="text-sm text-muted-foreground">
              Number of orders per category this month
            </p>
          </CardHeader>
          <CardContent>
            <BarChart data={ordersByCategory} height={280} />
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <p className="text-sm text-muted-foreground">
              Best selling products this month
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.sales} sales
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{product.revenue}</p>
                    <div className="flex items-center justify-end gap-1">
                      {product.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-600" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic and Orders Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <p className="text-sm text-muted-foreground">
              Where your visitors are coming from
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficSources.map((source) => (
                <div key={source.source} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{source.source}</span>
                    <span className="text-sm text-muted-foreground">
                      {source.visitors.toLocaleString()} ({source.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <p className="text-sm text-muted-foreground">
              Latest orders from customers
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{order.amount}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full inline-block ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Processing"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
