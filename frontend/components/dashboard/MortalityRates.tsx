"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', rate: 2.1 },
  { month: 'Feb', rate: 1.8 },
  { month: 'Mar', rate: 2.3 },
  { month: 'Apr', rate: 2.0 },
  { month: 'May', rate: 1.5 },
  { month: 'Jun', rate: 1.7 },
];

export default function MortalityRates() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Mortality Rates</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="rate" stroke="#ef4444" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}