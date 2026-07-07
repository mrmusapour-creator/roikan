import { PageHeader } from "@/components/app/page-header";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage({ params }: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(params.locale);
  const user = await requireUser();
  const profile = await prisma.profile.findUnique({ where: { userId: user.id } });

  return (
    <>
      <PageHeader title={dictionary.nav.profile} subtitle={dictionary.onboarding.subtitle} />
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>{user.name ?? user.email}</CardTitle>
          <CardDescription>{profile ? `${profile.goal} · ${profile.activityLevel}` : dictionary.dashboard.onboardingRequired}</CardDescription>
        </CardHeader>
        {profile ? (
          <dl className="grid gap-3 sm:grid-cols-2">
            {[
              [dictionary.onboarding.age, profile.age],
              [dictionary.onboarding.height, `${profile.heightCm} cm`],
              [dictionary.onboarding.weight, `${Number(profile.weightKg).toFixed(1)} kg`],
              [dictionary.onboarding.days, profile.workoutDays],
              [dictionary.onboarding.duration, `${profile.workoutDurationMin} min`],
              [dictionary.onboarding.diet, profile.dietPreference]
            ].map(([label, value]) => (
              <div key={label} className="rounded-md border border-border bg-background/40 p-3">
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="mt-1 font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </Card>
    </>
  );
}
