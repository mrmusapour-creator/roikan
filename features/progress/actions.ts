"use server";

import { revalidatePath } from "next/cache";

import type { Locale } from "@/i18n/config";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { progressSchema } from "@/lib/validations";

export async function saveProgressAction(locale: Locale, _state: { ok: boolean; message?: string }, formData: FormData) {
  const user = await requireUser();
  const parsed = progressSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { ok: false, message: "Progress could not be saved. Check the numbers and try again." };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await prisma.progressEntry.upsert({
    where: {
      userId_date: {
        userId: user.id,
        date: today
      }
    },
    create: {
      userId: user.id,
      date: today,
      workoutCompleted: parsed.data.workoutCompleted,
      nutritionAdherent: parsed.data.nutritionAdherent,
      waterLiters: parsed.data.waterLiters,
      sleepHours: parsed.data.sleepHours,
      energyLevel: parsed.data.energyLevel,
      notes: parsed.data.notes
    },
    update: {
      workoutCompleted: parsed.data.workoutCompleted,
      nutritionAdherent: parsed.data.nutritionAdherent,
      waterLiters: parsed.data.waterLiters,
      sleepHours: parsed.data.sleepHours,
      energyLevel: parsed.data.energyLevel,
      notes: parsed.data.notes
    }
  });

  if (parsed.data.weightKg) {
    await prisma.measurement.create({
      data: {
        userId: user.id,
        date: today,
        weightKg: parsed.data.weightKg,
        waistCm: parsed.data.waistCm,
        chestCm: parsed.data.chestCm,
        hipCm: parsed.data.hipCm
      }
    });
  }

  revalidatePath(`/${locale}/progress`);
  revalidatePath(`/${locale}/dashboard`);
  return { ok: true, message: "Progress saved." };
}
