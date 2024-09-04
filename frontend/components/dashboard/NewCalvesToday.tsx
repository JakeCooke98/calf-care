"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewCalvesToday() {
  const newCalves = 12;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">New Today</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{newCalves}</div>
        <p className="text-xs text-muted-foreground">
          +2 from yesterday
        </p>
      </CardContent>
    </Card>
  );
}