import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-ink">
      <span>{label}</span>
      {children}
      {error && <span className="text-xs font-bold text-red-600">{error}</span>}
    </label>
  );
}

const control =
  "min-h-12 w-full rounded-xl border border-ink/12 bg-white px-4 text-sm text-ink shadow-sm outline-none transition focus:border-terracotta focus:ring-4 focus:ring-terracotta/15";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(control, props.className)} {...props} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(control, "min-h-36 py-3 resize-y", props.className)} {...props} />;
}

export function NativeSelect(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(control, "appearance-auto", props.className)} {...props} />;
}
