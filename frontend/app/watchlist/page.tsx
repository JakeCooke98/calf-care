import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WatchlistTable } from "@/components/calves/watchlist-table";

export default function Watchlist() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Watchlist</h1>
      <Card>
        <CardHeader>
          <CardTitle>Calves Requiring Attention</CardTitle>
        </CardHeader>
        <CardContent>
          <WatchlistTable />
        </CardContent>
      </Card>
    </div>
  );
}