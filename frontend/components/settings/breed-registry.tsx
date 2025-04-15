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
import { Plus, Trash2, Edit, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useBreeds } from "@/lib/hooks/useSettings";
import { Breed } from "@/types/settings";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export function BreedRegistry() {
  const { toast } = useToast();
  const { breeds, isLoading, error, createBreed, updateBreed, deleteBreed, isSaving } = useBreeds(true);
  const [newBreed, setNewBreed] = useState({ name: "", description: "", avgWeight: "", isActive: true });
  const [editingBreed, setEditingBreed] = useState<Breed | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [breedToDelete, setBreedToDelete] = useState<string | null>(null);

  const handleAddBreed = async () => {
    if (newBreed.name) {
      try {
        await createBreed({
          name: newBreed.name,
          description: newBreed.description,
          avgWeight: newBreed.avgWeight,
          isActive: true,
        });
        setNewBreed({ name: "", description: "", avgWeight: "", isActive: true });
      } catch (error) {
        console.error("Error adding breed:", error);
      }
    } else {
      toast({
        title: "Validation Error",
        description: "Breed name is required",
        variant: "destructive",
      });
    }
  };

  const handleUpdateBreed = async () => {
    if (editingBreed && editingBreed.name) {
      try {
        await updateBreed(editingBreed.id, {
          name: editingBreed.name,
          description: editingBreed.description,
          avgWeight: editingBreed.avgWeight,
          isActive: editingBreed.isActive,
        });
        setEditingBreed(null);
      } catch (error) {
        console.error("Error updating breed:", error);
      }
    }
  };

  const handleDeleteBreed = async () => {
    if (breedToDelete) {
      try {
        await deleteBreed(breedToDelete);
        setBreedToDelete(null);
        setDeleteDialogOpen(false);
      } catch (error) {
        console.error("Error deleting breed:", error);
      }
    }
  };

  const confirmDelete = (id: string) => {
    setBreedToDelete(id);
    setDeleteDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading breeds...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-destructive">
        <AlertCircle className="h-8 w-8 mb-2" />
        <h3 className="text-lg font-medium">Error Loading Breeds</h3>
        <p className="text-sm text-muted-foreground">Please try again later.</p>
      </div>
    );
  }

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
          <Button onClick={handleAddBreed} className="flex-shrink-0" disabled={isSaving}>
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4 mr-1" />} Add
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Avg. Weight (kg)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {breeds && breeds.map((breed) => (
            <TableRow key={breed.id} className={!breed.isActive ? "opacity-60" : ""}>
              <TableCell className="font-medium">{breed.name}</TableCell>
              <TableCell>{breed.description}</TableCell>
              <TableCell>{breed.avgWeight}</TableCell>
              <TableCell>
                {breed.isActive ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Active
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">
                    Inactive
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setEditingBreed(breed)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => confirmDelete(breed.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Breed Dialog */}
      {editingBreed && (
        <Dialog open={!!editingBreed} onOpenChange={(open) => !open && setEditingBreed(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Breed</DialogTitle>
              <DialogDescription>Make changes to the breed information.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={editingBreed.name}
                  onChange={(e) => setEditingBreed({ ...editingBreed, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-weight" className="text-right">
                  Avg. Weight
                </Label>
                <Input
                  id="edit-weight"
                  value={editingBreed.avgWeight || ""}
                  onChange={(e) => setEditingBreed({ ...editingBreed, avgWeight: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="edit-description"
                  value={editingBreed.description || ""}
                  onChange={(e) => setEditingBreed({ ...editingBreed, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-active" className="text-right">
                  Active
                </Label>
                <div className="flex items-center gap-2 col-span-3">
                  <Switch 
                    id="edit-active"
                    checked={editingBreed.isActive}
                    onCheckedChange={(checked) => setEditingBreed({ ...editingBreed, isActive: checked })}
                  />
                  <Label htmlFor="edit-active" className="text-sm">
                    {editingBreed.isActive ? "Active" : "Inactive"}
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingBreed(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateBreed} disabled={isSaving}>
                {isSaving ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : "Save Changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this breed? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteBreed} disabled={isSaving}>
              {isSaving ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
