"use client";

import { useState } from "react";
import Navigation from '@/app/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WatchlistTable } from "@/components/calves/watchlist-table";
import { SearchBar } from "@/components/SearchBar";

export default function Watchlist() {
  const [searchQuery, setSearchQuery] = useState("");

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
            <CardTitle>Calves Requiring Attention</CardTitle>
          </CardHeader>
          <CardContent>
            <WatchlistTable searchQuery={searchQuery} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}