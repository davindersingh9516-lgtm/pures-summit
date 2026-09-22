/**
 * Fetched flat (not nested via `childItems`) so a single fragment works at
 * any depth - see graphql/mappers/menu.mapper.ts `buildMenuTree` for the
 * flat-list -> tree reconstruction.
 */
export const MENU_ITEM_FIELDS = /* GraphQL */ `
  fragment MenuItemFields on MenuItem {
    id
    databaseId
    label
    url
    parentId
    description
    target
  }
`;
