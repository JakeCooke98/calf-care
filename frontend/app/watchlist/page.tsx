"use client";

import { useState } from "react";
import Navigation from '@/app/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchBar } from "@/components/SearchBar";
import { useWatchlistCalves } from "@/lib/hooks/use-calves";
import { Skeleton } from "@/components/ui/skeleton";
import { CalvesTable } from "@/components/calves/calves-table-watchlist";

export default function WatchlistPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { calves, isLoading, error, refetch } = useWatchlistCalves();

  return (
    <>
      <Navigation />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Watchlist</h1>
          <SearchBar onSearch={setSearchQuery} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Calves Requiring Attention</span>
              {isLoading ? (
                <Skeleton className="h-4 w-16" />
              ) : (
                <span className="text-sm font-normal text-muted-foreground">
                  {calves.length} calves
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="p-4 rounded-md bg-red-50 text-red-500">
                <p>Failed to load watchlist data. Please try again later.</p>
                <button 
                  onClick={refetch} 
                  className="mt-2 text-sm underline"
                >
                  Retry
                </button>
              </div>
            ) : (
              <CalvesTable 
                calves={calves} 
                isLoading={isLoading} 
                searchQuery={searchQuery} 
                onRemove={refetch}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}