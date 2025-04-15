"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
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
import { DailyBirthRate } from '@/components/dashboard/daily-birth-rate';
import { MonthlyMortalityRate } from '@/components/dashboard/monthly-mortality-rate';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  
  useEffect(() => {
    console.log("Dashboard session status:", status);
    console.log("Dashboard session data:", session);
  }, [session, status]);

  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div className="flex items-center justify-center h-screen">Not authenticated. Please sign in.</div>;
  }

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
          <DailyBirthRate />
          <MonthlyMortalityRate />
        </div>
      </div>
    </>
  );
}