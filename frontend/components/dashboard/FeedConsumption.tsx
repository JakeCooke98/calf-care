"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { week: 'Week 1', milk: 40, grain: 5 },
  { week: 'Week 2', milk: 35, grain: 10 },
  { week: 'Week 3', milk: 30, grain: 15 },
  { week: 'Week 4', milk: 25, grain: 20 },
];

export default function FeedConsumption() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Feed Consumption</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="milk" fill="#0ea5e9" name="Milk (L)" />
            <Bar dataKey="grain" fill="#22c55e" name="Grain (kg)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}