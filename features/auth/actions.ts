"use server";

import { hash } from "bcryptjs";
import { redirect } from "next/navigation";

import type { Locale } from "@/i18n/config";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";

export type ActionState = {
  ok: boolean;
  message?: string;
};

export async function registerAction(locale: Locale, _state: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = registerSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { ok: false, message: "Invalid registration details." };
  }

  const email = parsed.data.email.toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    return { ok: false, message: "An account with this email already exists." };
  }

  const passwordHash = await hash(parsed.data.password, 12);

  await prisma.user.create({
    data: {
      email,
      name: parsed.data.name,
      passwordHash,
      locale,
      subscription: {
        create: {
          status: "FREE",
          tier: "starter"
        }
      }
    }
  });

  redirect(`/${locale}/login`);
}
