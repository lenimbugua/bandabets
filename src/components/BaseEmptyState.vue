<script setup>
import { computed } from "vue";

const props = defineProps({
  icon: { type: [Object, Function], default: null },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  size: { type: String, default: "md", validator: (v) => ["sm", "md", "lg"].includes(v) },
  compact: { type: Boolean, default: false },
});

const sizeClasses = computed(() => {
  const map = {
    sm: {
      container: props.compact ? "py-4" : "py-6",
      ring: "w-10 h-10",
      ringInset: "inset-1.5",
      icon: "w-4 h-4",
      title: "text-xs",
      desc: "text-[0.65rem]",
      gap: "mb-3",
    },
    md: {
      container: "py-8",
      ring: "w-14 h-14",
      ringInset: "inset-2",
      icon: "w-5.5 h-5.5",
      title: "text-[0.85rem]",
      desc: "text-[0.7rem]",
      gap: "mb-4",
    },
    lg: {
      container: "py-12",
      ring: "w-16 h-16",
      ringInset: "inset-2.5",
      icon: "w-6 h-6",
      title: "text-sm",
      desc: "text-xs",
      gap: "mb-5",
    },
  };
  return map[props.size];
});
</script>

<template>
  <div
    :class="[
      'flex flex-col items-center justify-center text-center px-4',
      sizeClasses.container,
    ]"
  >
    <!-- Icon area -->
    <div :class="['relative', sizeClasses.ring, sizeClasses.gap]">
      <slot name="icon">
        <!-- Animated dashed ring -->
        <div
          class="absolute inset-0 rounded-full border-[1.5px] border-dashed border-gray-300 dark:border-white/8 animate-[spin_20s_linear_infinite]"
        />
        <!-- Inner circle -->
        <div
          :class="[
            'absolute rounded-full bg-gray-100 dark:bg-white/[0.03] flex items-center justify-center',
            sizeClasses.ringInset,
          ]"
        >
          <component
            :is="icon"
            v-if="icon"
            :class="[sizeClasses.icon, 'text-gray-400 dark:text-white/15']"
          />
        </div>
      </slot>
    </div>

    <!-- Title -->
    <h3
      :class="[
        sizeClasses.title,
        'font-semibold text-gray-700 dark:text-white/60',
        description || $slots.default ? 'mb-1' : '',
      ]"
    >
      {{ title }}
    </h3>

    <!-- Description -->
    <slot>
      <p
        v-if="description"
        :class="[
          sizeClasses.desc,
          'text-gray-500 dark:text-white/25 leading-relaxed max-w-[14rem]',
        ]"
      >
        {{ description }}
      </p>
    </slot>

    <!-- Action slot -->
    <div v-if="$slots.action" class="mt-3">
      <slot name="action" />
    </div>
  </div>
</template>
