"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: '2023-05-01', count: 4 },
  { date: '2023-05-02', count: 3 },
  { date: '2023-05-03', count: 2 },
  { date: '2023-05-04', count: 5 },
  { date: '2023-05-05', count: 1 },
  { date: '2023-05-06', count: 6 },
  { date: '2023-05-07', count: 3 },
];

export default function NewCalvesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Birth Rate</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}