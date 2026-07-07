"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { Locale } from "@/i18n/config";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { onboardingSchema } from "@/lib/validations";
import { getAiPlanProvider } from "@/features/plans/ai-provider";

export async function completeOnboardingAction(locale: Locale, _state: { ok: boolean; message?: string }, formData: FormData) {
  const user = await requireUser();
  const parsed = onboardingSchema.safeParse({
    ...Object.fromEntries(formData),
    availableEquipment: formData.getAll("availableEquipment")
  });

  if (!parsed.success) {
    return { ok: false, message: "Please review the highlighted fields." };
  }

  const provider = getAiPlanProvider();
  const plans = await provider.generatePlans(parsed.data);

  await prisma.$transaction(async (tx) => {
    await tx.profile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        ...parsed.data
      },
      update: parsed.data
    });

    await tx.workoutPlan.updateMany({
      where: { userId: user.id, active: true },
      data: { active: false }
    });

    await tx.nutritionPlan.updateMany({
      where: { userId: user.id, active: true },
      data: { active: false }
    });

    await tx.workoutPlan.create({
      data: {
        userId: user.id,
        title: plans.workout.title,
        summary: plans.workout.summary,
        provider: plans.provider,
        content: plans.workout
      }
    });

    await tx.nutritionPlan.create({
      data: {
        userId: user.id,
        title: plans.nutrition.title,
        summary: plans.nutrition.summary,
        provider: plans.provider,
        calories: plans.nutrition.calories,
        proteinG: plans.nutrition.proteinG,
        carbsG: plans.nutrition.carbsG,
        fatG: plans.nutrition.fatG,
        content: plans.nutrition
      }
    });

    await tx.user.update({
      where: { id: user.id },
      data: { onboardingDone: true, locale }
    });
  });

  revalidatePath(`/${locale}/dashboard`);
  redirect(`/${locale}/dashboard`);
}
