"use client";

import { useChartData } from '@/lib/hooks/use-dashboard-data';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';

export function CalfHealth() {
  const { data, isLoading, error } = useChartData('health');
  
  // Calculate percentages for the health statuses
  const calculatePercentage = (value: number) => {
    if (!data || data.length === 0) return 0;
    const total = data.reduce((sum, item) => sum + item.value, 0);
    return total > 0 ? Math.round((value / total) * 100) : 0;
  };
  
  // Calculate percentage of healthy calves (Good + Excellent)
  const getHealthyPercentage = () => {
    if (!data || data.length === 0) return 0;
    
    const healthyStatuses = ['Good', 'Excellent'];
    const healthyCalves = data
      .filter(item => healthyStatuses.includes(item.name))
      .reduce((sum, item) => sum + item.value, 0);
    
    const total = data.reduce((sum, item) => sum + item.value, 0);
    return total > 0 ? Math.round((healthyCalves / total) * 100) : 0;
  };
  
  // Find the most common health status
  const getMostCommonStatus = () => {
    if (!data || data.length === 0) return 'Unknown';
    return data.reduce((prev, current) => 
      (prev.value > current.value) ? prev : current
    ).name;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Calf Health</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-20" />
        ) : error ? (
          <div className="text-red-500 text-sm">Error loading data</div>
        ) : (
          <>
            <div className="text-2xl font-bold">{getHealthyPercentage()}%</div>
            <p className="text-xs text-muted-foreground">
              {data
                .filter(item => ['Fair', 'Poor', 'Critical'].includes(item.name))
                .map(item => `${item.name}: ${calculatePercentage(item.value)}%`)
                .join(', ')}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
} 