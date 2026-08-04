<script setup>
import formatStuff from "@/utilities/format-stuff";

const props = defineProps({
  img: { type: String, default: "" },
  to: { type: [String, Object], default: "" },
  alt: { type: String, default: "Promotion" },
});

const { formCloudflareImage } = formatStuff();

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
      <img
        :src="formCloudflareImage(img)"
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
