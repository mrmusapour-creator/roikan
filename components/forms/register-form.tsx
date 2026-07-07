"use client";

import { useActionState } from "react";
import Link from "next/link";

import { SubmitButton } from "@/components/forms/submit-button";
import { Card } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import type { Locale } from "@/i18n/config";
import { registerAction } from "@/features/auth/actions";

type RegisterFormProps = {
  locale: Locale;
  labels: {
    registerTitle: string;
    name: string;
    email: string;
    password: string;
    register: string;
    hasAccount: string;
    login: string;
    invalid: string;
  };
};

export function RegisterForm({ locale, labels }: RegisterFormProps) {
  const [state, action] = useActionState(registerAction.bind(null, locale), { ok: false, message: "" });


  return (
    <Card className="mx-auto w-full max-w-md">
      <h1 className="text-2xl font-semibold">{labels.registerTitle}</h1>
      <form action={action} className="mt-6 space-y-4">
        <div>
          <Label htmlFor="name">{labels.name}</Label>
          <Input id="name" name="name" autoComplete="name" required />
        </div>
        <div>
          <Label htmlFor="email">{labels.email}</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div>
          <Label htmlFor="password">{labels.password}</Label>
          <Input id="password" name="password" type="password" autoComplete="new-password" required minLength={8} />
        </div>
        {state.message ? <p className="text-sm text-destructive">{state.message}</p> : null}
        <SubmitButton className="w-full">{labels.register}</SubmitButton>
      </form>
      <p className="mt-5 text-sm text-muted-foreground">
        {labels.hasAccount}{" "}
        <Link className="font-medium text-primary" href={`/${locale}/login`}>
          {labels.login}
        </Link>
      </p>
    </Card>
  );
}
