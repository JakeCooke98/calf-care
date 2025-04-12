"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Edit } from "lucide-react";
import { useState } from "react";

type Location = {
  id: number;
  name: string;
  type: string;
  capacity: number;
};

export function FarmLocations() {
  const [locations, setLocations] = useState<Location[]>([
    { id: 1, name: "East Field", type: "Pasture", capacity: 50 },
    { id: 2, name: "West Field", type: "Pasture", capacity: 45 },
    { id: 3, name: "Main Barn", type: "Shelter", capacity: 30 },
    { id: 4, name: "Calving Barn", type: "Specialized", capacity: 12 },
    { id: 5, name: "Isolation Pen", type: "Medical", capacity: 5 },
  ]);
  const [newLocation, setNewLocation] = useState({ name: "", type: "", capacity: "" });

  const handleAddLocation = () => {
    if (newLocation.name && newLocation.type && newLocation.capacity) {
      setLocations([
        ...locations,
        { 
          id: locations.length ? Math.max(...locations.map(l => l.id)) + 1 : 1,
          name: newLocation.name,
          type: newLocation.type,
          capacity: parseInt(newLocation.capacity)
        }
      ]);
      setNewLocation({ name: "", type: "", capacity: "" });
    }
  };

  const handleRemoveLocation = (id: number) => {
    setLocations(locations.filter(location => location.id !== id));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Farm Locations</h3>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <Input 
          placeholder="Location Name" 
          value={newLocation.name} 
          onChange={(e) => setNewLocation({...newLocation, name: e.target.value})} 
        />
        <Input 
          placeholder="Type (Pasture, Barn, etc)" 
          value={newLocation.type} 
          onChange={(e) => setNewLocation({...newLocation, type: e.target.value})} 
        />
        <Input 
          type="number"
          placeholder="Capacity" 
          value={newLocation.capacity} 
          onChange={(e) => setNewLocation({...newLocation, capacity: e.target.value})} 
        />
        <Button onClick={handleAddLocation} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add Location
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {locations.map((location) => (
            <TableRow key={location.id}>
              <TableCell>{location.name}</TableCell>
              <TableCell>{location.type}</TableCell>
              <TableCell>{location.capacity}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveLocation(location.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
