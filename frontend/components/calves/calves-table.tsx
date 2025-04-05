"use client";

import { useEffect, useState } from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Calf, calvesApi } from "@/lib/api-client";
import { Skeleton } from "@/components/ui/skeleton";

interface CalvesTableProps {
  searchQuery: string;
}

export function CalvesTable({ searchQuery }: CalvesTableProps) {
  const [calves, setCalves] = useState<Calf[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCalves = async () => {
      try {
        setIsLoading(true);
        const data = await calvesApi.getAll();
        setCalves(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch calves:", err);
        setError("Failed to load calves. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalves();
  }, []);

  // Updated filter function to include numeric fields
  const filteredCalves = calves.filter(calf => {
    const query = searchQuery.toLowerCase();
    return (
      calf.name.toLowerCase().includes(query) ||
      calf.breed?.toLowerCase().includes(query) ||
      calf.health.toLowerCase().includes(query) ||
      calf.location?.toLowerCase().includes(query) ||
      // Convert numeric values to strings for searching
      calf.age.toString().includes(query) ||
      calf.weight.toString().includes(query)
    );
  });

  if (error) {
    return (
      <div className="p-4 rounded-md bg-red-50 text-red-500">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 text-sm underline"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Age (days)</TableHead>
            <TableHead>Weight (kg)</TableHead>
            <TableHead>Health</TableHead>
            <TableHead>Breed</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Watchlist</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            // Loading skeleton
            Array(5).fill(0).map((_, index) => (
              <TableRow key={`loading-${index}`}>
                {Array(8).fill(0).map((_, cellIndex) => (
                  <TableCell key={`cell-${index}-${cellIndex}`}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : filteredCalves.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                No calves found.
              </TableCell>
            </TableRow>
          ) : (
            filteredCalves.map((calf) => (
              <TableRow key={calf.id}>
                <TableCell>{calf.name}</TableCell>
                <TableCell>{calf.age}</TableCell>
                <TableCell>{calf.weight}</TableCell>
                <TableCell>
                  <span 
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      calf.health === 'Excellent' ? 'bg-green-100 text-green-700' :
                      calf.health === 'Good' ? 'bg-blue-100 text-blue-700' :
                      calf.health === 'Fair' ? 'bg-yellow-100 text-yellow-700' :
                      calf.health === 'Poor' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}
                  >
                    {calf.health}
                  </span>
                </TableCell>
                <TableCell>{calf.breed || '-'}</TableCell>
                <TableCell>{calf.location || '-'}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    calf.isAlive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {calf.isAlive ? 'Alive' : 'Deceased'}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    calf.inWatchlist ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {calf.inWatchlist ? 'Watching' : 'Normal'}
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}