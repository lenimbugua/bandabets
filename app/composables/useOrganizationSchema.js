// Canonical brand facts — mirrored from the live naibet.com <head>.
// Keep these in sync with index.html and the Footer social links.
const BRAND_NAME = "Naibet";
const SITE_NAME = "Naibet Kenya";
const BRAND_LOGO =
  "https://storage.googleapis.com/banners-2bf8f4b514188a55/d41c4d19-1c17-455e-89a7-30f7adeeaf26-naibet_logo.png";
// Kept in step with the footer's socials list. Only profiles that exist.
const BRAND_SAME_AS = [
  "https://www.facebook.com/NaibetKE",
  "https://x.com/naibetke",
  "https://www.instagram.com/naibetke",
];
const BRAND_CONTACT_POINT = {
  "@type": "ContactPoint",
  telephone: "+254 711 082 800",
  contactType: "Customer Service",
  areaServed: "KE",
  availableLanguage: "en",
};
const BRAND_DESCRIPTION =
  "Bet from as low as KSh 10 and win big with Naibet! Enjoy on sports bets, thrilling casino games, huge jackpots, and virtual sports action.";

export function useOrganizationSchema() {
  // Build breadcrumbs dynamically based on the current route path
  const getBreadcrumbs = (to, baseUrl) => {
    const segments = to.path.split("/").filter(Boolean);
    const breadcrumbs = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
    ];

    segments.forEach((segment, index) => {
      const name =
        segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ||
        "Home";
      const itemUrl = `${baseUrl}/${segments.slice(0, index + 1).join("/")}`;
      breadcrumbs.push({
        "@type": "ListItem",
        position: index + 2,
        name,
        item: itemUrl,
      });
    });

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs,
    };
  };
  const getJsonLd = (to, baseUrl) => {
    const canonicalUrl = `${baseUrl}${to.path}`;
    const { country, league, matchSlug } = to.params;

    switch (to.name) {
      case "home":
      case "home-page":
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE_NAME,
          url: baseUrl,
          description: BRAND_DESCRIPTION,
          inLanguage: "en-KE",
          publisher: {
            "@type": "Organization",
            name: BRAND_NAME,
            alternateName: "naibet.com",
            url: baseUrl,
            logo: BRAND_LOGO,
            contactPoint: BRAND_CONTACT_POINT,
            sameAs: BRAND_SAME_AS,
          },
          potentialAction: {
            "@type": "SearchAction",
            target: `${baseUrl}/sports/{search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        };

      case "sports":
        return {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Sports Betting - Naibet",
          description:
            "Bet on football, basketball, tennis, and other sports with live odds and instant updates on Naibet.",
          url: canonicalUrl,
          about: {
            "@type": "SportsOrganization",
            name: "Naibet Sportsbook",
            sport: "Football, Basketball, Tennis, Rugby, Cricket",
          },
        };
      case "match-details":
        // Extract match info from route params
        return {
          "@context": "https://schema.org",
          "@type": "SportsEvent",
          name:
            matchSlug
              ?.replace(/-/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase()) || "Sports Match",
          url: canonicalUrl,
          eventStatus: "https://schema.org/EventScheduled",
          startDate: new Date().toISOString(), // you can replace with actual match start time
          location: {
            "@type": "Place",
            name:
              league
                ?.replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase()) || "League",
            address: {
              "@type": "PostalAddress",
              addressCountry:
                country?.toUpperCase() === "ENGLAND"
                  ? "GB"
                  : country?.substring(0, 2).toUpperCase() || "KE",
            },
          },
          competitor: [
            {
              "@type": "SportsTeam",
              name:
                matchSlug
                  ?.split("-vs-")[0]
                  ?.replace(/-/g, " ")
                  ?.replace(/\b\w/g, (c) => c.toUpperCase()) || "Team A",
            },
            {
              "@type": "SportsTeam",
              name:
                matchSlug
                  ?.split("-vs-")[1]
                  ?.replace(/-/g, " ")
                  ?.replace(/\b\w/g, (c) => c.toUpperCase()) || "Team B",
            },
          ],
          offers: {
            "@type": "Offer",
            url: canonicalUrl,
            price: "0.00",
            priceCurrency: "KES",
            availability: "https://schema.org/InStock",
            validFrom: new Date().toISOString(),
            description: `Bet on ${matchSlug
              ?.replace(/-/g, " ")
              ?.replace(/\b\w/g, (c) => c.toUpperCase())} on Naibet.`,
          },
          organizer: {
            "@type": "Organization",
            name: "Naibet",
            url: baseUrl,
            logo: `${baseUrl}/logo.png`,
          },
        };

      case "live":
        return {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Live Betting - Naibet",
          description:
            "Enjoy live betting on ongoing sports matches with real-time odds and cash out options.",
          url: canonicalUrl,
          about: {
            "@type": "SportsEvent",
            name: "Live Matches",
            eventStatus: "https://schema.org/EventInProgress",
          },
        };

      case "casino":
      case "new-games":
        return {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Online Casino - Naibet",
          description:
            "Play exciting online casino games including slots, roulette, and aviator at Naibet.",
          url: canonicalUrl,
          mainEntity: {
            "@type": "Game",
            name: "Naibet Casino Games",
            applicationCategory: "Game",
            operatingSystem: "Web",
          },
        };

      case "promotions":
        return {
          "@context": "https://schema.org",
          "@type": "OfferCatalog",
          name: "Naibet Promotions & Bonuses",
          description:
            "Explore Naibet promotions including free bets, deposit bonuses, and cashback offers.",
          url: canonicalUrl,
          itemListElement: [
            {
              "@type": "Offer",
              name: "Free Bet Bonus",
              description:
                "Register now and get a free bet bonus on your first deposit.",
              url: `${baseUrl}/promotions/free-bet`,
              price: "0",
              priceCurrency: "KES",
              availability: "https://schema.org/InStock",
            },
          ],
        };

      case "contact":
      case "profile":
      case "self-exclusion":
        return {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Naibet Support",
          description:
            "Get help and support for your Naibet account, deposits, withdrawals, and betting issues.",
          url: canonicalUrl,
          mainEntity: {
            "@type": "Organization",
            name: BRAND_NAME,
            alternateName: "naibet.com",
            url: baseUrl,
            logo: BRAND_LOGO,
            contactPoint: BRAND_CONTACT_POINT,
            sameAs: BRAND_SAME_AS,
          },
        };

      default:
        return {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: to.meta.title || SITE_NAME,
          description: to.meta.description || BRAND_DESCRIPTION,
          url: canonicalUrl,
          inLanguage: "en-KE",
          isPartOf: {
            "@type": "WebSite",
            name: SITE_NAME,
            url: baseUrl,
          },
        };
    }
  };

  const combinedSchemas = (to, baseUrl) => [
    getJsonLd(to, baseUrl),
    getBreadcrumbs(to, baseUrl),
  ];

  return {
    getJsonLd,
    combinedSchemas,
  };
}
