import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import TotalCalves from '@/components/dashboard/TotalCalves';
import CalfHealth from '@/components/dashboard/CalfHealth';
import NewCalvesToday from '@/components/dashboard/NewCalvesToday';
import AverageWeight from '@/components/dashboard/AverageWeight';
import TodoList from '@/components/dashboard/TodoList';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import Navigation from '@/app/Navigation';

const BreedDistribution = dynamic(() => import('@/components/dashboard/BreedDistribution'), { ssr: false });
const GenderDistribution = dynamic(() => import('@/components/dashboard/GenderDistribution'), { ssr: false });
const LocationCharts = dynamic(() => import('@/components/dashboard/LocationCharts'), { ssr: false });
const AgeDistribution = dynamic(() => import('@/components/dashboard/AgeDistribution'), { ssr: false });
const NewCalvesChart = dynamic(() => import('@/components/dashboard/NewCalvesChart'), { ssr: false });
const MortalityRates = dynamic(() => import('@/components/dashboard/MortalityRates'), { ssr: false });

export default function DashboardPage() {
  return (
    <>
      <Navigation />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <DatePickerWithRange />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <TotalCalves />
          <CalfHealth />
          <NewCalvesToday />
          <AverageWeight />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <BreedDistribution />
          <GenderDistribution />
          <LocationCharts />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AgeDistribution />
          <NewCalvesChart />
          <MortalityRates />
        </div>
        {/* TODO: Implement to do list functionality */}
        {/* <div className="mt-6">
          <TodoList />
        </div> */}
      </div>
    </>
  );
}