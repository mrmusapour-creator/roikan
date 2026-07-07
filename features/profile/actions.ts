"use server";

import { revalidatePath } from "next/cache";

import type { Locale } from "@/i18n/config";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { profileSettingsSchema } from "@/lib/validations";

export async function updateSettingsAction(locale: Locale, _state: { ok: boolean; message?: string }, formData: FormData) {
  const user = await requireUser();
  const parsed = profileSettingsSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { ok: false, message: "Settings could not be saved." };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      name: parsed.data.name,
      locale: parsed.data.locale
    }
  });

  revalidatePath(`/${locale}/settings`);
  return { ok: true, message: "Settings saved." };
}
