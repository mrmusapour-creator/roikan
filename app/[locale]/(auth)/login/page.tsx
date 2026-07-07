import { LoginForm } from "@/components/forms/login-form";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function LoginPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <main className="flex min-h-screen items-center px-4 py-12">
      <LoginForm locale={locale} labels={dictionary.auth} />
    </main>
  );
}
