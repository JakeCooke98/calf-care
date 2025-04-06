"use client";

import { useChartData } from '@/lib/hooks/use-dashboard-data';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

// Custom colors for the chart
const BAR_COLOR = "#22c55e";

export function AgeDistribution() {
  const { data, isLoading, error } = useChartData('age');

  // Process data to ensure it's sorted correctly by age ranges
  const processData = () => {
    if (!data || data.length === 0) return [];
    
    // Define the order for age ranges
    const ageOrder = {
      '0-30 days': 1,
      '31-90 days': 2, 
      '91-180 days': 3,
      '181-365 days': 4,
      '366+ days': 5
    };
    
    // Sort by age range order
    return [...data].sort((a, b) => {
      // Default value for any ranges not in our predefined order
      const orderA = ageOrder[a.name] || 99;
      const orderB = ageOrder[b.name] || 99;
      return orderA - orderB;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Age Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Skeleton className="h-64 w-full" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-red-500">
            Error loading age distribution data
          </div>
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No age data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={processData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} calves`, 'Count']} />
              <Bar dataKey="value" name="Count" fill={BAR_COLOR} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
} 