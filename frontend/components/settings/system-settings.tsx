"use client"

import { useEffect, useState } from "react";
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
import { RefreshCcw, Trash2, Save, CloudOff, Check, Cloud, Loader2 } from "lucide-react";
import { useFarmSettings, useSystemSettings } from "@/lib/hooks/useSettings";
import { useToast } from "@/components/ui/use-toast";

export function SystemSettings() {
  const { toast } = useToast();
  
  // Get farm and system settings from hooks
  const { 
    farmSettings, 
    isLoading: isLoadingFarm, 
    updateFarmSettings, 
    isSaving: isSavingFarm 
  } = useFarmSettings();
  
  const { 
    systemSettings, 
    isLoading: isLoadingSystem, 
    updateSystemSettings, 
    isSaving: isSavingSystem 
  } = useSystemSettings();
  
  // Farm settings form state
  const [farmFormData, setFarmFormData] = useState({
    farmName: "",
    farmLocation: "",
    timeZone: "America/New_York",
    currency: "USD"
  });
  
  // System settings form state
  const [systemFormData, setSystemFormData] = useState({
    autoBackup: true,
    dataSyncEnabled: true,
    emailNotifications: true,
    dataRetentionDays: 90,
    darkModeEnabled: false,
    defaultLanguage: "en"
  });
  
  // Update form data when settings are loaded
  useEffect(() => {
    if (farmSettings) {
      setFarmFormData({
        farmName: farmSettings.farmName || "",
        farmLocation: farmSettings.farmLocation || "",
        timeZone: farmSettings.timeZone || "America/New_York",
        currency: farmSettings.currency || "USD"
      });
    }
  }, [farmSettings]);
  
  useEffect(() => {
    if (systemSettings) {
      setSystemFormData({
        autoBackup: systemSettings.autoBackup,
        dataSyncEnabled: systemSettings.dataSyncEnabled,
        emailNotifications: systemSettings.emailNotifications,
        dataRetentionDays: systemSettings.dataRetentionDays,
        darkModeEnabled: systemSettings.darkModeEnabled || false,
        defaultLanguage: systemSettings.defaultLanguage || "en"
      });
    }
  }, [systemSettings]);
  
  // Event handlers for farm settings
  const handleFarmInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFarmFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleFarmSelectChange = (field: string, value: string) => {
    setFarmFormData(prev => ({ ...prev, [field]: value }));
  };
  
  // Event handlers for system settings
  const handleSystemToggleChange = (field: keyof typeof systemFormData, value: boolean) => {
    setSystemFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleDataRetentionChange = (value: number[]) => {
    setSystemFormData(prev => ({ ...prev, dataRetentionDays: value[0] }));
  };
  
  // Submit handlers
  const handleSaveFarmSettings = async () => {
    try {
      await updateFarmSettings(farmFormData);
    } catch (error) {
      console.error("Failed to update farm settings:", error);
    }
  };
  
  const handleSaveSystemSettings = async () => {
    try {
      await updateSystemSettings(systemFormData);
    } catch (error) {
      console.error("Failed to update system settings:", error);
    }
  };
  
  const handleResetSystem = () => {
    const defaultSettings = {
      autoBackup: true,
      dataSyncEnabled: true,
      emailNotifications: true,
      dataRetentionDays: 90,
      darkModeEnabled: false,
      defaultLanguage: "en"
    };
    
    setSystemFormData(defaultSettings);
    toast({
      title: "System Reset",
      description: "System settings have been reset to defaults. Click save to apply changes."
    });
  };
  
  // Loading state
  if (isLoadingFarm || isLoadingSystem) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading settings...</span>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Farm Information</h3>
            <p className="text-sm text-muted-foreground">Basic information about your farm</p>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleSaveFarmSettings}
            disabled={isSavingFarm}
          >
            {isSavingFarm ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-1" />
            )}
            Save Changes
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="farmName">Farm Name</Label>
            <Input 
              id="farmName" 
              placeholder="Farm name" 
              value={farmFormData.farmName}
              onChange={handleFarmInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="farmLocation">Farm Location</Label>
            <Input 
              id="farmLocation" 
              placeholder="Location" 
              value={farmFormData.farmLocation}
              onChange={handleFarmInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="timeZone">Time Zone</Label>
            <Select 
              value={farmFormData.timeZone}
              onValueChange={(value) => handleFarmSelectChange("timeZone", value)}
            >
              <SelectTrigger id="timeZone">
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
            <Select 
              value={farmFormData.currency}
              onValueChange={(value) => handleFarmSelectChange("currency", value)}
            >
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
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">System Preferences</h3>
            <p className="text-sm text-muted-foreground">Configure how the system works</p>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleSaveSystemSettings}
            disabled={isSavingSystem}
          >
            {isSavingSystem ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-1" />
            )}
            Save Changes
          </Button>
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
                  checked={systemFormData.autoBackup}
                  onCheckedChange={(value) => handleSystemToggleChange("autoBackup", value)}
                />
              </div>
              
              <div className="flex flex-row items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="data-sync">Data Synchronization</Label>
                  <p className="text-sm text-muted-foreground">
                    {systemFormData.dataSyncEnabled ? (
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
                  checked={systemFormData.dataSyncEnabled}
                  onCheckedChange={(value) => handleSystemToggleChange("dataSyncEnabled", value)}
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
                  checked={systemFormData.emailNotifications}
                  onCheckedChange={(value) => handleSystemToggleChange("emailNotifications", value)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="data-retention">Data Retention Period</Label>
                  <Badge variant="outline">{systemFormData.dataRetentionDays} days</Badge>
                </div>
                <Slider
                  id="data-retention"
                  min={30}
                  max={365}
                  step={30}
                  value={[systemFormData.dataRetentionDays]}
                  onValueChange={handleDataRetentionChange}
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
                <Button size="sm" variant="outline" onClick={handleResetSystem}>
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
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => {
                    toast({
                      title: "Action Required",
                      description: "This operation requires admin confirmation. Please contact your system administrator.",
                      variant: "destructive"
                    });
                  }}
                >
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
