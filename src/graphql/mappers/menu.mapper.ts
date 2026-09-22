import type { Link, MenuItem } from "@/types";

/**
 * Shared between navigation/header/footer repositories, since all three
 * ultimately read WPGraphQL `Menu.menuItems` and need the same flat-list ->
 * tree reconstruction. WPGraphQL returns menu items as a flat list (each
 * with a `parentId`) rather than pre-nested - nesting via `childItems` on
 * every node would require guessing a max depth in the query, so instead we
 * fetch flat (up to `first: 100`, plenty for a site nav) and rebuild the
 * tree here, depth-agnostic.
 */
export interface WPMenuItemNode {
  id: string;
  databaseId: number;
  label?: string | null;
  url?: string | null;
  parentId?: string | null;
  description?: string | null;
  target?: string | null;
}

export interface WPMenuNode {
  id: string;
  name?: string | null;
  menuItems?: { nodes: WPMenuItemNode[] } | null;
}

function toMenuItem(node: WPMenuItemNode): MenuItem {
  return {
    id: node.id,
    label: node.label ?? "",
    url: node.url ?? "#",
    target: node.target === "_blank" ? "_blank" : "_self",
    description: node.description ?? undefined,
  };
}

/** Rebuilds the parent/child menu tree from a flat WPGraphQL `menuItems` list. */
export function buildMenuTree(nodes: WPMenuItemNode[] | undefined | null): MenuItem[] {
  if (!nodes?.length) return [];

  const byId = new Map<string, MenuItem>(nodes.map((node) => [node.id, toMenuItem(node)]));
  const roots: MenuItem[] = [];

  for (const node of nodes) {
    const item = byId.get(node.id)!;
    const parent = node.parentId ? byId.get(node.parentId) : undefined;
    if (parent) {
      parent.children = [...(parent.children ?? []), item];
    } else {
      roots.push(item);
    }
  }

  return roots;
}

/** Flat (top-level only) mapping for contexts that don't render nesting, e.g. footer columns / utility links. */
export function toFlatLinks(nodes: WPMenuItemNode[] | undefined | null): Link[] {
  if (!nodes?.length) return [];
  return nodes
    .filter((node) => !node.parentId)
    .map((node) => ({ label: node.label ?? "", url: node.url ?? "#" }));
}
