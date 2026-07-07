import { PageHeader } from "@/components/app/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function SubscriptionPage({ params }: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(params.locale);
  const user = await requireUser();
  const subscription = await prisma.subscription.findUnique({ where: { userId: user.id } });

  return (
    <>
      <PageHeader title={dictionary.subscription.title} subtitle={dictionary.subscription.subtitle} />
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>{dictionary.subscription.current}</CardTitle>
          <CardDescription>{dictionary.subscription.upgrade}</CardDescription>
        </CardHeader>
        <div className="flex flex-wrap gap-3">
          <Badge>{subscription?.tier ?? "starter"}</Badge>
          <Badge>{subscription?.status ?? "FREE"}</Badge>
          <Badge>{subscription?.provider ?? "manual"}</Badge>
        </div>
      </Card>
    </>
  );
}
