// TEMPORARY — single placeholder standing in for every promo and banner image.
//
// All promo artwork (the hardcoded BANDA carousel slides, the Cloudflare-hosted
// promo images, and the CMS `image_url` on promotion details) currently points
// here while the real campaign artwork is produced.
//
// To undo: delete this file and restore the original image sources. The call
// sites are TheBanner.vue, mobile/HeroBanner.vue, promos/PromoIndex.vue,
// promos/PromotionDetails.vue and promos/HakiLeagueFreebets.vue — each one
// references PROMO_PLACEHOLDER, so they are easy to find. The previous slide
// arrays and Cloudflare image IDs are preserved in comments at those call
// sites rather than deleted, so nothing has to be reconstructed.
//
// 1997x666 (3:1), which is the ratio the banner frames already assume, so
// nothing crops.
export const PROMO_PLACEHOLDER = "/banners/banda/placeholder.jpg";
