'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const weightData = [
  { name: 'Jan', avg: 120 },
  { name: 'Feb', avg: 132 },
  { name: 'Mar', avg: 145 },
  { name: 'Apr', avg: 155 },
  { name: 'May', avg: 165 },
  { name: 'Jun', avg: 172 },
];

const feedConsumptionData = [
  { name: 'Mon', amount: 400 },
  { name: 'Tue', amount: 430 },
  { name: 'Wed', amount: 448 },
  { name: 'Thu', amount: 470 },
  { name: 'Fri', amount: 450 },
  { name: 'Sat', amount: 420 },
  { name: 'Sun', amount: 410 },
];

export function DashboardCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Average Weight Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="avg" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Weekly Feed Consumption</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={feedConsumptionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}