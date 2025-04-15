"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Edit, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useLocations } from "@/lib/hooks/useSettings";
import { FarmLocation } from "@/types/settings";
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export function FarmLocations() {
  const { toast } = useToast();
  const { locations, isLoading, error, createLocation, updateLocation, deleteLocation, isSaving } = useLocations(true);
  const [newLocation, setNewLocation] = useState({ 
    name: "", 
    description: "", 
    address: "", 
    capacity: "",
    isActive: true 
  });
  const [editingLocation, setEditingLocation] = useState<FarmLocation | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState<string | null>(null);

  const handleAddLocation = async () => {
    if (newLocation.name) {
      try {
        await createLocation({
          name: newLocation.name,
          description: newLocation.description,
          address: newLocation.address,
          capacity: newLocation.capacity ? parseInt(newLocation.capacity) : undefined,
          isActive: true,
        });
        setNewLocation({ name: "", description: "", address: "", capacity: "", isActive: true });
      } catch (error) {
        console.error("Error adding location:", error);
      }
    } else {
      toast({
        title: "Validation Error",
        description: "Location name is required",
        variant: "destructive",
      });
    }
  };

  const handleUpdateLocation = async () => {
    if (editingLocation && editingLocation.name) {
      try {
        await updateLocation(editingLocation.id, {
          name: editingLocation.name,
          description: editingLocation.description,
          address: editingLocation.address,
          capacity: editingLocation.capacity ? parseInt(String(editingLocation.capacity)) : undefined,
          isActive: editingLocation.isActive,
        });
        setEditingLocation(null);
      } catch (error) {
        console.error("Error updating location:", error);
      }
    }
  };

  const handleDeleteLocation = async () => {
    if (locationToDelete) {
      try {
        await deleteLocation(locationToDelete);
        setLocationToDelete(null);
        setDeleteDialogOpen(false);
      } catch (error) {
        console.error("Error deleting location:", error);
      }
    }
  };

  const confirmDelete = (id: string) => {
    setLocationToDelete(id);
    setDeleteDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading locations...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-destructive">
        <AlertCircle className="h-8 w-8 mb-2" />
        <h3 className="text-lg font-medium">Error Loading Locations</h3>
        <p className="text-sm text-muted-foreground">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Farm Locations</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <Input 
          placeholder="Location Name" 
          value={newLocation.name} 
          onChange={(e) => setNewLocation({...newLocation, name: e.target.value})} 
        />
        <Input 
          placeholder="Address" 
          value={newLocation.address} 
          onChange={(e) => setNewLocation({...newLocation, address: e.target.value})} 
        />
        <Input 
          type="number"
          placeholder="Capacity" 
          value={newLocation.capacity} 
          onChange={(e) => setNewLocation({...newLocation, capacity: e.target.value})} 
        />
        <div className="flex gap-2">
          <Textarea
            placeholder="Brief description"
            value={newLocation.description}
            onChange={(e) => setNewLocation({...newLocation, description: e.target.value})}
            className="min-h-[40px] flex-1"
          />
          <Button onClick={handleAddLocation} className="flex-shrink-0" disabled={isSaving}>
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4 mr-1" />} Add
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {locations && locations.map((location) => (
            <TableRow key={location.id} className={!location.isActive ? "opacity-60" : ""}>
              <TableCell className="font-medium">{location.name}</TableCell>
              <TableCell>{location.description}</TableCell>
              <TableCell>{location.address}</TableCell>
              <TableCell>{location.capacity}</TableCell>
              <TableCell>
                {location.isActive ? (
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
                    onClick={() => setEditingLocation(location)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => confirmDelete(location.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Location Dialog */}
      {editingLocation && (
        <Dialog open={!!editingLocation} onOpenChange={(open) => !open && setEditingLocation(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Location</DialogTitle>
              <DialogDescription>Make changes to the location information.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={editingLocation.name}
                  onChange={(e) => setEditingLocation({ ...editingLocation, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-address" className="text-right">
                  Address
                </Label>
                <Input
                  id="edit-address"
                  value={editingLocation.address || ""}
                  onChange={(e) => setEditingLocation({ ...editingLocation, address: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-capacity" className="text-right">
                  Capacity
                </Label>
                <Input
                  id="edit-capacity"
                  type="number"
                  value={editingLocation.capacity || ""}
                  onChange={(e) => setEditingLocation({ ...editingLocation, capacity: e.target.value ? parseInt(e.target.value, 10) : undefined })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="edit-description"
                  value={editingLocation.description || ""}
                  onChange={(e) => setEditingLocation({ ...editingLocation, description: e.target.value })}
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
                    checked={editingLocation.isActive}
                    onCheckedChange={(checked) => setEditingLocation({ ...editingLocation, isActive: checked })}
                  />
                  <Label htmlFor="edit-active" className="text-sm">
                    {editingLocation.isActive ? "Active" : "Inactive"}
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingLocation(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateLocation} disabled={isSaving}>
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
              Are you sure you want to delete this location? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteLocation} disabled={isSaving}>
              {isSaving ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
