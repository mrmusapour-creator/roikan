import { PageHeader } from "@/components/app/page-header";
import { LinkButton } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { GeneratedWorkoutPlan } from "@/features/plans/ai-provider";

export default async function WorkoutPage({ params }: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(params.locale);
  const user = await requireUser();
  const plan = await prisma.workoutPlan.findFirst({
    where: { userId: user.id, active: true },
    orderBy: { generatedAt: "desc" }
  });
  const content = plan?.content as GeneratedWorkoutPlan | undefined;

  return (
    <>
      <PageHeader title={dictionary.plans.workoutTitle} subtitle={plan?.summary ?? dictionary.plans.empty} />
      {!content ? (
        <Card>
          <CardDescription>{dictionary.plans.empty}</CardDescription>
          <LinkButton href={`/${params.locale}/onboarding`} className="mt-4">
            {dictionary.common.continue}
          </LinkButton>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {content.days.map((day) => (
            <Card key={day.day}>
              <CardHeader>
                <CardTitle>{day.day}</CardTitle>
                <CardDescription>{day.focus}</CardDescription>
              </CardHeader>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {day.blocks.map((block) => (
                  <li key={block} className="rounded-md border border-border bg-background/40 p-3">
                    {block}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
          <Card>
            <CardHeader>
              <CardTitle>Recovery</CardTitle>
            </CardHeader>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {content.recovery.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </>
  );
}
