export function waitForAlipayBridge(callback) {
  if (window.AlipayJSBridge) {
    callback();
  } else {
    document.addEventListener(
      'AlipayJSBridgeReady',
      () => {
        callback();
      },
      false
    );
  }
}
