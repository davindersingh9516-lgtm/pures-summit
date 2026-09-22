import type { IPageRepository } from "../interfaces";
import type { Page } from "@/types";
import { graphqlRequest } from "@/graphql/client";
import { GET_ALL_PAGE_SLUGS_QUERY, GET_PAGE_QUERY } from "@/graphql/queries/page.queries";
import { mapWooPage, type WPPageNode } from "@/graphql/mappers/page.mapper";
import { siteConfig } from "@/config/site.config";

export class GraphQLPageRepository implements IPageRepository {
  async getPage(slug: string): Promise<Page | null> {
    const data = await graphqlRequest<{ page: WPPageNode | null }>(
      GET_PAGE_QUERY,
      { slug },
      { next: { revalidate: siteConfig.revalidateSeconds.page } },
    );
    return data.page ? mapWooPage(data.page) : null;
  }

  async getAllPageSlugs(): Promise<string[]> {
    const data = await graphqlRequest<{ pages: { nodes: { slug: string }[] } }>(
      GET_ALL_PAGE_SLUGS_QUERY,
      undefined,
      { next: { revalidate: siteConfig.revalidateSeconds.page } },
    );
    return data.pages.nodes.map((node) => node.slug);
  }
}
