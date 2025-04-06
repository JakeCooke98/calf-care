"use client";

import { useState } from 'react';
import { useChartData } from '@/lib/hooks/use-dashboard-data';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

// Custom colors for the chart
const LINE_COLOR = "#ef4444";

export function MonthlyMortalityRate() {
  const [months] = useState(6);
  const { data, isLoading, error } = useChartData('mortality-rate', months);

  // Process data to ensure it's sorted chronologically
  const processData = () => {
    if (!data || data.length === 0) return [];
    
    // Sort by date (assumes format "MMM YYYY")
    return [...data].sort((a, b) => {
      const dateA = new Date(a.name);
      const dateB = new Date(b.name);
      return dateA.getTime() - dateB.getTime();
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Mortality Rates</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Skeleton className="h-64 w-full" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-red-500">
            Error loading mortality rate data
          </div>
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No mortality rate data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={processData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis 
                domain={[0, 'auto']} 
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Mortality Rate']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                name="Rate" 
                stroke={LINE_COLOR} 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
} 