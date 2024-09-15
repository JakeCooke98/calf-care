"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calf } from "./calves-table";

interface WatchlistTableProps {
  searchQuery: string;
}

export function WatchlistTable({ searchQuery }: WatchlistTableProps) {
  const [watchlistCalves, setWatchlistCalves] = useState<Calf[]>([]);
  const [filteredWatchlist, setFilteredWatchlist] = useState<Calf[]>([]);

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    setWatchlistCalves(storedWatchlist);
  }, []);

  useEffect(() => {
    const filtered = watchlistCalves.filter((calf) =>
      Object.values(calf).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredWatchlist(filtered);
  }, [searchQuery, watchlistCalves]);

  const removeFromWatchlist = (calfId: number) => {
    const updatedWatchlist = watchlistCalves.filter((calf) => calf.id !== calfId);
    setWatchlistCalves(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Age (months)</TableHead>
          <TableHead>Weight (kg)</TableHead>
          <TableHead>Health Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredWatchlist.map((calf) => (
          <TableRow key={calf.id}>
            <TableCell>{calf.id}</TableCell>
            <TableCell>{calf.name}</TableCell>
            <TableCell>{calf.age}</TableCell>
            <TableCell>{calf.weight}</TableCell>
            <TableCell>{calf.health}</TableCell>
            <TableCell>
              <Button variant="destructive" onClick={() => removeFromWatchlist(calf.id)}>
                Remove
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}