export const fa = {
  common: {
    appName: "آسترافورم",
    loading: "در حال بارگذاری",
    save: "ذخیره تغییرات",
    continue: "ادامه",
    signOut: "خروج",
    language: "زبان",
    english: "English",
    persian: "فارسی"
  },
  nav: {
    dashboard: "داشبورد",
    onboarding: "شروع",
    workout: "تمرین",
    nutrition: "تغذیه",
    progress: "پیشرفت",
    profile: "پروفایل",
    settings: "تنظیمات",
    subscription: "اشتراک",
    admin: "مدیریت"
  },
  landing: {
    eyebrow: "سیستم عامل تحول با هوش مصنوعی",
    title: "آسترافورم",
    subtitle:
      "پلتفرم مربیگری پریمیوم برای تمرین، تغذیه، عادت‌ها و تغییر قابل اندازه‌گیری سبک زندگی.",
    cta: "شروع تحول",
    secondary: "ورود",
    trust: "ساخته شده برای برنامه‌های شخصی، مربیگری دوزبانه و پیشرفتی که هر روز بیشتر می‌شود.",
    metrics: ["برنامه‌های تطبیقی", "پیگیری روزانه", "فارسی + انگلیسی"]
  },
  auth: {
    loginTitle: "خوش برگشتی",
    registerTitle: "حساب خود را بسازید",
    name: "نام کامل",
    email: "ایمیل",
    password: "رمز عبور",
    login: "ورود",
    register: "ساخت حساب",
    noAccount: "تازه وارد هستید؟",
    hasAccount: "قبلا ثبت نام کرده‌اید؟",
    invalid: "لطفا اطلاعات را بررسی کنید و دوباره تلاش کنید."
  },
  dashboard: {
    title: "مرکز فرمان",
    subtitle: "تمرین، تغذیه و ریکاوری شما در یک نمای واحد.",
    readiness: "آمادگی",
    adherence: "پایبندی",
    weight: "وزن",
    nextWorkout: "تمرین بعدی",
    onboardingRequired: "برای ساخت اولین برنامه، شروع اولیه را کامل کنید."
  },
  onboarding: {
    title: "پروفایل عملیاتی شخصی خود را بسازید",
    subtitle: "این پاسخ‌ها شدت تمرین، اهداف تغذیه و لحن مربیگری را شکل می‌دهند.",
    age: "سن",
    gender: "جنسیت",
    height: "قد (سانتی‌متر)",
    weight: "وزن (کیلوگرم)",
    goal: "هدف",
    activityLevel: "سطح فعالیت",
    equipment: "تجهیزات موجود",
    experience: "تجربه تمرینی",
    limitations: "محدودیت‌های پزشکی",
    diet: "ترجیح غذایی",
    days: "روزهای تمرین در هفته",
    duration: "مدت تمرین",
    submit: "برنامه من را بساز",
    options: {
      gender: {
        FEMALE: "زن",
        MALE: "مرد",
        NON_BINARY: "غیردودویی",
        PREFER_NOT_TO_SAY: "ترجیح می‌دهم نگویم"
      },
      goal: {
        FAT_LOSS: "کاهش چربی",
        MUSCLE_GAIN: "افزایش عضله",
        STRENGTH: "قدرت",
        ENDURANCE: "استقامت",
        WELLNESS: "سلامت عمومی"
      },
      activity: {
        SEDENTARY: "کم‌تحرک",
        LIGHT: "سبک",
        MODERATE: "متوسط",
        ACTIVE: "فعال",
        ATHLETE: "ورزشکار"
      },
      experience: {
        BEGINNER: "مبتدی",
        INTERMEDIATE: "متوسط",
        ADVANCED: "پیشرفته"
      },
      diet: {
        BALANCED: "متعادل",
        HIGH_PROTEIN: "پروتئین بالا",
        VEGETARIAN: "گیاه‌خواری",
        VEGAN: "وگان",
        MEDITERRANEAN: "مدیترانه‌ای",
        LOW_CARB: "کربوهیدرات پایین"
      },
      equipment: {
        dumbbells: "دمبل",
        barbell: "هالتر",
        machines: "دستگاه",
        kettlebells: "کتل‌بل",
        bands: "کش تمرینی",
        bodyweight: "وزن بدن"
      }
    }
  },
  plans: {
    workoutTitle: "برنامه تمرین",
    nutritionTitle: "برنامه تغذیه",
    generated: "برنامه ساخته شده",
    empty: "برای فعال شدن این برنامه، شروع اولیه را کامل کنید."
  },
  progress: {
    title: "دفتر پیشرفت",
    subtitle: "امروز را ثبت کنید تا روندها شفاف شوند.",
    workout: "تمرین انجام شد",
    nutrition: "تغذیه مطابق برنامه بود",
    water: "لیتر آب",
    sleep: "ساعت خواب",
    energy: "سطح انرژی",
    notes: "یادداشت",
    weight: "وزن",
    waist: "دور کمر",
    chest: "دور سینه",
    hips: "دور باسن",
    saved: "پیشرفت ذخیره شد"
  },
  subscription: {
    title: "اشتراک",
    subtitle: "لایه پرداخت برای Stripe آماده است؛ این MVP از ارائه‌دهنده دستی استفاده می‌کند.",
    current: "پلن فعلی",
    upgrade: "آمادگی ارتقا"
  },
  settings: {
    title: "تنظیمات",
    subtitle: "ترجیحات حساب و زبان را مدیریت کنید."
  },
  admin: {
    title: "نمای مدیریت",
    subtitle: "نمای عملیاتی برای پشتیبانی لانچ اولیه."
  }
} as const;
