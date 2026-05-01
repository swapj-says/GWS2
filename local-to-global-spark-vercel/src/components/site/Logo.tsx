import { Link } from "react-router-dom";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2 ${className}`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black text-sm tracking-tight">
        G
      </span>
      <span className="font-display text-base font-bold tracking-tight">
        GWS<span className="text-muted-foreground"> Marketing</span>
      </span>
    </Link>
  );
}
