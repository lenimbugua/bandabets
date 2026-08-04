import { useShareBetStore } from "@/stores/sharebet.js";

import { storeToRefs } from "pinia";
import { computed } from "vue";

export function useShareToSocials() {
  const facebook = "facebook";
  const twitter = "X / twitter";
  const whatsapp = "whatsapp";
  const telegram = "telegram";
  const link = "link";

  const { bookingCode } = storeToRefs(useShareBetStore());
  const originUrl = window.location.origin;
  const shareBetUrl = computed(
    () => `${originUrl}/share-bets/${bookingCode.value}`
  );

  const betText = computed(
    () =>
      `I just booked a bet! Code: ${bookingCode.value}. Place yours now 🤑🎉`
  ); // Short and engaging text
  const affiliateText = `Welcome to Naibet – Kenya’s Premier Betting Destination! Start winning today with an exclusive FREEBET Bonus just for signing up. Enjoy thrilling Aviator cash drops, generous deposit cashback, and unbeatable rewards every time you play. Join now and turn your bets into big wins!`; // Short and engaging text

  const generateShareLink = (platform, url, text) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);

    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}&quote=${encodedText}`;

    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodedText}`;

    const whatsappShareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;

    const telegramShareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;

    switch (platform) {
      case facebook:
        return facebookShareUrl;
      case twitter:
        return twitterShareUrl;
      case whatsapp:
        return whatsappShareUrl;
      case telegram:
        return telegramShareUrl;
      case link:
        return url;
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  };
  return {
    link,
    betText,
    facebook,
    twitter,
    whatsapp,
    telegram,
    originUrl,
    shareBetUrl,
    affiliateText,
    generateShareLink,
  };
}
