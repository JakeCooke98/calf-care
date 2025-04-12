"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCcw, Trash2, Save, CloudOff, Check, Cloud } from "lucide-react";

export function SystemSettings() {
  const [autoBackup, setAutoBackup] = useState(true);
  const [dataSyncEnabled, setDataSyncEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [dataRetention, setDataRetention] = useState([90]);
  
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Farm Information</h3>
            <p className="text-sm text-muted-foreground">Basic information about your farm</p>
          </div>
          <Button size="sm" variant="outline">
            <Save className="h-4 w-4 mr-1" /> Save Changes
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="farm-name">Farm Name</Label>
            <Input id="farm-name" placeholder="Farm name" defaultValue="Green Valley Dairy" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="farm-location">Farm Location</Label>
            <Input id="farm-location" placeholder="Location" defaultValue="Middlefield, OH" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time-zone">Time Zone</Label>
            <Select defaultValue="America/New_York">
              <SelectTrigger id="time-zone">
                <SelectValue placeholder="Select time zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select defaultValue="USD">
              <SelectTrigger id="currency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">US Dollar ($)</SelectItem>
                <SelectItem value="CAD">Canadian Dollar (C$)</SelectItem>
                <SelectItem value="EUR">Euro (€)</SelectItem>
                <SelectItem value="GBP">British Pound (£)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>
      
      <Separator />
      
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">System Preferences</h3>
          <p className="text-sm text-muted-foreground">Configure how the system works</p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex flex-row items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-backup">Automatic Backups</Label>
                  <p className="text-sm text-muted-foreground">
                    Create daily backups of your farm data
                  </p>
                </div>
                <Switch
                  id="auto-backup"
                  checked={autoBackup}
                  onCheckedChange={setAutoBackup}
                />
              </div>
              
              <div className="flex flex-row items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="data-sync">Data Synchronization</Label>
                  <p className="text-sm text-muted-foreground">
                    {dataSyncEnabled ? (
                      <span className="flex items-center">
                        <Cloud className="h-4 w-4 mr-1 text-green-500" /> 
                        <Check className="h-3 w-3 text-green-500" /> Connected
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <CloudOff className="h-4 w-4 mr-1 text-orange-500" /> Offline
                      </span>
                    )}
                  </p>
                </div>
                <Switch
                  id="data-sync"
                  checked={dataSyncEnabled}
                  onCheckedChange={setDataSyncEnabled}
                />
              </div>
              
              <div className="flex flex-row items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts via email
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="data-retention">Data Retention Period</Label>
                  <Badge variant="outline">{dataRetention[0]} days</Badge>
                </div>
                <Slider
                  id="data-retention"
                  min={30}
                  max={365}
                  step={30}
                  value={dataRetention}
                  onValueChange={setDataRetention}
                />
                <p className="text-xs text-muted-foreground">
                  Archive data older than the selected period
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      <Separator />
      
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Danger Zone</h3>
          <p className="text-sm text-muted-foreground">Destructive actions for your farm data</p>
        </div>
        
        <Card className="border-destructive/20">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex flex-row items-center justify-between">
                <div>
                  <h4 className="font-medium">Reset System</h4>
                  <p className="text-sm text-muted-foreground">
                    Reset all system settings to default values
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  <RefreshCcw className="h-4 w-4 mr-1" /> Reset
                </Button>
              </div>
              
              <div className="flex flex-row items-center justify-between">
                <div>
                  <h4 className="font-medium">Clear All Data</h4>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete all animal records
                  </p>
                </div>
                <Button size="sm" variant="destructive">
                  <Trash2 className="h-4 w-4 mr-1" /> Clear Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
