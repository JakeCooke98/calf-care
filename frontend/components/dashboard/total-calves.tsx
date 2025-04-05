"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { calvesApi } from "@/lib/api-client";

export function TotalCalves() {
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCalves = async () => {
      try {
        setIsLoading(true);
        const calves = await calvesApi.getAll();
        setCount(calves.length);
      } catch (error) {
        console.error("Failed to fetch calves count:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalves();
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Calves</CardTitle>
        <Icons.spinner className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isLoading ? (
            <span className="animate-pulse">...</span>
          ) : (
            count
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Total calves in your herd
        </p>
      </CardContent>
    </Card>
  );
} 