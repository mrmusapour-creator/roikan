import { RegisterForm } from "@/components/forms/register-form";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function RegisterPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <main className="flex min-h-screen items-center px-4 py-12">
      <RegisterForm locale={locale} labels={dictionary.auth} />
    </main>
  );
}
