import { notFound } from "next/navigation";

import { isLocale, localeDirections, type Locale } from "@/i18n/config";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fa" }];
}

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;

  return (
    <div lang={locale} dir={localeDirections[locale]} className="min-h-screen">
      {children}
    </div>
  );
}
