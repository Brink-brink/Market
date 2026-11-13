import type { LucideIcon } from "lucide-react";

type Item = { title: string; text: string };

// A row of short points, each with an icon. Icons pair with items by position.
export function IconGrid({ items, icons, boxed = false }: { items: Item[]; icons: LucideIcon[]; boxed?: boolean }) {
  return (
    <div className={boxed ? "icon-grid boxed" : "icon-grid"}>
      {items.map((item, i) => {
        const Icon = icons[i % icons.length];
        return (
          <div key={item.title} className="icon-item">
            <span className="icon" aria-hidden="true"><Icon size={22} /></span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        );
      })}
    </div>
  );
}
