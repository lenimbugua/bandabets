<script setup>
// import formatStuff from "@/utilities/format-stuff";

const props = defineProps({
  img: { type: String, default: "" },
  to: { type: [String, Object], default: "" },
  alt: { type: String, default: "Promotion" },
});

// formCloudflareImage is unused while the placeholder is in place. Kept as a
// commented line rather than deleted so restoring the real image is a
// two-line change in this file.
// const { formCloudflareImage } = formatStuff();

const linkTo = typeof props.to === "string" ? { name: props.to } : props.to;
</script>

<template>
  <div class="pshell">
    <!-- Banner -->
    <component
      :is="to ? 'RouterLink' : 'div'"
      :to="to ? linkTo : undefined"
      class="pshell__banner"
    >
      <!-- TEMPORARY: placeholder in place of the per-promo Cloudflare image.
           This shell renders the banner for EarlyCashout, PlayonRains,
           AviatorFreeRains, DepositBonus, WelcomeBonus and PromoIndex, so it
           is the single point that covers all of them.
           Restore :src="formCloudflareImage(img)" to undo. -->
      <img
        :src="PROMO_PLACEHOLDER"
        :alt="alt"
        loading="lazy"
      />
    </component>

    <!-- Stacked premium sections -->
    <div class="pshell__sections">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.pshell {
  width: 100%;
  padding-bottom: clamp(32px, 5vw, 56px);
}

.pshell__banner {
  display: block;
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid var(--border);
  background: var(--surface-elevated);
  aspect-ratio: 16 / 7;
}
.pshell__banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
@media (max-width: 640px) {
  .pshell__banner {
    aspect-ratio: 16 / 9;
  }
  .pshell__banner img {
    object-fit: contain;
  }
}

.pshell__sections {
  margin-top: clamp(18px, 3vw, 28px);
  display: flex;
  flex-direction: column;
  gap: clamp(14px, 2.2vw, 22px);
}
</style>
