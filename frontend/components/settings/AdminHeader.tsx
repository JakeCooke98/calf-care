
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Save, Upload } from "lucide-react";

export function AdminHeader() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold">Farm Administration</h2>
            <p className="text-muted-foreground">
              Configure your farm settings and manage system data
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4 mr-1" />
              Export Data
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Upload className="h-4 w-4 mr-1" />
              Import Data
            </Button>
            <Button size="sm" className="flex items-center gap-1">
              <Save className="h-4 w-4 mr-1" />
              Save Changes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
