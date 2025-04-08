"use client";

import { useDashboardStats } from '@/lib/hooks/use-dashboard-data';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { Skeleton } from '@/components/ui/skeleton';

export function TotalCalves() {
  const { stats, isLoading, error } = useDashboardStats();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-20" />
        ) : error ? (
          <div className="text-red-500 text-sm">Error loading data</div>
        ) : (
          <>
            <div className="text-2xl font-bold">{stats?.totalCount || 0}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
} 