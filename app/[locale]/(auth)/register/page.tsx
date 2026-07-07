import { RegisterForm } from "@/components/forms/register-form";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function RegisterPage({ params }: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(params.locale);

  return (
    <main className="flex min-h-screen items-center px-4 py-12">
      <RegisterForm locale={params.locale} labels={dictionary.auth} />
    </main>
  );
}
