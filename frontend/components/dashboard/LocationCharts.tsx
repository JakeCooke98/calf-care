"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DonutChart } from "@/components/ui/donut-chart";

const data = [
  { name: 'Pen A', value: 30 },
  { name: 'Pen B', value: 25 },
  { name: 'Pen C', value: 20 },
  { name: 'Pen D', value: 15 },
  { name: 'Other', value: 10 },
];

export default function LocationCharts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Location Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <DonutChart data={data} />
      </CardContent>
    </Card>
  );
}