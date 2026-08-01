import { dataSourceConfig } from "@/config/data-source.config";
import * as mock from "./mock";
import * as graphql from "./graphql";
import type {
  IAnnouncementRepository,
  IBlogRepository,
  ICategoryRepository,
  IContentRepository,
  ICurrencyRepository,
  IFooterRepository,
  IHeaderRepository,
  IHomepageRepository,
  ILanguageRepository,
  INavigationRepository,
  IPageRepository,
  IProductRepository,
  IReviewRepository,
  ISearchRepository,
  ISEORepository,
  ISettingsRepository,
} from "./interfaces";

/**
 * REPOSITORY FACTORY
 * ---------------------------------------------------------------------------
 * The ONLY file that knows both implementations exist. Every consumer
 * (the service layer) imports singletons from here and never reaches into
 * `./mock` or `./graphql` directly. Switching the entire app to live data
 * is a single environment variable change - see config/data-source.config.ts.
 */
const useGraphQL = dataSourceConfig.mode === "graphql";

export const navigationRepository: INavigationRepository = useGraphQL
  ? new graphql.GraphQLNavigationRepository()
  : new mock.MockNavigationRepository();

export const footerRepository: IFooterRepository = useGraphQL
  ? new graphql.GraphQLFooterRepository()
  : new mock.MockFooterRepository();

export const settingsRepository: ISettingsRepository = useGraphQL
  ? new graphql.GraphQLSettingsRepository()
  : new mock.MockSettingsRepository();

export const homepageRepository: IHomepageRepository = useGraphQL
  ? new graphql.GraphQLHomepageRepository()
  : new mock.MockHomepageRepository();

export const pageRepository: IPageRepository = useGraphQL
  ? new graphql.GraphQLPageRepository()
  : new mock.MockPageRepository();

export const categoryRepository: ICategoryRepository = useGraphQL
  ? new graphql.GraphQLCategoryRepository()
  : new mock.MockCategoryRepository();

export const productRepository: IProductRepository = useGraphQL
  ? new graphql.GraphQLProductRepository()
  : new mock.MockProductRepository();

export const blogRepository: IBlogRepository = useGraphQL
  ? new graphql.GraphQLBlogRepository()
  : new mock.MockBlogRepository();

export const reviewRepository: IReviewRepository = useGraphQL
  ? new graphql.GraphQLReviewRepository()
  : new mock.MockReviewRepository();

export const contentRepository: IContentRepository = useGraphQL
  ? new graphql.GraphQLContentRepository()
  : new mock.MockContentRepository();

export const seoRepository: ISEORepository = useGraphQL
  ? new graphql.GraphQLSEORepository()
  : new mock.MockSEORepository();

export const headerRepository: IHeaderRepository = useGraphQL
  ? new graphql.GraphQLHeaderRepository()
  : new mock.MockHeaderRepository();

export const announcementRepository: IAnnouncementRepository = useGraphQL
  ? new graphql.GraphQLAnnouncementRepository()
  : new mock.MockAnnouncementRepository();

export const searchRepository: ISearchRepository = useGraphQL
  ? new graphql.GraphQLSearchRepository()
  : new mock.MockSearchRepository();

export const languageRepository: ILanguageRepository = useGraphQL
  ? new graphql.GraphQLLanguageRepository()
  : new mock.MockLanguageRepository();

export const currencyRepository: ICurrencyRepository = useGraphQL
  ? new graphql.GraphQLCurrencyRepository()
  : new mock.MockCurrencyRepository();

export type * from "./interfaces";
