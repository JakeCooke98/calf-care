"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CalfHealth() {
  const healthyPercentage = 85;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Health Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{healthyPercentage}% Healthy</div>
        <p className="text-xs text-muted-foreground">
          +2% from last week
        </p>
      </CardContent>
    </Card>
  );
}