"use client";

import React from 'react';
import { useChartData } from '@/lib/hooks/use-dashboard-data';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DonutChart } from "@/components/ui/donut-chart";
import { Skeleton } from '@/components/ui/skeleton';

export default function LocationDistribution() {
  const { data, isLoading, error } = useChartData('location');

  // Only display the top 6 locations, group the rest as "Other"
  const processData = () => {
    if (!data || data.length === 0) return [];
    if (data.length <= 6) return data;
    
    // Sort by value, descending
    const sortedData = [...data].sort((a, b) => b.value - a.value);
    
    // Take top 5 and sum the rest as "Other"
    const top5 = sortedData.slice(0, 5);
    const others = sortedData.slice(5);
    const otherValue = others.reduce((sum, item) => sum + item.value, 0);
    
    return [...top5, { name: 'Other', value: otherValue }];
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Location Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Skeleton className="h-64 w-64 rounded-full" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-red-500">
            Error loading location distribution data
          </div>
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No location data available
          </div>
        ) : (
          <DonutChart data={processData()} />
        )}
      </CardContent>
    </Card>
  );
} 