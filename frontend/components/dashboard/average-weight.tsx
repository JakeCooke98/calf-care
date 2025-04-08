"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calvesApi } from "@/lib/api-client";

export function AverageWeight() {
  const [average, setAverage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const stats = await calvesApi.getStats();
        setAverage(stats.averageWeight);
      } catch (error) {
        console.error("Failed to fetch average weight:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Average Weight</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isLoading ? (
            <span className="animate-pulse">...</span>
          ) : (
            `${average.toFixed(1)} kg`
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          +5% from last month
        </p>
      </CardContent>
    </Card>
  );
} 