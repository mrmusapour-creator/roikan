import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Offline</CardTitle>
          <CardDescription>
            The app shell is available, but fresh coaching data needs a connection.
          </CardDescription>
        </CardHeader>
      </Card>
    </main>
  );
}
