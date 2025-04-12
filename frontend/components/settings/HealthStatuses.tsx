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
import { Badge } from "@/components/ui/badge";

type HealthStatus = {
  id: number;
  name: string;
  color: string;
  description: string;
  requiresAction: boolean;
};

export function HealthStatuses() {
  const [statuses, setStatuses] = useState<HealthStatus[]>([
    { id: 1, name: "Excellent", color: "#10B981", description: "No health concerns", requiresAction: false },
    { id: 2, name: "Good", color: "#3B82F6", description: "Minor health concerns", requiresAction: false },
    { id: 3, name: "Fair", color: "#F59E0B", description: "Requires monitoring", requiresAction: false },
    { id: 4, name: "Poor", color: "#F97316", description: "Requires attention soon", requiresAction: true },
    { id: 5, name: "Critical", color: "#EF4444", description: "Immediate attention required", requiresAction: true },
  ]);
  const [newStatus, setNewStatus] = useState({ 
    name: "", 
    color: "#000000", 
    description: "", 
    requiresAction: false 
  });

  const handleAddStatus = () => {
    if (newStatus.name && newStatus.color) {
      setStatuses([
        ...statuses,
        {
          id: statuses.length ? Math.max(...statuses.map(s => s.id)) + 1 : 1,
          name: newStatus.name,
          color: newStatus.color,
          description: newStatus.description,
          requiresAction: newStatus.requiresAction
        }
      ]);
      setNewStatus({ name: "", color: "#000000", description: "", requiresAction: false });
    }
  };

  const handleRemoveStatus = (id: number) => {
    setStatuses(statuses.filter(status => status.id !== id));
  };

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
        <Input
          placeholder="Description"
          value={newStatus.description}
          onChange={(e) => setNewStatus({ ...newStatus, description: e.target.value })}
        />
        <Button onClick={handleAddStatus} className="flex items-center">
          <Plus className="h-4 w-4 mr-1" /> Add Status
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Requires Action</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {statuses.map((status) => (
            <TableRow key={status.id}>
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
                {status.requiresAction && <Badge>Required</Badge>}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveStatus(status.id)}>
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
