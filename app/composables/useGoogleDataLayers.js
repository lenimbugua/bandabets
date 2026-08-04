export function useGoogleDataLayers() {
  function pushDataLayerToGoogle(eventObject) {
    
    // Initialize the data layer if it doesn't exist
    window.dataLayer = window.dataLayer || [];

    // Push the  event data to the data layer
    window.dataLayer.push(eventObject);
  }

  return {
    pushDataLayerToGoogle,
  };
}
