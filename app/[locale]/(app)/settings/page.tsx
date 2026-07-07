import { PageHeader } from "@/components/app/page-header";
import { SettingsForm } from "@/components/forms/settings-form";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function SettingsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const dictionary = await getDictionary(locale);
  const sessionUser = await requireUser();
  const user = await prisma.user.findUniqueOrThrow({ where: { id: sessionUser.id } });

  return (
    <>
      <PageHeader title={dictionary.settings.title} subtitle={dictionary.settings.subtitle} />
      <SettingsForm
        locale={locale}
        name={user.name ?? ""}
        userLocale={(user.locale as Locale) ?? locale}
        labels={{
          name: dictionary.auth.name,
          language: dictionary.common.language,
          english: dictionary.common.english,
          persian: dictionary.common.persian,
          save: dictionary.common.save
        }}
      />
    </>
  );
}
