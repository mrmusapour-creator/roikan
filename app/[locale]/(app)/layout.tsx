import { redirect } from "next/navigation";

import { AppShell } from "@/components/app/app-shell";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCurrentSession } from "@/lib/auth";

export default async function ProtectedLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const session = await getCurrentSession();

  if (!session?.user) {
    redirect(`/${params.locale}/login`);
  }

  const dictionary = await getDictionary(params.locale);

  return (
    <AppShell
      locale={params.locale}
      dictionary={dictionary}
      userName={session.user.name}
      isAdmin={session.user.role === "ADMIN"}
    >
      {children}
    </AppShell>
  );
}
