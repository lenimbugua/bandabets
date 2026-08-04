
// Factory, not a module-scope literal: state() calls this on every store
// instantiation so each store instance (and, on the server, each concurrent
// request) gets its own array rather than a shared reference that a
// mutation from one user's session could leak into every other request.
function createLinks() {
  return [
  {
    path: "sports",
    name: "Sports",
    icon: "sport",
    iconCss: "h-5 w-5 text-brand-bright fill-current",
    css: "bg-brand-bright/15 text-brand-bright",
  },
  {
    path: "live",
    name: "Live",
    icon: "live",
    iconCss: "h-5 w-5 text-brand-bright fill-current",
  },
  {
    path: "aviator",
    name: "Aviator",
    icon: "aviator",
    iconCss: "h-5 w-5 text-brand-bright fill-current",
  },
  {
    path: "crash",
    name: "Crash",
    icon: "crash",
    iconCss: "h-5 w-5 text-brand-bright fill-current",
  },
  {
    path: "virtuals",
    name: "Virtuals",
    icon: "virtual",
    iconCss: "h-5 w-5 text-brand-bright fill-current",
  },
  {
    path: "promotions",
    name: "Promos",
    icon: "promotion",
    badge: "NEW",
    iconCss: "h-5 w-5 text-brand-bright fill-current",
  },
  //   {
  //     path: "leaderboard",
  //     name: "Leaderboard",
  //     icon: "trophy",
  //     iconCss: "h-5 w-5 text-brand-bright fill-current",
  //     badge: "NEW",
  //   },
  {
    path: "countries",
    name: "Countries",
    icon: "countries",
    iconCss: "h-5 w-5 text-brand-bright fill-current",
  },
  ];
}

export const useLinksStore = defineStore("links-store", {
  state: () => {
    const links = createLinks();
    return {
      links,
      selectedLink: links[0].path,
    };
  },

  actions: {
    isSelected(path) {
      this.selectedLink === path;
    },

    selectLink(params) {
      this.selectedLink = params;
    },
  },
});
