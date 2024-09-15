import Navigation from '@/app/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WatchlistTable } from "@/components/calves/watchlist-table";

export default function Watchlist() {
  return (
    <>
      <Navigation />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Watchlist</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Calves Requiring Attention</CardTitle>
          </CardHeader>
          <CardContent>
            <WatchlistTable />
          </CardContent>
        </Card>
      </div>
    </>
  );
}