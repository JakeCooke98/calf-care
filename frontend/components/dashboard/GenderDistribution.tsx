"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DonutChart } from "@/components/ui/donut-chart";

const genderData = [
  { name: 'Male', value: 550 },
  { name: 'Female', value: 450 },
];

export default function GenderDistribution() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gender Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <DonutChart data={genderData} />
      </CardContent>
    </Card>
  );
}