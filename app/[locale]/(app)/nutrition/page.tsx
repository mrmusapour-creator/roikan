import { PageHeader } from "@/components/app/page-header";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stat } from "@/components/ui/stat";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { GeneratedNutritionPlan } from "@/features/plans/ai-provider";

export default async function NutritionPage({ params }: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(params.locale);
  const user = await requireUser();
  const plan = await prisma.nutritionPlan.findFirst({
    where: { userId: user.id, active: true },
    orderBy: { generatedAt: "desc" }
  });
  const content = plan?.content as GeneratedNutritionPlan | undefined;

  return (
    <>
      <PageHeader title={dictionary.plans.nutritionTitle} subtitle={plan?.summary ?? dictionary.plans.empty} />
      {plan ? (
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <Stat label="Calories" value={`${plan.calories}`} />
          <Stat label="Protein" value={`${plan.proteinG}g`} />
          <Stat label="Carbs" value={`${plan.carbsG}g`} />
          <Stat label="Fat" value={`${plan.fatG}g`} />
        </div>
      ) : null}
      <div className="grid gap-4 lg:grid-cols-2">
        {content?.meals.map((meal) => (
          <Card key={meal.name}>
            <CardHeader>
              <CardTitle>{meal.name}</CardTitle>
              <CardDescription>{dictionary.plans.generated}</CardDescription>
            </CardHeader>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {meal.examples.map((example) => (
                <li key={example} className="rounded-md border border-border bg-background/40 p-3">
                  {example}
                </li>
              ))}
            </ul>
          </Card>
        )) ?? (
          <Card>
            <CardDescription>{dictionary.plans.empty}</CardDescription>
          </Card>
        )}
      </div>
    </>
  );
}
