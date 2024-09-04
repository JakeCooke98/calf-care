import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalvesTable } from "@/components/calves/calves-table";

export default function Details() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>Calf Information</CardTitle>
        </CardHeader>
        <CardContent>
          <CalvesTable />
        </CardContent>
      </Card>
    </div>
  );
}