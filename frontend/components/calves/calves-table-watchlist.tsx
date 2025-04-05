"use client";

import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Calf } from "@/lib/api-client";
import { Skeleton } from "@/components/ui/skeleton";

interface CalvesTableWatchlistProps {
  calves: Calf[];
  isLoading: boolean;
  searchQuery: string;
}

export function CalvesTable({ calves, isLoading, searchQuery }: CalvesTableWatchlistProps) {
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
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            // Loading skeleton
            Array(3).fill(0).map((_, index) => (
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
                No calves in watchlist{searchQuery ? " matching search criteria" : ""}.
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
                  <button 
                    className="text-blue-500 hover:text-blue-700 text-sm"
                    onClick={() => {
                      // This would be implemented to remove from watchlist
                      // Will need a modal confirmation
                      console.log('Remove from watchlist:', calf.id);
                    }}
                  >
                    Remove
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
} 