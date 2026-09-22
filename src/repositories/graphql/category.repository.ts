import type { ICategoryRepository } from "../interfaces";
import type { ProductCategory } from "@/types";
import { graphqlRequest } from "@/graphql/client";
import { GET_CATEGORIES_QUERY, GET_CATEGORY_QUERY } from "@/graphql/queries/category.queries";
import { mapWooCategory, type WPCategoryNode } from "@/graphql/mappers/category.mapper";
import { siteConfig } from "@/config/site.config";

export class GraphQLCategoryRepository implements ICategoryRepository {
  async getCategory(slug: string): Promise<ProductCategory | null> {
    const data = await graphqlRequest<{ productCategory: WPCategoryNode | null }>(
      GET_CATEGORY_QUERY,
      { slug },
      { next: { revalidate: siteConfig.revalidateSeconds.page } },
    );
    return data.productCategory ? mapWooCategory(data.productCategory) : null;
  }

  async getCategories(): Promise<ProductCategory[]> {
    const data = await graphqlRequest<{ productCategories: { nodes: WPCategoryNode[] } }>(
      GET_CATEGORIES_QUERY,
      undefined,
      { next: { revalidate: siteConfig.revalidateSeconds.navigation } },
    );
    return data.productCategories.nodes.map(mapWooCategory);
  }
}
