export function useDownloadApp() {
  function downloadApp() {
    const apkUrl =
      "https://play.google.com/store/apps/details?id=com.siakabet&hl=en";
    window.location.href = apkUrl;
  }
  return {
    downloadApp,
  };
}
