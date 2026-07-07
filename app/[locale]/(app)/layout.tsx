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
  params: Promise<{ locale: Locale }>;
}) {
  const session = await getCurrentSession();

  if (!session?.user) {
    redirect(`/${locale}/login`);
  }

  const dictionary = await getDictionary(locale);

  return (
    <AppShell
      locale={locale}
      dictionary={dictionary}
      userName={session.user.name}
      isAdmin={session.user.role === "ADMIN"}
    >
      {children}
    </AppShell>
  );
}
