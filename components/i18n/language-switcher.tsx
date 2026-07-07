"use client";

import { usePathname, useRouter } from "next/navigation";

import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";

type LanguageSwitcherProps = {
  locale: Locale;
  labels: {
    language: string;
    english: string;
    persian: string;
  };
};

export function LanguageSwitcher({ locale, labels }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  function changeLocale(nextLocale: Locale) {
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000`;
    router.push(segments.join("/"));
  }

  return (
    <label className="flex items-center gap-2 text-sm text-muted-foreground">
      <span className="sr-only">{labels.language}</span>
      <select
        value={locale}
        onChange={(event) => changeLocale(event.target.value as Locale)}
        className="focus-ring h-9 rounded-md border border-border bg-background/70 px-2 text-sm text-foreground"
        aria-label={labels.language}
      >
        {locales.map((item) => (
          <option key={item} value={item}>
            {item === "en" ? labels.english : labels.persian}
          </option>
        ))}
      </select>
    </label>
  );
}
