"use client";

import { useState } from "react";
import Navigation from '@/app/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalvesTable } from "@/components/calves/calves-table";
import { SearchBar } from "@/components/SearchBar";

export default function Details() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navigation />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Details</h1>
          <SearchBar onSearch={setSearchQuery} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Calf Information</CardTitle>
          </CardHeader>
          <CardContent>
            <CalvesTable searchQuery={searchQuery} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}