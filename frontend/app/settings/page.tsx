import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserManagement } from "@/components/settings/UserManagement";
import { HealthStatuses } from "@/components/settings/health-statuses";
import { SystemSettings } from "@/components/settings/system-settings";
import { FarmLocations } from "@/components/settings/farm-locations";
import { AnimalManagement } from "@/components/settings/animal-management";
import { BreedRegistry } from "@/components/settings/breed-registry";
import { AdminHeader } from "@/components/settings/admin-header";

export default function SettingsPage() {
  return (
    <div className="container py-6 max-w-7xl mx-auto">
      <AdminHeader />
      
      <Tabs defaultValue="system" className="mt-6">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="animals">Animals</TabsTrigger>
          <TabsTrigger value="breeds">Breeds</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="health">Health Status</TabsTrigger>
        </TabsList>
        
        <TabsContent value="system" className="mt-6">
          <SystemSettings />
        </TabsContent>
        
        <TabsContent value="users" className="mt-6">
          <UserManagement />
        </TabsContent>
        
        <TabsContent value="animals" className="mt-6">
          <AnimalManagement />
        </TabsContent>
        
        <TabsContent value="breeds" className="mt-6">
          <BreedRegistry />
        </TabsContent>
        
        <TabsContent value="locations" className="mt-6">
          <FarmLocations />
        </TabsContent>
        
        <TabsContent value="health" className="mt-6">
          <HealthStatuses />
        </TabsContent>
      </Tabs>
    </div>
  );
}
