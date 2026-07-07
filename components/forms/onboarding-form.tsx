"use client";

import { useActionState } from "react";

import { SubmitButton } from "@/components/forms/submit-button";
import { Card } from "@/components/ui/card";
import { Input, Label, Select, Textarea } from "@/components/ui/input";
import type { Locale } from "@/i18n/config";
import { completeOnboardingAction } from "@/features/onboarding/actions";

const genders = ["FEMALE", "MALE", "NON_BINARY", "PREFER_NOT_TO_SAY"] as const;
const goals = ["FAT_LOSS", "MUSCLE_GAIN", "STRENGTH", "ENDURANCE", "WELLNESS"] as const;
const activityLevels = ["SEDENTARY", "LIGHT", "MODERATE", "ACTIVE", "ATHLETE"] as const;
const experiences = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;
const diets = ["BALANCED", "HIGH_PROTEIN", "VEGETARIAN", "VEGAN", "MEDITERRANEAN", "LOW_CARB"] as const;
const equipment = ["dumbbells", "barbell", "machines", "kettlebells", "bands", "bodyweight"] as const;

type OnboardingLabels = {
  age: string;
  gender: string;
  height: string;
  weight: string;
  goal: string;
  activityLevel: string;
  equipment: string;
  experience: string;
  limitations: string;
  diet: string;
  days: string;
  duration: string;
  submit: string;
  options: {
    gender: Record<(typeof genders)[number], string>;
    goal: Record<(typeof goals)[number], string>;
    activity: Record<(typeof activityLevels)[number], string>;
    experience: Record<(typeof experiences)[number], string>;
    diet: Record<(typeof diets)[number], string>;
    equipment: Record<(typeof equipment)[number], string>;
  };
};

export function OnboardingForm({ locale, labels }: { locale: Locale; labels: OnboardingLabels }) {
  const [state, action] = useActionState(completeOnboardingAction.bind(null, locale), { ok: false });

  return (
    <form action={action} className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
      <Card className="grid gap-4 sm:grid-cols-2">
        <Field label={labels.age} name="age" type="number" min={13} max={100} />
        <div>
          <Label htmlFor="gender">{labels.gender}</Label>
          <Select id="gender" name="gender" defaultValue="PREFER_NOT_TO_SAY">
            {genders.map((item) => (
              <option key={item} value={item}>
                {labels.options.gender[item]}
              </option>
            ))}
          </Select>
        </div>
        <Field label={labels.height} name="heightCm" type="number" min={120} max={230} />
        <Field label={labels.weight} name="weightKg" type="number" min={35} max={300} step="0.1" />
        <div>
          <Label htmlFor="goal">{labels.goal}</Label>
          <Select id="goal" name="goal" defaultValue="WELLNESS">
            {goals.map((item) => (
              <option key={item} value={item}>
                {labels.options.goal[item]}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="activityLevel">{labels.activityLevel}</Label>
          <Select id="activityLevel" name="activityLevel" defaultValue="MODERATE">
            {activityLevels.map((item) => (
              <option key={item} value={item}>
                {labels.options.activity[item]}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="workoutExperience">{labels.experience}</Label>
          <Select id="workoutExperience" name="workoutExperience" defaultValue="BEGINNER">
            {experiences.map((item) => (
              <option key={item} value={item}>
                {labels.options.experience[item]}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="dietPreference">{labels.diet}</Label>
          <Select id="dietPreference" name="dietPreference" defaultValue="BALANCED">
            {diets.map((item) => (
              <option key={item} value={item}>
                {labels.options.diet[item]}
              </option>
            ))}
          </Select>
        </div>
        <Field label={labels.days} name="workoutDays" type="number" min={2} max={7} defaultValue={4} />
        <Field label={labels.duration} name="workoutDurationMin" type="number" min={20} max={120} defaultValue={45} />
        <div className="sm:col-span-2">
          <Label htmlFor="medicalLimitations">{labels.limitations}</Label>
          <Textarea id="medicalLimitations" name="medicalLimitations" />
        </div>
      </Card>
      <Card className="flex flex-col justify-between gap-6">
        <div>
          <Label>{labels.equipment}</Label>
          <div className="grid grid-cols-2 gap-3">
            {equipment.map((item) => (
              <label key={item} className="flex items-center gap-2 rounded-md border border-border bg-background/40 p-3 text-sm">
                <input name="availableEquipment" type="checkbox" value={item} defaultChecked={item === "bodyweight"} />
                {labels.options.equipment[item]}
              </label>
            ))}
          </div>
        </div>
        {state.message ? <p className="text-sm text-destructive">{state.message}</p> : null}
        <SubmitButton className="w-full">{labels.submit}</SubmitButton>
      </Card>
    </form>
  );
}

function Field({ label, name, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} required {...props} />
    </div>
  );
}
