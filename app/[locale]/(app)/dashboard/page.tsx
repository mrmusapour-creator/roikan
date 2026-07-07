import { ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/app/page-header";
import { LinkButton } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stat } from "@/components/ui/stat";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatPercent } from "@/lib/utils";

export default async function DashboardPage({ params }: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(params.locale);
  const user = await requireUser();
  const [profile, workout, measurements, progress] = await Promise.all([
    prisma.profile.findUnique({ where: { userId: user.id } }),
    prisma.workoutPlan.findFirst({ where: { userId: user.id, active: true }, orderBy: { generatedAt: "desc" } }),
    prisma.measurement.findMany({ where: { userId: user.id }, orderBy: { date: "desc" }, take: 2 }),
    prisma.progressEntry.findMany({ where: { userId: user.id }, orderBy: { date: "desc" }, take: 7 })
  ]);

  const completed = progress.filter((entry) => entry.workoutCompleted && entry.nutritionAdherent).length;
  const adherence = progress.length ? (completed / progress.length) * 100 : 0;
  const latestWeight = measurements[0]?.weightKg ?? profile?.weightKg;

  return (
    <>
      <PageHeader title={dictionary.dashboard.title} subtitle={dictionary.dashboard.subtitle} />
      {!profile ? (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{dictionary.dashboard.onboardingRequired}</CardTitle>
            <CardDescription>{dictionary.onboarding.subtitle}</CardDescription>
          </CardHeader>
          <LinkButton href={`/${params.locale}/onboarding`}>
            {dictionary.common.continue}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </LinkButton>
        </Card>
      ) : null}
      <div className="grid gap-4 md:grid-cols-3">
        <Stat label={dictionary.dashboard.readiness} value={profile ? "High" : "--"} detail={profile?.activityLevel.toLowerCase()} />
        <Stat label={dictionary.dashboard.adherence} value={formatPercent(adherence)} detail={`${progress.length}/7 signals`} />
        <Stat label={dictionary.dashboard.weight} value={latestWeight ? `${Number(latestWeight).toFixed(1)} kg` : "--"} />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>{dictionary.dashboard.nextWorkout}</CardTitle>
            <CardDescription>{workout?.summary ?? dictionary.plans.empty}</CardDescription>
          </CardHeader>
          {workout ? (
            <LinkButton href={`/${params.locale}/workout`} variant="outline">
              {dictionary.nav.workout}
            </LinkButton>
          ) : null}
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{dictionary.nav.progress}</CardTitle>
            <CardDescription>{dictionary.progress.subtitle}</CardDescription>
          </CardHeader>
          <LinkButton href={`/${params.locale}/progress`} variant="secondary">
            {dictionary.nav.progress}
          </LinkButton>
        </Card>
      </div>
    </>
  );
}
