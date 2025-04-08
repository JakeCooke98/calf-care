"use client";

import { useState } from 'react';
import { useChartData } from '@/lib/hooks/use-dashboard-data';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

// Custom colors for the chart
const BAR_COLOR = "#0ea5e9";

export function DailyBirthRate() {
  const [days] = useState(7);
  const { data, isLoading, error } = useChartData('birth-rate', days);

  // Helper to format dates to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  // Process data for display
  const processData = () => {
    if (!data || data.length === 0) return [];
    
    // Sort by date ascending
    return [...data].sort((a, b) => {
      return new Date(a.name).getTime() - new Date(b.name).getTime();
    }).map(item => ({
      ...item,
      displayDate: formatDate(item.name)
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Birth Rate</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Skeleton className="h-64 w-full" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-red-500">
            Error loading daily birth rate data
          </div>
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No birth rate data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={processData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="displayDate" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} calves`, 'Birth Count']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Bar dataKey="value" name="Births" fill={BAR_COLOR} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
} 