import type { OnboardingInput } from "@/lib/validations";

export type WorkoutDay = {
  day: string;
  focus: string;
  blocks: string[];
};

export type MealBlock = {
  name: string;
  examples: string[];
};

export type GeneratedWorkoutPlan = {
  title: string;
  summary: string;
  days: WorkoutDay[];
  recovery: string[];
};

export type GeneratedNutritionPlan = {
  title: string;
  summary: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  meals: MealBlock[];
};

export type GeneratedPlans = {
  provider: string;
  workout: GeneratedWorkoutPlan;
  nutrition: GeneratedNutritionPlan;
};

export interface AiPlanProvider {
  id: string;
  generatePlans(input: OnboardingInput): Promise<GeneratedPlans>;
}

const goalFocus: Record<OnboardingInput["goal"], string> = {
  FAT_LOSS: "metabolic conditioning and strength retention",
  MUSCLE_GAIN: "hypertrophy and progressive overload",
  STRENGTH: "compound strength and neural practice",
  ENDURANCE: "aerobic capacity and muscular stamina",
  WELLNESS: "sustainable movement quality and consistency"
};

const dietProteinMultiplier: Record<OnboardingInput["dietPreference"], number> = {
  BALANCED: 1.8,
  HIGH_PROTEIN: 2,
  VEGETARIAN: 1.7,
  VEGAN: 1.6,
  MEDITERRANEAN: 1.75,
  LOW_CARB: 1.9
};

export class DeterministicPlanProvider implements AiPlanProvider {
  id = "deterministic";

  async generatePlans(input: OnboardingInput): Promise<GeneratedPlans> {
    const maintenance = Math.round(input.weightKg * 24 * activityFactor(input.activityLevel));
    const calories = maintenance + calorieAdjustment(input.goal);
    const proteinG = Math.round(input.weightKg * dietProteinMultiplier[input.dietPreference]);
    const fatG = Math.round((calories * 0.28) / 9);
    const carbsG = Math.max(80, Math.round((calories - proteinG * 4 - fatG * 9) / 4));
    const focus = goalFocus[input.goal];

    return {
      provider: this.id,
      workout: {
        title: `${input.workoutDays}-day ${focus} plan`,
        summary: `A ${input.workoutDurationMin}-minute plan tuned for ${input.workoutExperience.toLowerCase()} experience and ${input.availableEquipment.join(", ")}.`,
        days: Array.from({ length: input.workoutDays }, (_, index) =>
          buildWorkoutDay(index, focus, input)
        ),
        recovery: [
          "Keep one low-intensity mobility block between demanding sessions.",
          "Use a 2-rep reserve on main lifts unless technique is excellent.",
          input.medicalLimitations
            ? `Respect limitation note: ${input.medicalLimitations}`
            : "Stop any movement that creates sharp pain."
        ]
      },
      nutrition: {
        title: `${input.dietPreference.toLowerCase().replace("_", " ")} nutrition target`,
        summary: `Daily targets are calibrated around ${input.goal.toLowerCase().replace("_", " ")} with enough protein to support recovery.`,
        calories,
        proteinG,
        carbsG,
        fatG,
        meals: buildMeals(input.dietPreference)
      }
    };
  }
}

export function getAiPlanProvider(): AiPlanProvider {
  return new DeterministicPlanProvider();
}

function activityFactor(activityLevel: OnboardingInput["activityLevel"]) {
  const factors = {
    SEDENTARY: 1.2,
    LIGHT: 1.35,
    MODERATE: 1.5,
    ACTIVE: 1.7,
    ATHLETE: 1.9
  };

  return factors[activityLevel];
}

function calorieAdjustment(goal: OnboardingInput["goal"]) {
  const adjustments = {
    FAT_LOSS: -350,
    MUSCLE_GAIN: 280,
    STRENGTH: 160,
    ENDURANCE: 120,
    WELLNESS: 0
  };

  return adjustments[goal];
}

function buildWorkoutDay(index: number, focus: string, input: OnboardingInput): WorkoutDay {
  const names = ["Foundation", "Capacity", "Strength", "Engine", "Athletic", "Restore", "Full body"];
  const hasWeights = input.availableEquipment.some((item) =>
    ["dumbbells", "barbell", "machines", "kettlebells"].includes(item.toLowerCase())
  );

  return {
    day: `Day ${index + 1}`,
    focus: `${names[index % names.length]}: ${focus}`,
    blocks: [
      "8 min breathing, joint prep, and activation",
      hasWeights
        ? "Main strength circuit: squat/hinge, push, pull, carry"
        : "Bodyweight circuit: squat, hinge, push, row variation, core",
      input.goal === "ENDURANCE"
        ? "Zone 2 finisher with controlled nasal breathing"
        : "Short conditioning finisher at sustainable intensity",
      "5 min downshift mobility and session notes"
    ]
  };
}

function buildMeals(dietPreference: OnboardingInput["dietPreference"]): MealBlock[] {
  const plantProtein = ["lentil bowl", "tofu scramble", "chickpea salad"];
  const omnivoreProtein = ["eggs and greens", "chicken rice bowl", "salmon with vegetables"];
  const proteins = dietPreference === "VEGAN" || dietPreference === "VEGETARIAN" ? plantProtein : omnivoreProtein;

  return [
    { name: "Breakfast", examples: [proteins[0], "Greek-style yogurt or fortified alternative", "berries"] },
    { name: "Lunch", examples: [proteins[1], "slow-digesting carbohydrate", "two colors of vegetables"] },
    { name: "Dinner", examples: [proteins[2], "olive oil or avocado", "large salad or roasted vegetables"] },
    { name: "Recovery", examples: ["protein-forward snack", "water plus electrolytes", "fruit around training"] }
  ];
}
