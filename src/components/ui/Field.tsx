import {
  useRef,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

export function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-ink">
      <span>
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
      </span>
      {children}
      {error && <span className="text-xs font-bold text-red-600">{error}</span>}
    </label>
  );
}

const control =
  "min-h-12 w-full rounded-xl border border-ink/12 bg-white px-4 text-sm text-ink shadow-sm outline-none transition placeholder:text-copy/55 focus:border-terracotta focus:ring-4 focus:ring-terracotta/15 aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500/15";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(control, props.className)} {...props} />;
}

export function Textarea({
  className,
  rows = 1,
  onInput,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function resize(textarea: HTMLTextAreaElement) {
    textarea.style.height = "auto";
    const style = window.getComputedStyle(textarea);
    const borderHeight = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    textarea.style.height = `${textarea.scrollHeight + borderHeight}px`;
  }

  const handleInput: NonNullable<TextareaHTMLAttributes<HTMLTextAreaElement>["onInput"]> = (event) => {
    resize(event.currentTarget);
    onInput?.(event);
  };

  return (
    <textarea
      ref={textareaRef}
      rows={rows}
      className={cn(control, "min-h-12 resize-none overflow-hidden py-3", className)}
      onInput={handleInput}
      {...props}
    />
  );
}

export function NativeSelect(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(control, "appearance-auto", props.className)} {...props} />;
}
