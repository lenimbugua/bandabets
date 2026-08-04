import axios from "axios";

export const matchesBaseURL = import.meta.env.VITE_MATCHES_URL;
export const instantBaseURL = import.meta.env.VITE_INSTANT_URL;
export const authBaseURL = import.meta.env.VITE_AUTH_URL;
export const betBaseURL = import.meta.env.VITE_BET_URL;
export const casinoBaseURL = import.meta.env.VITE_CASINO_URL;
export const virtualBaseURL = import.meta.env.VITE_VIRTUAL_URL;
export const virtualLeaguesBaseURL = import.meta.env.VITE_VIRTUAL_LEAGUES_URL;
export const kironLiteBaseURL = import.meta.env.VITE_KIRON_LITE_URL;
export const affiliateBaseURL = import.meta.env.VITE_AFFILIATE_URL;
export const cmsBaseURL = import.meta.env.VITE_CMS_URL;
export const affiliateApiBaseURL = import.meta.env.VITE_AFFILIATE_API_URL;

// const tenantCode = import.meta.env.VITE_TENANT_CODE;

export default (url = matchesBaseURL) => {
  return axios.create({
    baseURL: url,
    // headers: {
    //   "X-Tenant": tenantCode,
    // },
  });
};
