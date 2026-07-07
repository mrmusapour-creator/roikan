import Link from "next/link";
import { Activity, Apple, CreditCard, Gauge, LineChart, Settings, Shield, User, Zap } from "lucide-react";

import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { SignOutButton } from "@/components/app/sign-out-button";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

const navIcons = {
  dashboard: Gauge,
  onboarding: Zap,
  workout: Activity,
  nutrition: Apple,
  progress: LineChart,
  profile: User,
  settings: Settings,
  subscription: CreditCard,
  admin: Shield
};

type AppShellProps = {
  children: React.ReactNode;
  locale: Locale;
  dictionary: {
    common: Record<string, string>;
    nav: Record<keyof typeof navIcons, string>;
  };
  userName?: string | null;
  isAdmin?: boolean;
};

export function AppShell({ children, locale, dictionary, userName, isAdmin }: AppShellProps) {
  const items = Object.keys(navIcons).filter((item) => item !== "admin" || isAdmin) as Array<keyof typeof navIcons>;

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[17rem_1fr]">
      <aside className="border-b border-border bg-background/75 px-4 py-4 backdrop-blur lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-e">
        <div className="flex items-center justify-between gap-3 lg:block">
          <Link href={`/${locale}/dashboard`} className="text-lg font-semibold">
            {dictionary.common.appName}
          </Link>
          <LanguageSwitcher locale={locale} labels={dictionary.common as any} />
        </div>
        <nav className="mt-5 flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-1 lg:overflow-visible">
          {items.map((item) => {
            const Icon = navIcons[item];
            return (
              <Link
                key={item}
                href={`/${locale}/${item}`}
                className={cn(
                  "focus-ring flex min-w-max items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {dictionary.nav[item]}
              </Link>
            );
          })}
        </nav>
        <div className="mt-6 hidden lg:block">
          <SignOutButton label={dictionary.common.signOut} locale={locale} />
        </div>
        {userName ? <p className="mt-5 text-xs text-muted-foreground">{userName}</p> : null}
      </aside>
      <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
