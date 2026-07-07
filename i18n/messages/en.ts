export const en = {
  common: {
    appName: "AstraForm",
    loading: "Loading",
    save: "Save changes",
    continue: "Continue",
    signOut: "Sign out",
    language: "Language",
    english: "English",
    persian: "Persian"
  },
  nav: {
    dashboard: "Dashboard",
    onboarding: "Onboarding",
    workout: "Workout",
    nutrition: "Nutrition",
    progress: "Progress",
    profile: "Profile",
    settings: "Settings",
    subscription: "Subscription",
    admin: "Admin"
  },
  landing: {
    eyebrow: "AI transformation operating system",
    title: "AstraForm",
    subtitle:
      "A premium coaching platform for training, nutrition, habits, and measurable lifestyle change.",
    cta: "Start your transformation",
    secondary: "Sign in",
    trust: "Built for personalized plans, bilingual coaching, and progress that compounds.",
    metrics: ["Adaptive plans", "Daily tracking", "Persian + English"]
  },
  auth: {
    loginTitle: "Welcome back",
    registerTitle: "Create your account",
    name: "Full name",
    email: "Email",
    password: "Password",
    login: "Log in",
    register: "Create account",
    noAccount: "New here?",
    hasAccount: "Already registered?",
    invalid: "Please check your details and try again."
  },
  dashboard: {
    title: "Command center",
    subtitle: "Your training, nutrition, and recovery signals in one place.",
    readiness: "Readiness",
    adherence: "Adherence",
    weight: "Weight",
    nextWorkout: "Next workout",
    onboardingRequired: "Complete onboarding to generate your first plan."
  },
  onboarding: {
    title: "Build your personal operating profile",
    subtitle: "These answers shape your training load, nutrition targets, and coaching tone.",
    age: "Age",
    gender: "Gender",
    height: "Height (cm)",
    weight: "Weight (kg)",
    goal: "Goal",
    activityLevel: "Activity level",
    equipment: "Available equipment",
    experience: "Workout experience",
    limitations: "Medical limitations",
    diet: "Diet preference",
    days: "Workout days per week",
    duration: "Workout duration",
    submit: "Generate my plan",
    options: {
      gender: {
        FEMALE: "Female",
        MALE: "Male",
        NON_BINARY: "Non-binary",
        PREFER_NOT_TO_SAY: "Prefer not to say"
      },
      goal: {
        FAT_LOSS: "Fat loss",
        MUSCLE_GAIN: "Muscle gain",
        STRENGTH: "Strength",
        ENDURANCE: "Endurance",
        WELLNESS: "Wellness"
      },
      activity: {
        SEDENTARY: "Sedentary",
        LIGHT: "Light",
        MODERATE: "Moderate",
        ACTIVE: "Active",
        ATHLETE: "Athlete"
      },
      experience: {
        BEGINNER: "Beginner",
        INTERMEDIATE: "Intermediate",
        ADVANCED: "Advanced"
      },
      diet: {
        BALANCED: "Balanced",
        HIGH_PROTEIN: "High protein",
        VEGETARIAN: "Vegetarian",
        VEGAN: "Vegan",
        MEDITERRANEAN: "Mediterranean",
        LOW_CARB: "Low carb"
      },
      equipment: {
        dumbbells: "Dumbbells",
        barbell: "Barbell",
        machines: "Machines",
        kettlebells: "Kettlebells",
        bands: "Bands",
        bodyweight: "Bodyweight"
      }
    }
  },
  plans: {
    workoutTitle: "Workout plan",
    nutritionTitle: "Nutrition plan",
    generated: "Generated plan",
    empty: "Complete onboarding to unlock this plan."
  },
  progress: {
    title: "Progress journal",
    subtitle: "Track what happened today and watch the trend become obvious.",
    workout: "Workout completed",
    nutrition: "Nutrition aligned",
    water: "Water liters",
    sleep: "Sleep hours",
    energy: "Energy level",
    notes: "Notes",
    weight: "Weight",
    waist: "Waist",
    chest: "Chest",
    hips: "Hips",
    saved: "Progress saved"
  },
  subscription: {
    title: "Subscription",
    subtitle: "The billing layer is ready for Stripe; this MVP uses a manual provider.",
    current: "Current plan",
    upgrade: "Upgrade readiness"
  },
  settings: {
    title: "Settings",
    subtitle: "Manage account preferences and localization."
  },
  admin: {
    title: "Admin overview",
    subtitle: "Operational view for early launch support."
  }
} as const;
