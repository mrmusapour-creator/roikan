import { ArrowRight, Sparkles } from "lucide-react";
import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata: Metadata = {
  title: "AI Transformation Platform"
};

export default async function LandingPage({ params }: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(params.locale);
  const landing = dictionary.landing;

  return (
    <main className="relative min-h-screen overflow-hidden">
      <section className="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
        <div className="animate-fade-up">
          <Badge className="mb-5 border-primary/30 bg-primary/10 text-primary">
            <Sparkles className="me-2 h-3.5 w-3.5" aria-hidden="true" />
            {landing.eyebrow}
          </Badge>
          <h1 className="max-w-3xl text-6xl font-semibold tracking-normal text-foreground sm:text-7xl lg:text-8xl">
            {landing.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{landing.subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton href={`/${params.locale}/register`}>
              {landing.cta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </LinkButton>
            <LinkButton href={`/${params.locale}/login`} variant="outline">
              {landing.secondary}
            </LinkButton>
          </div>
          <p className="mt-8 max-w-xl text-sm leading-6 text-muted-foreground">{landing.trust}</p>
        </div>
        <div className="grid gap-4 animate-fade-up [animation-delay:160ms]">
          <Card className="p-6">
            <div className="grid gap-4">
              {landing.metrics.map((metric, index) => (
                <div key={metric} className="flex items-center justify-between rounded-md border border-border bg-background/50 p-4">
                  <span className="text-sm text-muted-foreground">0{index + 1}</span>
                  <span className="font-medium">{metric}</span>
                </div>
              ))}
            </div>
          </Card>
          <div className="grid grid-cols-3 gap-3">
            {[72, 88, 94].map((value) => (
              <Card key={value} className="p-4 text-center">
                <p className="text-2xl font-semibold">{value}%</p>
                <p className="mt-1 text-xs text-muted-foreground">signal</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "AstraForm",
            applicationCategory: "HealthApplication",
            operatingSystem: "Web, iOS, Android"
          })
        }}
      />
    </main>
  );
}
