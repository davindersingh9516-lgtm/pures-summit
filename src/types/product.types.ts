import type { ID, Image, Money, SlugEntity } from "./common.types";
import type { WithSEO } from "./seo.types";

export type StockStatus = "IN_STOCK" | "OUT_OF_STOCK" | "ON_BACKORDER";
export type ProductType = "simple" | "variable" | "bundle";

export interface ProductAttributeValue {
  id: ID;
  name: string;
  /** Optional swatch color for attributes like "Color". */
  swatch?: string;
}

export interface ProductAttribute {
  id: ID;
  name: string;
  values: ProductAttributeValue[];
}

export interface ProductVariant {
  id: ID;
  sku: string;
  price: Money;
  salePrice?: Money;
  stockStatus: StockStatus;
  image?: Image;
  /** Attribute name -> selected value id, e.g. { Size: "250g" }. */
  selections: Record<string, string>;
}

export interface ProductCategory extends SlugEntity, WithSEO {
  name: string;
  description?: string;
  image?: Image;
  parentId?: ID | null;
  productCount: number;
}

export interface ProductReviewSummary {
  averageRating: number;
  count: number;
}

export interface Product extends SlugEntity, WithSEO {
  type: ProductType;
  name: string;
  shortDescription: string;
  description: string;
  sku: string;
  price: Money;
  salePrice?: Money;
  stockStatus: StockStatus;
  images: Image[];
  categories: ProductCategory[];
  tags: string[];
  attributes: ProductAttribute[];
  variants: ProductVariant[];
  reviewSummary: ProductReviewSummary;
  relatedProductIds: ID[];
  badges?: string[];
}

export interface ProductListFilterOption {
  id: ID;
  label: string;
  count: number;
}

export interface ProductListFilters {
  categories: ProductListFilterOption[];
  attributes: Record<string, ProductListFilterOption[]>;
  priceRange: { min: number; max: number };
}
