import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-terracotta text-white hover:bg-[#cf6f18]",
  secondary: "bg-ink text-white hover:bg-[#16202c]",
  outline:
    "border border-ink/15 bg-white text-ink hover:border-terracotta hover:text-terracotta",
  ghost: "text-ink hover:bg-soft",
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-extrabold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta disabled:pointer-events-none disabled:opacity-60";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  to: string;
  children: ReactNode;
  showArrow?: boolean;
}

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return <button className={cn(base, variants[variant], className)} {...props} />;
}

export function ButtonLink({
  className,
  variant = "primary",
  to,
  children,
  showArrow = false,
  ...props
}: ButtonLinkProps) {
  return (
    <Link to={to} className={cn(base, variants[variant], className)} {...props}>
      {children}
      {showArrow && <ArrowRight className="size-4" aria-hidden="true" />}
    </Link>
  );
}
