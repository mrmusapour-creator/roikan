import { Card } from "@/components/ui/card";

type StatProps = {
  label: string;
  value: string;
  detail?: string;
};

export function Stat({ label, value, detail }: StatProps) {
  return (
    <Card className="p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
      {detail ? <p className="mt-2 text-sm text-muted-foreground">{detail}</p> : null}
    </Card>
  );
}
