"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileUp, FilePlus, Database, Download, Filter } from "lucide-react";

export function AnimalManagement() {
  const [activeTab, setActiveTab] = useState("add-single");
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-1 sm:grid-cols-3">
          <TabsTrigger value="add-single">Add Single Animal</TabsTrigger>
          <TabsTrigger value="bulk-import">Bulk Import</TabsTrigger>
          <TabsTrigger value="data-management">Data Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="add-single">
          <Card>
            <CardContent className="pt-6">
              <AddSingleAnimalForm />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bulk-import">
          <Card>
            <CardContent className="pt-6">
              <BulkImportForm />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data-management">
          <Card>
            <CardContent className="pt-6">
              <DataManagement />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AddSingleAnimalForm() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Animal Name</Label>
          <Input id="name" placeholder="Enter name" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tag">Tag/ID Number</Label>
          <Input id="tag" placeholder="Enter tag or ID number" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="breed">Breed</Label>
          <Select>
            <SelectTrigger id="breed">
              <SelectValue placeholder="Select breed" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="angus">Angus</SelectItem>
              <SelectItem value="holstein">Holstein</SelectItem>
              <SelectItem value="jersey">Jersey</SelectItem>
              <SelectItem value="hereford">Hereford</SelectItem>
              <SelectItem value="simmental">Simmental</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select>
            <SelectTrigger id="gender">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="birthdate">Birth Date</Label>
          <Input id="birthdate" type="date" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input id="weight" type="number" placeholder="Enter weight" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Select>
            <SelectTrigger id="location">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="east_field">East Field</SelectItem>
              <SelectItem value="west_field">West Field</SelectItem>
              <SelectItem value="main_barn">Main Barn</SelectItem>
              <SelectItem value="calving_barn">Calving Barn</SelectItem>
              <SelectItem value="isolation_pen">Isolation Pen</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="health">Health Status</Label>
          <Select>
            <SelectTrigger id="health">
              <SelectValue placeholder="Select health status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="excellent">Excellent</SelectItem>
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="fair">Fair</SelectItem>
              <SelectItem value="poor">Poor</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="pt-4 flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button>Add Animal</Button>
      </div>
    </div>
  );
}

function BulkImportForm() {
  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed rounded-lg p-10 text-center bg-muted/50">
        <div className="mb-6 flex justify-center">
          <FileUp className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">Drag and drop your CSV file here</h3>
        <p className="text-muted-foreground mb-4">
          Or click to browse for a file to upload (CSV, XLS, XLSX)
        </p>
        <Button>
          <FilePlus className="mr-2 h-4 w-4" /> Browse Files
        </Button>
      </div>
      
      <div className="p-4 bg-muted/30 rounded-lg">
        <h4 className="font-medium mb-2">File Format Requirements</h4>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>First row must contain column headers</li>
          <li>Required columns: Name, Breed, Gender, Birth Date, Weight</li>
          <li>Optional columns: Location, Health Status, Notes</li>
          <li>Dates must be in YYYY-MM-DD format</li>
        </ul>
        
        <div className="mt-4">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Download Template
          </Button>
        </div>
      </div>
    </div>
  );
}

function DataManagement() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="font-medium">Data Operations</h3>
          <p className="text-sm text-muted-foreground">Manage your animal data</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button variant="destructive" size="sm">
            Archive Old Records
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium">Current Animals</h4>
            <Badge>1002</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Active animal records in the system</p>
          <Button variant="link" className="p-0 h-auto mt-2 text-sm">Manage Records</Button>
        </div>
        
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium">Archived</h4>
            <Badge variant="outline">124</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Records marked as archived</p>
          <Button variant="link" className="p-0 h-auto mt-2 text-sm">View Archive</Button>
        </div>
        
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium">Data Health</h4>
            <Badge className="bg-green-500">Good</Badge>
          </div>
          <p className="text-sm text-muted-foreground">No data inconsistencies detected</p>
          <Button variant="link" className="p-0 h-auto mt-2 text-sm">Run Check</Button>
        </div>
      </div>
      
      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-3">Data Backup & Recovery</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <p className="text-sm mb-2">Last backup: <span className="font-medium">April 7, 2025, 3:45 AM</span></p>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">Create Backup</Button>
          </div>
          <div className="flex-1">
            <p className="text-sm mb-2">Backup schedule: <span className="font-medium">Daily (3:00 AM)</span></p>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">Configure Schedule</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
