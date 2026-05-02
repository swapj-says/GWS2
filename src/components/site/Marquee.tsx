interface MarqueeProps {
  items: string[];
}

export function Marquee({ items }: MarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border bg-foreground text-background py-5">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-8 text-2xl md:text-3xl font-display font-bold tracking-tight">
            {item}
            <span className="text-background/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
