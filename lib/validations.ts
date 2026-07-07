import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(8)
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2).max(80)
});

export const onboardingSchema = z.object({
  age: z.coerce.number().int().min(13).max(100),
  gender: z.enum(["FEMALE", "MALE", "NON_BINARY", "PREFER_NOT_TO_SAY"]),
  heightCm: z.coerce.number().int().min(120).max(230),
  weightKg: z.coerce.number().min(35).max(300),
  goal: z.enum(["FAT_LOSS", "MUSCLE_GAIN", "STRENGTH", "ENDURANCE", "WELLNESS"]),
  activityLevel: z.enum(["SEDENTARY", "LIGHT", "MODERATE", "ACTIVE", "ATHLETE"]),
  availableEquipment: z.array(z.string().min(1)).min(1),
  workoutExperience: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  medicalLimitations: z.string().max(500).optional(),
  dietPreference: z.enum([
    "BALANCED",
    "HIGH_PROTEIN",
    "VEGETARIAN",
    "VEGAN",
    "MEDITERRANEAN",
    "LOW_CARB"
  ]),
  workoutDays: z.coerce.number().int().min(2).max(7),
  workoutDurationMin: z.coerce.number().int().min(20).max(120)
});

export const progressSchema = z.object({
  workoutCompleted: z.coerce.boolean().default(false),
  nutritionAdherent: z.coerce.boolean().default(false),
  waterLiters: z.coerce.number().min(0).max(12).optional(),
  sleepHours: z.coerce.number().min(0).max(16).optional(),
  energyLevel: z.coerce.number().int().min(1).max(10).optional(),
  notes: z.string().max(800).optional(),
  weightKg: z.coerce.number().min(35).max(300).optional(),
  waistCm: z.coerce.number().min(30).max(220).optional(),
  chestCm: z.coerce.number().min(30).max(220).optional(),
  hipCm: z.coerce.number().min(30).max(220).optional()
});

export const profileSettingsSchema = z.object({
  name: z.string().min(2).max(80),
  locale: z.enum(["en", "fa"])
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type OnboardingInput = z.infer<typeof onboardingSchema>;
export type ProgressInput = z.infer<typeof progressSchema>;
export type ProfileSettingsInput = z.infer<typeof profileSettingsSchema>;
