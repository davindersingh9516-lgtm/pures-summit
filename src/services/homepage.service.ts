import { cache } from "react";
import { homepageRepository } from "@/repositories";

export const getHomepage = cache(async () => homepageRepository.getHomepage());
export const getHero = cache(async () => homepageRepository.getHero());
export const getHomepageSections = cache(async () => homepageRepository.getHomepageSections());
export const getFeaturedProducts = cache(async (limit?: number) => homepageRepository.getFeaturedProducts(limit));
export const getCollections = cache(async () => homepageRepository.getCollections());
export const getHomepageCategories = cache(async () => homepageRepository.getCategories());
export const getTrustBadges = cache(async () => homepageRepository.getTrustBadges());
export const getHomepageTestimonials = cache(async () => homepageRepository.getTestimonials());
export const getStatistics = cache(async () => homepageRepository.getStatistics());
export const getBlogPreview = cache(async (limit?: number) => homepageRepository.getBlogPreview(limit));
export const getHomepageNewsletter = cache(async () => homepageRepository.getNewsletter());
export const getInstagramFeed = cache(async () => homepageRepository.getInstagramFeed());
export const getFAQPreview = cache(async (limit?: number) => homepageRepository.getFAQPreview(limit));
export const getCertificates = cache(async () => homepageRepository.getCertificates());
export const getVideos = cache(async () => homepageRepository.getVideos());
