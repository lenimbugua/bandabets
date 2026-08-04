import axios from "axios";

// These are runtime-config keys, not URLs. `API()` resolves them at call
// time so the server can be reconfigured without a rebuild. Every call site
// passes them straight to API(), so the identifiers are unchanged.
export const matchesBaseURL = "matchesUrl";
export const instantBaseURL = "instantUrl";
export const authBaseURL = "authUrl";
export const betBaseURL = "betUrl";
export const casinoBaseURL = "casinoUrl";
export const virtualBaseURL = "virtualUrl";
export const virtualLeaguesBaseURL = "virtualLeaguesUrl";
export const kironLiteBaseURL = "kironLiteUrl";
export const affiliateBaseURL = "affiliateUrl";
export const cmsBaseURL = "cmsUrl";
export const affiliateApiBaseURL = "affiliateApiUrl";

export default (service = matchesBaseURL) => {
  const config = useRuntimeConfig();
  const baseURL = config.public[service];

  if (!baseURL) {
    throw new Error(
      `API(): no runtime config value for "${service}". ` +
        `Set NUXT_PUBLIC_${service.replace(/[A-Z]/g, (c) => "_" + c).toUpperCase()}.`,
    );
  }

  return axios.create({ baseURL });
};
