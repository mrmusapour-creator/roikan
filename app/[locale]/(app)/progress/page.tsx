import { PageHeader } from "@/components/app/page-header";
import { ProgressForm } from "@/components/forms/progress-form";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ProgressPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const dictionary = await getDictionary(locale);
  const user = await requireUser();
  const entries = await prisma.progressEntry.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
    take: 14
  });

  return (
    <>
      <PageHeader title={dictionary.progress.title} subtitle={dictionary.progress.subtitle} />
      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <ProgressForm locale={locale} labels={dictionary.progress} saveLabel={dictionary.common.save} />
        <Card>
          <CardHeader>
            <CardTitle>{dictionary.nav.progress}</CardTitle>
            <CardDescription>{dictionary.dashboard.adherence}</CardDescription>
          </CardHeader>
          <div className="space-y-3">
            {entries.map((entry) => (
              <div key={entry.id} className="rounded-md border border-border bg-background/40 p-3 text-sm">
                <div className="flex justify-between">
                  <span>{entry.date.toLocaleDateString(locale)}</span>
                  <span className="text-muted-foreground">
                    {[entry.workoutCompleted, entry.nutritionAdherent].filter(Boolean).length}/2
                  </span>
                </div>
                {entry.notes ? <p className="mt-2 text-muted-foreground">{entry.notes}</p> : null}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
