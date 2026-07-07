"use client";

import { useActionState } from "react";

import { SubmitButton } from "@/components/forms/submit-button";
import { Card } from "@/components/ui/card";
import { Input, Label, Select } from "@/components/ui/input";
import type { Locale } from "@/i18n/config";
import { updateSettingsAction } from "@/features/profile/actions";

export function SettingsForm({
  locale,
  name,
  userLocale,
  labels
}: {
  locale: Locale;
  name: string;
  userLocale: Locale;
  labels: { name: string; language: string; english: string; persian: string; save: string };
}) {
  const [state, action] = useActionState(updateSettingsAction.bind(null, locale), { ok: false });

  return (
    <Card className="max-w-xl">
      <form action={action} className="space-y-4">
        <div>
          <Label htmlFor="name">{labels.name}</Label>
          <Input id="name" name="name" defaultValue={name} required />
        </div>
        <div>
          <Label htmlFor="locale">{labels.language}</Label>
          <Select id="locale" name="locale" defaultValue={userLocale}>
            <option value="en">{labels.english}</option>
            <option value="fa">{labels.persian}</option>
          </Select>
        </div>
        {state.message ? <p className={state.ok ? "text-sm text-primary" : "text-sm text-destructive"}>{state.message}</p> : null}
        <SubmitButton>{labels.save}</SubmitButton>
      </form>
    </Card>
  );
}
