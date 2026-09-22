import { Icon, type IconName } from "@/components/icons";
import type { Product } from "@/types";

interface Persona {
  icon: IconName;
  title: string;
  desc: string;
}

/** The range is one grade in two jar sizes, so the only meaningful split is
 * single jar vs multi-jar pack - not a ladder of potencies. */
type Tier = "jar" | "pack";

const PERSONAS: Record<Tier, Persona[]> = {
  jar: [
    {
      icon: "sparkles",
      title: "First-Time Manuka Buyers",
      desc: "An approachable way into genuine, lab-tested Manuka honey - a single jar to find out how you actually use it before committing to more.",
    },
    {
      icon: "coffee",
      title: "Tea & Toast Ritual Drinkers",
      desc: "Robust enough to hold its character stirred through a daily brew or spread on toast, morning after morning.",
    },
    {
      icon: "home",
      title: "Everyday Wellness Households",
      desc: "A dependable pantry staple at MGO 263+ - the everyday band, priced to be restocked rather than rationed.",
    },
  ],
  pack: [
    {
      icon: "users",
      title: "Families Building a Daily Habit",
      desc: "Enough honey for a household that gets through a jar without thinking about it, at a lower price than buying those jars one at a time.",
    },
    {
      icon: "piggy-bank",
      title: "Stock-Up Savers",
      desc: "The cheapest way to buy the same MGO 263+ honey - one delivery, a clear saving, and months before you need to reorder.",
    },
    {
      icon: "gift",
      title: "Sharers & Gift-Givers",
      desc: "A pack splits neatly: keep one jar, pass the other on. An easy way to hand over something genuinely premium without a separate gift purchase.",
    },
  ],
};

function resolveTier(tags: string[]): Tier {
  return tags.includes("pack") ? "pack" : "jar";
}

export function ProductBuyerPersonas({ product }: { product: Product }) {
  const personas = PERSONAS[resolveTier(product.tags)];

  return (
    <div>
      <h2 className="text-2xl font-(family-name:--font-display) text-(--color-foreground) sm:text-3xl">
        Who This Is For
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {personas.map((persona) => (
          <div
            key={persona.title}
            className="rounded-(--radius-xl) border border-(--color-border) p-6"
          >
            <div className="flex size-10 items-center justify-center rounded-(--radius-full) bg-(--color-secondary-50) text-(--color-secondary)">
              <Icon name={persona.icon} className="size-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-(--color-foreground)">{persona.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-(--color-foreground-muted)">{persona.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
