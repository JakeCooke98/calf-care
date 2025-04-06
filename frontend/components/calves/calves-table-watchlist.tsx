"use client";

import { useState } from "react";
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
import { useToast } from "@/lib/use-toast";

interface CalvesTableWatchlistProps {
  calves: Calf[];
  isLoading: boolean;
  searchQuery: string;
  onRemove?: () => void;
}

export function CalvesTable({ calves, isLoading, searchQuery, onRemove }: CalvesTableWatchlistProps) {
  const { toast } = useToast();
  const [removingCalves, setRemovingCalves] = useState<Record<string, boolean>>({});
  const [localCalves, setLocalCalves] = useState<Calf[]>(calves);

  // Update local calves when the prop changes
  if (calves !== localCalves && !isLoading) {
    setLocalCalves(calves);
  }

  // Updated filter function to include numeric fields
  const filteredCalves = localCalves.filter(calf => {
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

  const removeFromWatchlist = async (calfId: string) => {
    try {
      setRemovingCalves(prev => ({ ...prev, [calfId]: true }));
      
      // Call API to update watchlist status
      await calvesApi.update(calfId, { inWatchlist: false });
      
      // Update local state immediately for better UX
      setLocalCalves(prev => prev.filter(calf => calf.id !== calfId));
      
      toast({
        title: "Success",
        description: "Calf removed from watchlist",
      });

      // Trigger parent component refresh if provided
      if (onRemove) {
        onRemove();
      }
    } catch (error) {
      console.error("Failed to remove from watchlist:", error);
      toast({
        title: "Error",
        description: "Failed to remove calf from watchlist",
        variant: "destructive",
      });
    } finally {
      setRemovingCalves(prev => ({ ...prev, [calfId]: false }));
    }
  };

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
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                    onClick={() => removeFromWatchlist(calf.id)}
                    disabled={removingCalves[calf.id]}
                  >
                    {removingCalves[calf.id] ? "Removing..." : "Remove"}
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