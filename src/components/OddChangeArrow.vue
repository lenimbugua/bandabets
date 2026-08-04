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
  border-color: red transparent transparent transparent;
}

.green {
  border-color: transparent transparent var(--color-brand-bright) transparent;
}

.selected-up {
  border-color: transparent transparent white transparent;
}

.selected-down {
  border-color: white transparent transparent transparent;
}
.down {
  border-width: 0.5rem 0.25rem 0 0.25rem;
  /* border-color: #666 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0); */
  /* _border-color: #666 #000 #000 #000; */
  /* _filter: progid:DXImageTransform.Microsoft.Chroma(color="#000000"); */
}

.up {
  border-width: 0 0.25rem 0.5rem 0.25rem;
  /* border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #666 rgba(0, 0, 0, 0);
  _border-color: #000 #000 #666 #000;
  _filter: progid:DXImageTransform.Microsoft.Chroma(color="#000000"); */
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
