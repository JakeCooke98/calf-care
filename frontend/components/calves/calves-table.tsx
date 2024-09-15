"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export interface Calf {
  id: number;
  name: string;
  age: number;
  weight: number;
  health: string;
}

const initialCalvesData: Calf[] = [
  { id: 1, name: "Bessie", age: 3, weight: 120, health: "Good" },
  { id: 2, name: "Daisy", age: 2, weight: 100, health: "Excellent" },
  { id: 3, name: "Molly", age: 4, weight: 140, health: "Fair" },
];

interface CalvesTableProps {
  searchQuery: string;
}

export function CalvesTable({ searchQuery }: CalvesTableProps) {
  const [calvesData, setCalvesData] = useState<Calf[]>(initialCalvesData);
  const [filteredCalves, setFilteredCalves] = useState<Calf[]>(initialCalvesData);
  const [selectedCalves, setSelectedCalves] = useState<number[]>([]);

  useEffect(() => {
    const filtered = calvesData.filter((calf) =>
      Object.values(calf).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredCalves(filtered);
  }, [searchQuery, calvesData]);

  const toggleCalfSelection = (calfId: number) => {
    setSelectedCalves((prev) =>
      prev.includes(calfId)
        ? prev.filter((id) => id !== calfId)
        : [...prev, calfId]
    );
  };

  const addToWatchlist = () => {
    const watchlistCalves = selectedCalves.map((id) => {
      const calf = calvesData.find((c) => c.id === id);
      if (calf) {
        // Add to localStorage
        const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
        if (!watchlist.some((c: Calf) => c.id === calf.id)) {
          watchlist.push(calf);
          localStorage.setItem("watchlist", JSON.stringify(watchlist));
        }
      }
      return calf;
    });

    // Remove selected calves from the main list
    setCalvesData((prev) => prev.filter((calf) => !selectedCalves.includes(calf.id)));
    setSelectedCalves([]);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Select</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Age (months)</TableHead>
            <TableHead>Weight (kg)</TableHead>
            <TableHead>Health Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCalves.map((calf) => (
            <TableRow key={calf.id}>
              <TableCell>
                <Checkbox
                  checked={selectedCalves.includes(calf.id)}
                  onCheckedChange={() => toggleCalfSelection(calf.id)}
                />
              </TableCell>
              <TableCell>{calf.id}</TableCell>
              <TableCell>{calf.name}</TableCell>
              <TableCell>{calf.age}</TableCell>
              <TableCell>{calf.weight}</TableCell>
              <TableCell>{calf.health}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4">
        <Button onClick={addToWatchlist} disabled={selectedCalves.length === 0}>
          Add to Watchlist
        </Button>
      </div>
    </div>
  );
}