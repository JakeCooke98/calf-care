"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AverageWeight() {
  const averageWeight = 120; // in kg

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Average Weight</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{averageWeight} kg</div>
        <p className="text-xs text-muted-foreground">
          +5% from last month
        </p>
      </CardContent>
    </Card>
  );
}