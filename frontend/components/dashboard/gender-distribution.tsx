"use client"

import React from 'react';
import { useChartData } from '@/lib/hooks/use-dashboard-data';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DonutChart } from "@/components/ui/donut-chart";
import { Skeleton } from '@/components/ui/skeleton';

export default function GenderDistribution() {
  const { data, isLoading, error } = useChartData('gender');

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Gender Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Skeleton className="h-64 w-64 rounded-full" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-red-500">
            Error loading gender distribution data
          </div>
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No gender data available
          </div>
        ) : (
          <DonutChart data={data} />
        )}
      </CardContent>
    </Card>
  );
}