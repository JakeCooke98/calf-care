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
import { Badge } from "@/components/ui/badge";
import { useHealthStatuses } from "@/lib/hooks/useSettings";
import { HealthStatus } from "@/types/settings";
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

export function HealthStatuses() {
  const { toast } = useToast();
  const { healthStatuses: statuses, isLoading, error, createHealthStatus, updateHealthStatus, deleteHealthStatus, isSaving } = useHealthStatuses(true);
  const [newStatus, setNewStatus] = useState({ 
    name: "", 
    color: "#10B981", 
    description: "", 
    requiresAttention: false,
    isEmergency: false,
    isActive: true 
  });
  const [editingStatus, setEditingStatus] = useState<HealthStatus | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusToDelete, setStatusToDelete] = useState<string | null>(null);

  const handleAddStatus = async () => {
    if (newStatus.name && newStatus.color) {
      try {
        await createHealthStatus({
          name: newStatus.name,
          color: newStatus.color,
          description: newStatus.description,
          requiresAttention: newStatus.requiresAttention,
          isEmergency: newStatus.isEmergency,
          isActive: true,
        });
        setNewStatus({ 
          name: "", 
          color: "#10B981", 
          description: "", 
          requiresAttention: false,
          isEmergency: false,
          isActive: true 
        });
      } catch (error) {
        console.error("Error adding health status:", error);
      }
    } else {
      toast({
        title: "Validation Error",
        description: "Status name and color are required",
        variant: "destructive",
      });
    }
  };

  const handleUpdateStatus = async () => {
    if (editingStatus && editingStatus.name) {
      try {
        await updateHealthStatus(editingStatus.id, {
          name: editingStatus.name,
          color: editingStatus.color,
          description: editingStatus.description,
          requiresAttention: editingStatus.requiresAttention,
          isEmergency: editingStatus.isEmergency,
          isActive: editingStatus.isActive,
        });
        setEditingStatus(null);
      } catch (error) {
        console.error("Error updating health status:", error);
      }
    }
  };

  const handleDeleteStatus = async () => {
    if (statusToDelete) {
      try {
        await deleteHealthStatus(statusToDelete);
        setStatusToDelete(null);
        setDeleteDialogOpen(false);
      } catch (error) {
        console.error("Error deleting health status:", error);
      }
    }
  };

  const confirmDelete = (id: string) => {
    setStatusToDelete(id);
    setDeleteDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading health statuses...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-destructive">
        <AlertCircle className="h-8 w-8 mb-2" />
        <h3 className="text-lg font-medium">Error Loading Health Statuses</h3>
        <p className="text-sm text-muted-foreground">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Health Statuses</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <Input
          placeholder="Status Name"
          value={newStatus.name}
          onChange={(e) => setNewStatus({ ...newStatus, name: e.target.value })}
        />
        <div className="flex items-center gap-2">
          <label htmlFor="color" className="text-sm whitespace-nowrap">Color:</label>
          <Input
            id="color"
            type="color"
            value={newStatus.color}
            onChange={(e) => setNewStatus({ ...newStatus, color: e.target.value })}
            className="w-16 h-10 p-1"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="requires-attention" className="text-sm whitespace-nowrap">Requires Attention:</label>
            <Switch
              id="requires-attention"
              checked={newStatus.requiresAttention}
              onCheckedChange={(value) => setNewStatus({ ...newStatus, requiresAttention: value })}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="is-emergency" className="text-sm whitespace-nowrap">Emergency:</label>
            <Switch
              id="is-emergency"
              checked={newStatus.isEmergency}
              onCheckedChange={(value) => setNewStatus({ ...newStatus, isEmergency: value })}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Description"
            value={newStatus.description}
            onChange={(e) => setNewStatus({ ...newStatus, description: e.target.value })}
            className="flex-1"
          />
          <Button onClick={handleAddStatus} className="flex-shrink-0" disabled={isSaving}>
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4 mr-1" />} Add
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Attention</TableHead>
            <TableHead>Active</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {statuses && statuses.map((status) => (
            <TableRow key={status.id} className={!status.isActive ? "opacity-60" : ""}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: status.color }}
                  ></div>
                  <span className="font-medium">{status.name}</span>
                </div>
              </TableCell>
              <TableCell>{status.description}</TableCell>
              <TableCell>
                {status.requiresAttention && (
                  <Badge className={status.isEmergency ? "bg-red-500" : "bg-yellow-500"}>
                    {status.isEmergency ? "Emergency" : "Requires Attention"}
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {status.isActive ? (
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
                    onClick={() => setEditingStatus(status)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => confirmDelete(status.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Status Dialog */}
      {editingStatus && (
        <Dialog open={!!editingStatus} onOpenChange={(open) => !open && setEditingStatus(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Health Status</DialogTitle>
              <DialogDescription>Make changes to the health status information.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={editingStatus.name}
                  onChange={(e) => setEditingStatus({ ...editingStatus, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-color" className="text-right">
                  Color
                </Label>
                <div className="flex items-center gap-2 col-span-3">
                  <Input
                    id="edit-color"
                    type="color"
                    value={editingStatus.color}
                    onChange={(e) => setEditingStatus({ ...editingStatus, color: e.target.value })}
                    className="w-16 h-10 p-1"
                  />
                  <div 
                    className="w-6 h-6 rounded-full ml-2"
                    style={{ backgroundColor: editingStatus.color }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="edit-description"
                  value={editingStatus.description || ""}
                  onChange={(e) => setEditingStatus({ ...editingStatus, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Attention
                </Label>
                <div className="flex flex-col space-y-2 col-span-3">
                  <div className="flex items-center gap-2">
                    <Switch 
                      id="edit-attention"
                      checked={editingStatus.requiresAttention}
                      onCheckedChange={(checked) => setEditingStatus({ ...editingStatus, requiresAttention: checked })}
                    />
                    <Label htmlFor="edit-attention" className="text-sm">
                      Requires Attention
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      id="edit-emergency"
                      checked={editingStatus.isEmergency}
                      onCheckedChange={(checked) => setEditingStatus({ ...editingStatus, isEmergency: checked })}
                    />
                    <Label htmlFor="edit-emergency" className="text-sm">
                      Emergency
                    </Label>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-active" className="text-right">
                  Active
                </Label>
                <div className="flex items-center gap-2 col-span-3">
                  <Switch 
                    id="edit-active"
                    checked={editingStatus.isActive}
                    onCheckedChange={(checked) => setEditingStatus({ ...editingStatus, isActive: checked })}
                  />
                  <Label htmlFor="edit-active" className="text-sm">
                    {editingStatus.isActive ? "Active" : "Inactive"}
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingStatus(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateStatus} disabled={isSaving}>
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
              Are you sure you want to delete this health status? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteStatus} disabled={isSaving}>
              {isSaving ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
