"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "moderator" | "customer";
}

export function ProtectedRoute({ children, requiredRole = "customer" }: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }

    if (!isLoading && isAuthenticated && requiredRole && user) {
      // Check if user has required role
      const roleHierarchy = {
        customer: 1,
        moderator: 2,
        admin: 3,
      };

      const userLevel = roleHierarchy[user.role];
      const requiredLevel = roleHierarchy[requiredRole];

      if (userLevel < requiredLevel) {
        router.push("/");
      }
    }
  }, [isLoading, isAuthenticated, user, requiredRole, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requiredRole && user && user.role !== requiredRole && user.role !== "admin") {
    return null;
  }

  return <>{children}</>;
}
