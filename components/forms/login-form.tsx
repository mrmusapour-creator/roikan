"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import type { Locale } from "@/i18n/config";

type LoginFormProps = {
  locale: Locale;
  labels: {
    loginTitle: string;
    email: string;
    password: string;
    login: string;
    noAccount: string;
    register: string;
    invalid: string;
  };
};

export function LoginForm({ locale, labels }: LoginFormProps) {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
        callbackUrl: `/${locale}/dashboard`
      });

      if (result?.ok) {
        window.location.href = result.url ?? `/${locale}/dashboard`;
      } else {
        setError(labels.invalid);
      }
    });
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <h1 className="text-2xl font-semibold">{labels.loginTitle}</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <Label htmlFor="email">{labels.email}</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div>
          <Label htmlFor="password">{labels.password}</Label>
          <Input id="password" name="password" type="password" autoComplete="current-password" required />
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <Button type="submit" disabled={isPending} className="w-full">
          {labels.login}
        </Button>
      </form>
      <p className="mt-5 text-sm text-muted-foreground">
        {labels.noAccount}{" "}
        <Link className="font-medium text-primary" href={`/${locale}/register`}>
          {labels.register}
        </Link>
      </p>
    </Card>
  );
}
