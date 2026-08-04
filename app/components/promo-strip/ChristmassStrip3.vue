<template>
  <div
    class="w-full h-8 flex items-center justify-center relative shadow-2xl christmas-strip-final"
  >
    <div
      class="text-container relative z-10 flex items-center justify-center space-x-4 h-full"
    >
      <p class="text-md font-bold tracking-wide final-text">
        Sambaza Krisii na mabeste!
      </p>

      <a
        href="YOUR_CLAIM_NOW_LINK"
        class="claim-button py-1 px-3 text-sm font-semibold rounded-full uppercase transition-all duration-200"
      >
        CLAIM NOW
      </a>
    </div>
  </div>
</template>

<style scoped>
.text-container {
  padding: 0 15px;
  height: calc(100% - 6px);
  background: rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
  backdrop-filter: blur(5px);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.7),
    inset 0 0 10px rgba(255, 255, 255, 0.5);
  animation: pulseGlow 3s infinite alternate ease-in-out;
}

.text-container p {
  font-size: 1.25rem;
  line-height: 1;
  font-family: "Georgia", serif;
  color: white;
  text-shadow: 0 0 5px #f00, 0 0 10px #f00, 0 0 15px #f00, 0 0 20px #fff;
}

@keyframes pulseGlow {
  0% {
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  }
  100% {
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.8);
  }
}
</style>
