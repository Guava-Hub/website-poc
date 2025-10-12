"use client";

import { useState, useEffect } from "react";
import { Search, Eye, Download } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
  };
  date: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: number;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      // Mock data - in real app, fetch from API
      const mockOrders: Order[] = [
        {
          id: "1",
          orderNumber: "ORD-2024-001",
          customer: { name: "John Doe", email: "john@example.com" },
          date: "2024-10-12T10:30:00",
          total: 299.99,
          status: "delivered",
          items: 3,
        },
        {
          id: "2",
          orderNumber: "ORD-2024-002",
          customer: { name: "Jane Smith", email: "jane@example.com" },
          date: "2024-10-11T14:20:00",
          total: 599.99,
          status: "shipped",
          items: 2,
        },
        {
          id: "3",
          orderNumber: "ORD-2024-003",
          customer: { name: "Bob Johnson", email: "bob@example.com" },
          date: "2024-10-11T09:15:00",
          total: 149.99,
          status: "processing",
          items: 1,
        },
        {
          id: "4",
          orderNumber: "ORD-2024-004",
          customer: { name: "Alice Brown", email: "alice@example.com" },
          date: "2024-10-10T16:45:00",
          total: 449.99,
          status: "pending",
          items: 4,
        },
        {
          id: "5",
          orderNumber: "ORD-2024-005",
          customer: { name: "Charlie Wilson", email: "charlie@example.com" },
          date: "2024-10-09T11:30:00",
          total: 899.99,
          status: "cancelled",
          items: 5,
        },
      ];
      setOrders(mockOrders);
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Order["status"]) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">
            Manage and track customer orders
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Orders
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-sm">Order #</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Items</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Total</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                    <th className="text-right py-3 px-4 font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium">{order.orderNumber}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium">{order.customer.name}</div>
                        <div className="text-sm text-muted-foreground">{order.customer.email}</div>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {formatDate(order.date)}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {order.items}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
