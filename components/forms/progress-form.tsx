"use client";

import { useActionState } from "react";

import { SubmitButton } from "@/components/forms/submit-button";
import { Card } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";
import type { Locale } from "@/i18n/config";
import { saveProgressAction } from "@/features/progress/actions";

type ProgressLabels = {
  workout: string;
  nutrition: string;
  water: string;
  sleep: string;
  energy: string;
  notes: string;
  weight: string;
  waist: string;
  chest: string;
  hips: string;
  saved: string;
};

export function ProgressForm({ locale, labels, saveLabel }: { locale: Locale; labels: ProgressLabels; saveLabel: string }) {
const [state, action] = useActionState(saveProgressAction.bind(null, locale), { ok: false, message: "" });
  return (
    <Card>
      <form action={action} className="grid gap-4 sm:grid-cols-2">
        <label className="flex items-center gap-3 rounded-md border border-border bg-background/40 p-3 text-sm">
          <input name="workoutCompleted" type="checkbox" value="true" />
          {labels.workout}
        </label>
        <label className="flex items-center gap-3 rounded-md border border-border bg-background/40 p-3 text-sm">
          <input name="nutritionAdherent" type="checkbox" value="true" />
          {labels.nutrition}
        </label>
        <Field label={labels.water} name="waterLiters" type="number" step="0.1" min={0} max={12} />
        <Field label={labels.sleep} name="sleepHours" type="number" step="0.1" min={0} max={16} />
        <Field label={labels.energy} name="energyLevel" type="number" min={1} max={10} />
        <Field label={labels.weight} name="weightKg" type="number" step="0.1" min={35} max={300} />
        <Field label={labels.waist} name="waistCm" type="number" step="0.1" />
        <Field label={labels.chest} name="chestCm" type="number" step="0.1" />
        <Field label={labels.hips} name="hipCm" type="number" step="0.1" />
        <div className="sm:col-span-2">
          <Label htmlFor="notes">{labels.notes}</Label>
          <Textarea id="notes" name="notes" />
        </div>
        {state.message ? (
          <p className={state.ok ? "text-sm text-primary" : "text-sm text-destructive"}>{state.ok ? labels.saved : state.message}</p>
        ) : null}
        <SubmitButton className="sm:col-span-2">{saveLabel}</SubmitButton>
      </form>
    </Card>
  );
}

function Field({ label, name, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} {...props} />
    </div>
  );
}
