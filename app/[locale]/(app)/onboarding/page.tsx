import { PageHeader } from "@/components/app/page-header";
import { OnboardingForm } from "@/components/forms/onboarding-form";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function OnboardingPage({ params }: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(params.locale);

  return (
    <>
      <PageHeader title={dictionary.onboarding.title} subtitle={dictionary.onboarding.subtitle} />
      <OnboardingForm locale={params.locale} labels={dictionary.onboarding} />
    </>
  );
}
