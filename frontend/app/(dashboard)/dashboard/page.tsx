import { NewCalvesToday } from "@/components/dashboard/new-calves-today";
// ... other imports

export default function DashboardPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <TotalCalves />
      <NewCalvesToday /> {/* Add the new component here */}
      {/* ... other components */}
    </div>
    // ... rest of your dashboard layout
  );
} 