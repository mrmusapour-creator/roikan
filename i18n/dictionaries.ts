import "server-only";

import type { Locale } from "@/i18n/config";

const dictionaries = {
  en: () => import("./messages/en").then((module) => module.en),
  fa: () => import("./messages/fa").then((module) => module.fa)
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
