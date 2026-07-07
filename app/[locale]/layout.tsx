import { notFound } from "next/navigation";

import { isLocale, localeDirections, type Locale } from "@/i18n/config";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fa" }];
}

type Props = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;

  return (
    <div
      lang={currentLocale}
      dir={localeDirections[currentLocale]}
      className="min-h-screen"
    >
      {children}
    </div>
  );
}