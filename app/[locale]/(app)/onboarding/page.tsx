import { PageHeader } from "@/components/app/page-header";
import { OnboardingForm } from "@/components/forms/onboarding-form";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function OnboardingPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <>
      <PageHeader title={dictionary.onboarding.title} subtitle={dictionary.onboarding.subtitle} />
      <OnboardingForm locale={locale} labels={dictionary.onboarding} />
    </>
  );
}
