"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DonutChart } from "@/components/ui/donut-chart";

const breedData = [
  { name: 'Friesian', value: 600 },
  { name: 'Angus', value: 400 },
];

export default function BreedDistribution() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Breed Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <DonutChart data={breedData} />
      </CardContent>
    </Card>
  );
}