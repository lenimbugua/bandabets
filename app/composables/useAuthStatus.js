const apiSuccessCode = "00";
const apiErrorCode = "01";
const apiProfileExist = "02";
const apiLockedCode = "03";
const apiProfileNotFound = "04";
const apiProfileInActive = "05";
const apiProfileChangePassword = "06";

export function useAuthStatus() {
  return {
    apiSuccessCode,
    apiProfileExist,
    apiLockedCode,
    apiProfileNotFound,
    apiProfileInActive,
    apiErrorCode,
    apiProfileChangePassword,
  };
}
