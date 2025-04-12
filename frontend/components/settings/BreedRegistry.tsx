"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2, Edit } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

type Breed = {
  id: number;
  name: string;
  description: string;
  avgWeight: string;
};

export function BreedRegistry() {
  const [breeds, setBreeds] = useState<Breed[]>([
    { id: 1, name: "Angus", description: "Black beef cattle breed", avgWeight: "600-700" },
    { id: 2, name: "Holstein", description: "Black and white dairy cattle", avgWeight: "580-680" },
    { id: 3, name: "Jersey", description: "Small dairy breed with high butterfat", avgWeight: "400-500" },
    { id: 4, name: "Hereford", description: "Red beef cattle with white face", avgWeight: "630-730" },
    { id: 5, name: "Simmental", description: "Large dual-purpose cattle breed", avgWeight: "700-800" },
  ]);
  const [newBreed, setNewBreed] = useState({ name: "", description: "", avgWeight: "" });

  const handleAddBreed = () => {
    if (newBreed.name) {
      setBreeds([
        ...breeds,
        {
          id: breeds.length ? Math.max(...breeds.map(b => b.id)) + 1 : 1,
          name: newBreed.name,
          description: newBreed.description,
          avgWeight: newBreed.avgWeight
        }
      ]);
      setNewBreed({ name: "", description: "", avgWeight: "" });
    }
  };

  const handleRemoveBreed = (id: number) => {
    setBreeds(breeds.filter(breed => breed.id !== id));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Breed Registry</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <Input
          placeholder="Breed Name"
          value={newBreed.name}
          onChange={(e) => setNewBreed({ ...newBreed, name: e.target.value })}
        />
        <Input
          placeholder="Avg. Weight (kg)"
          value={newBreed.avgWeight}
          onChange={(e) => setNewBreed({ ...newBreed, avgWeight: e.target.value })}
        />
        <div className="flex gap-2">
          <Textarea
            placeholder="Brief description"
            value={newBreed.description}
            onChange={(e) => setNewBreed({ ...newBreed, description: e.target.value })}
            className="min-h-[40px] flex-1"
          />
          <Button onClick={handleAddBreed} className="flex-shrink-0">
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Avg. Weight (kg)</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {breeds.map((breed) => (
            <TableRow key={breed.id}>
              <TableCell className="font-medium">{breed.name}</TableCell>
              <TableCell>{breed.description}</TableCell>
              <TableCell>{breed.avgWeight}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveBreed(breed.id)}>
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
