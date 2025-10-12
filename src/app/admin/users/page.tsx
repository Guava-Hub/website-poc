"use client";

import { useState, useEffect } from "react";
import { Search, Edit, Ban, CheckCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "customer" | "admin" | "moderator";
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  orderCount: number;
  totalSpent: number;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      // Mock data - in real app, fetch from API
      const mockUsers: User[] = [
        {
          id: "1",
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          role: "customer",
          isActive: true,
          emailVerified: true,
          createdAt: "2024-01-15T10:30:00",
          orderCount: 12,
          totalSpent: 2499.99,
        },
        {
          id: "2",
          firstName: "Jane",
          lastName: "Smith",
          email: "jane@example.com",
          role: "customer",
          isActive: true,
          emailVerified: true,
          createdAt: "2024-02-20T14:20:00",
          orderCount: 8,
          totalSpent: 1599.99,
        },
        {
          id: "3",
          firstName: "Bob",
          lastName: "Johnson",
          email: "bob@example.com",
          role: "moderator",
          isActive: true,
          emailVerified: true,
          createdAt: "2024-03-10T09:15:00",
          orderCount: 0,
          totalSpent: 0,
        },
        {
          id: "4",
          firstName: "Alice",
          lastName: "Brown",
          email: "alice@example.com",
          role: "customer",
          isActive: false,
          emailVerified: true,
          createdAt: "2024-04-05T16:45:00",
          orderCount: 3,
          totalSpent: 599.99,
        },
        {
          id: "5",
          firstName: "Charlie",
          lastName: "Wilson",
          email: "charlie@example.com",
          role: "admin",
          isActive: true,
          emailVerified: true,
          createdAt: "2024-01-01T11:30:00",
          orderCount: 0,
          totalSpent: 0,
        },
      ];
      setUsers(mockUsers);
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "active" && user.isActive) ||
      (statusFilter === "inactive" && !user.isActive);

    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadgeColor = (role: User["role"]) => {
    const colors = {
      customer: "default",
      moderator: "secondary",
      admin: "destructive",
    };
    return colors[role] as "default" | "secondary" | "destructive";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleToggleStatus = async (userId: string) => {
    try {
      // In real app: await userService.toggleStatus(userId);
      setUsers(users.map(user => 
        user.id === userId ? { ...user, isActive: !user.isActive } : user
      ));
    } catch (error) {
      console.error("Failed to toggle user status:", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">
          Manage user accounts and permissions
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users ({filteredUsers.length})</CardTitle>
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
                    <th className="text-left py-3 px-4 font-medium text-sm">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Orders</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Total Spent</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Joined</th>
                    <th className="text-right py-3 px-4 font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-semibold text-sm">
                              {user.firstName[0]}{user.lastName[0]}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">{user.firstName} {user.lastName}</div>
                            {user.emailVerified && (
                              <div className="text-xs text-green-600 flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" />
                                Verified
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {user.email}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={getRoleBadgeColor(user.role)} className="capitalize">
                          {user.role}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={user.isActive ? "default" : "secondary"}>
                          {user.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {user.orderCount}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">
                        ${user.totalSpent.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleToggleStatus(user.id)}
                          >
                            <Ban className="h-4 w-4 text-red-600" />
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
