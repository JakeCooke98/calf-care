"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TotalCalves() {
  const totalCalves = 950;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalCalves}</div>
        <p className="text-xs text-muted-foreground">
          +20.1% from last month
        </p>
      </CardContent>
    </Card>
  );
}