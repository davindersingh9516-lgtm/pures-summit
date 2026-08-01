import { cache } from "react";
import { navigationRepository } from "@/repositories";

/**
 * Service layer: the only thing pages/components/layouts should import for
 * navigation data. Wrapped in React's `cache()` so multiple components
 * requesting navigation within the same render pass share one repository
 * call (request-level memoization, works with Server Components).
 */
export const getNavigation = cache(async () => navigationRepository.getNavigation());
