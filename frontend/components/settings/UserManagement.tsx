"use client"

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, UserCog } from "lucide-react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
  lastActive: string;
};

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Smith", email: "john@example.com", role: "Farm Manager", active: true, lastActive: "Today" },
    { id: 2, name: "Emily Johnson", email: "emily@example.com", role: "Veterinarian", active: true, lastActive: "Yesterday" },
    { id: 3, name: "Michael Davis", email: "michael@example.com", role: "Staff", active: true, lastActive: "3 days ago" },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", role: "Staff", active: false, lastActive: "2 weeks ago" },
  ]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Staff" });
  
  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([
        ...users,
        {
          id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          active: true,
          lastActive: "Just added"
        }
      ]);
      setNewUser({ name: "", email: "", role: "Staff" });
    }
  };
  
  const handleToggleActive = (id: number) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, active: !user.active } : user
    ));
  };
  
  const handleRemoveUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };
  
  return (
    <div className="space-y-6">
      <div className="rounded-md border p-4 space-y-4">
        <h3 className="text-lg font-medium">Add New User</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <Input
            placeholder="Email"
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <Select
            value={newUser.role}
            onValueChange={(value) => setNewUser({ ...newUser, role: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Farm Manager">Farm Manager</SelectItem>
              <SelectItem value="Veterinarian">Veterinarian</SelectItem>
              <SelectItem value="Staff">Staff</SelectItem>
              <SelectItem value="Read Only">Read Only</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAddUser} className="w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" /> Add User
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === "Farm Manager" ? "default" : "outline"}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={user.active} 
                      onCheckedChange={() => handleToggleActive(user.id)} 
                      id={`user-active-${user.id}`}
                    />
                    <Label htmlFor={`user-active-${user.id}`}>
                      {user.active ? "Active" : "Inactive"}
                    </Label>
                  </div>
                </TableCell>
                <TableCell>{user.lastActive}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <UserCog className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveUser(user.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
