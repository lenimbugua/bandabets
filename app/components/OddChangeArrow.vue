<script setup>
const props = defineProps({
  preOddValue: {
    type: String,
    required: true,
  },
  oddValue: {
    type: String,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});

function isUp() {
  return parseInt(props.oddValue) > parseInt(props.preOddValue);
}

function isDown() {
  return parseInt(props.oddValue) < parseInt(props.preOddValue);
}

function isSame() {
  return parseInt(props.oddValue) === parseInt(props.preOddValue);
}

function getCss() {
  if (props.selected) {
    return isDown() ? "arrow down selected-down" : "arrow up selected-up";
  }
  if (isUp()) {
    return "arrow up green";
  }
  if (isDown()) {
    return "arrow down red";
  }
  return "arrow up green";
}
</script>
<template>
  <div v-if="!isSame()" :class="getCss()" />
</template>

<style scoped>
.red {
  border-color: var(--odds-down) transparent transparent transparent;
}

.green {
  border-color: transparent transparent var(--odds-up) transparent;
}

.selected-up {
  border-color: transparent transparent var(--odds-selected-fg) transparent;
}

.selected-down {
  border-color: var(--odds-selected-fg) transparent transparent transparent;
}
.down {
  border-width: 0.5rem 0.25rem 0 0.25rem;
}

.up {
  border-width: 0 0.25rem 0.5rem 0.25rem;
}
.arrow {
  width: 0;
  height: 0;
  border-style: solid;
  line-height: 0;
  opacity: 100%;
  padding: 0 !important;
  display: inline-block !important;
  vertical-align: baseline;
}
</style>
