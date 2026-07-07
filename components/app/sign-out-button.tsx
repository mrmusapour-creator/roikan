"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";

export function SignOutButton({ label, locale }: { label: string; locale: Locale }) {
  return (
    <Button type="button" variant="outline" className="w-full" onClick={() => signOut({ callbackUrl: `/${locale}/login` })}>
      {label}
    </Button>
  );
}
