import { notFound } from "next/navigation";

import { PageHeader } from "@/components/app/page-header";
import { Stat } from "@/components/ui/stat";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminPage({ params }: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(params.locale);
  const user = await requireUser();

  if (user.role !== "ADMIN") {
    notFound();
  }

  const [users, completedProfiles, activeSubscriptions] = await Promise.all([
    prisma.user.count(),
    prisma.profile.count(),
    prisma.subscription.count({ where: { status: "ACTIVE" } })
  ]);

  return (
    <>
      <PageHeader title={dictionary.admin.title} subtitle={dictionary.admin.subtitle} />
      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Users" value={`${users}`} />
        <Stat label="Profiles" value={`${completedProfiles}`} />
        <Stat label="Active subscriptions" value={`${activeSubscriptions}`} />
      </div>
    </>
  );
}
