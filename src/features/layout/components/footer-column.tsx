import type { FooterColumn as FooterColumnData } from "@/types";
import { AppLink } from "@/components/global/app-link";

export function FooterColumn({ column }: { column: FooterColumnData }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-medium tracking-(--tracking-wider) text-(--color-foreground-muted)/70 uppercase">
        {column.title}
      </p>
      <ul className="flex flex-col leading-[2.2]">
        {column.links.map((link) => (
          <li key={link.url}>
            <AppLink
              href={link.url}
              className="relative w-fit text-sm text-(--color-foreground-muted) transition-colors duration-(--duration-fast) hover:text-(--color-brand-400)"
            >
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 ease-out hover:bg-[length:100%_1px]">
                {link.label}
              </span>
            </AppLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
