import Navigation from '@/app/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalvesTable } from "@/components/calves/calves-table";

export default function Details() {
  return (
    <>
      <Navigation />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Details</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Calf Information</CardTitle>
          </CardHeader>
          <CardContent>
            <CalvesTable />
          </CardContent>
        </Card>
      </div>
    </>
  );
}