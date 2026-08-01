import { cache } from "react";
import { productRepository } from "@/repositories";
import type { ProductListParams } from "@/repositories/interfaces";

export const getProduct = cache(async (slug: string) => productRepository.getProduct(slug));

export const getProducts = cache(async (params?: ProductListParams) => productRepository.getProducts(params));

export const getProductFilters = cache(async (categorySlug?: string) =>
  productRepository.getProductFilters(categorySlug),
);

export const getRelatedProducts = cache(async (productId: string) =>
  productRepository.getRelatedProducts(productId),
);

export const getAllProductSlugs = cache(async () => productRepository.getAllProductSlugs());
