import type { Metadata, Viewport } from "next";

import "@/app/globals.css";
import { PwaRegister } from "@/components/pwa/pwa-register";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? "http://localhost:3000"),
  title: {
    default: "AstraForm",
    template: "%s | AstraForm"
  },
  description: "AI-powered transformation platform for training, nutrition, habits, and progress.",
  applicationName: "AstraForm",
  manifest: "/manifest.json",
  openGraph: {
    title: "AstraForm",
    description: "A premium AI transformation platform.",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#07100d",
  colorScheme: "dark"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        {children}
        <PwaRegister />
      </body>
    </html>
  );
}
