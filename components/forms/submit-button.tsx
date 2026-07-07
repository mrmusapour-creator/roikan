"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

type SubmitButtonProps = {
  children: React.ReactNode;
  loadingLabel?: string;
  className?: string;
};

export function SubmitButton({ children, loadingLabel, className }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className={className}>
      {pending ? loadingLabel ?? children : children}
    </Button>
  );
}
