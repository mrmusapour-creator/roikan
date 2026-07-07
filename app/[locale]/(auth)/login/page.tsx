import { LoginForm } from "@/components/forms/login-form";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function LoginPage({ params }: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(params.locale);

  return (
    <main className="flex min-h-screen items-center px-4 py-12">
      <LoginForm locale={params.locale} labels={dictionary.auth} />
    </main>
  );
}
