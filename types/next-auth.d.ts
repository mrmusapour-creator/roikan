import type { Role } from "@prisma/client";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      locale: string;
      onboardingDone: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    role?: Role;
    locale?: string;
    onboardingDone?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
    locale?: string;
    onboardingDone?: boolean;
  }
}
