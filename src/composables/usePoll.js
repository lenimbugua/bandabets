import { ref } from "vue";
export function usePoll() {
  // Reactive state variables
  const pollingStatus = ref("Not started");
  const pollCount = ref(0);
  const isPolling = ref(false);
  let pollingInterval = null;

  // Method to start polling
  function startPolling(callback, afterPollCallback = () => {}) {
    if (isPolling.value) return; // Prevent multiple starts
    pollingStatus.value = "Polling started";
    pollCount.value = 0;
    isPolling.value = true;

    // Start polling every 10 seconds
    pollingInterval = setInterval(() => {
      pollCount.value++;
      poll(callback);

      // Stop polling after 40 seconds (4 attempts)
      if (pollCount.value >= 5) {
        stopPolling(afterPollCallback);
      }
    }, 10000); // 10 seconds interval
  }

  // Polling logic
  function poll(callback) {
    pollingStatus.value = `Polling attempt ${pollCount.value}`;
    callback();
  }

  // Method to stop polling
  function stopPolling(afterPollCallback) {
    clearInterval(pollingInterval);
    pollingInterval = null;
    isPolling.value = false;
    afterPollCallback();
    pollingStatus.value = "Polling completed";
  }

  return {
    startPolling,
    stopPolling,
    pollingStatus,
    pollingInterval,
  };
}
