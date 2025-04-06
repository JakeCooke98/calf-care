"use client";

import Navigation from '@/app/Navigation';
import { TotalCalves } from '@/components/dashboard/total-calves';
import { CalfHealth } from '@/components/dashboard/calf-health';
import { AverageWeight } from '@/components/dashboard/average-weight';
import { BreedDistribution } from '@/components/dashboard/breed-distribution';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import NewCalvesToday from '@/components/dashboard/new-calves-today';
import GenderDistribution from '@/components/dashboard/gender-distribution';
import LocationDistribution from '@/components/dashboard/location-distribution';
import { AgeDistribution } from '@/components/dashboard/age-distribution';
import NewCalvesChart from '@/components/dashboard/NewCalvesChart';
import MortalityRates from '@/components/dashboard/MortalityRates';

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
          <LocationDistribution />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AgeDistribution />
          <NewCalvesChart />
          <MortalityRates />
        </div>
      </div>
    </>
  );
}