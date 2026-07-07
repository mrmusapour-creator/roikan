import { redirect } from "next/navigation";

import { AppShell } from "@/components/app/app-shell";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCurrentSession } from "@/lib/auth";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function ProtectedLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    redirect("/en");
  }

  const currentLocale = locale as Locale;

  const session = await getCurrentSession();

  if (!session?.user) {
    redirect(`/${currentLocale}/login`);
  }

  const dictionary = await getDictionary(currentLocale);

  return (
    <AppShell
      locale={currentLocale}
      dictionary={dictionary}
      userName={session.user.name}
      isAdmin={session.user.role === "ADMIN"}
    >
      {children}
    </AppShell>
  );
}