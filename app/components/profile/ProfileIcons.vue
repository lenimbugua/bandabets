<script setup>
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
});

function showIcon(name) {
  return name === props.icon;
}
</script>
<template>
  <div>
    <div  v-if="showIcon('giftIcon')" class="flex text-lg">🎁🎅🎄</div>
    <!-- <GiftIcon
      v-if="showIcon('giftIcon')"
      class="h-6 w-6 fill-current text-amber-500"
    /> -->
    <Icon
      name="tabler:star"
      v-if="showIcon('star')"
      class="h-6 w-6 fill-current text-yellow-500"
    />
    <Icon name="tabler:bell" v-if="showIcon('bell')" class="h-6 w-6 text-red-500" />
    <Icon
      name="tabler:clock"
      v-if="showIcon('clock')"
      class="h-6 w-6 fill-current text-red-500"
    />
    <Icon
      name="tabler:file-dollar"
      v-if="showIcon('documentCurrencyDollarIcon')"
      class="h-6 w-6 text-amber-500"
    />
    <Icon
      name="tabler:gift"
      v-if="showIcon('giftTopIcon')"
      class="h-6 w-6 text-brand-bright"
    />
    <Icon
      name="tabler:clipboard-list"
      v-if="showIcon('clipboardDocumentListIcon')"
      class="h-6 w-6 text-brand-bright"
    />

    <Icon
      name="tabler:cash-banknote"
      v-if="showIcon('banknotes')"
      class="h-6 w-6 fill-current text-gold-650"
    />
    <Icon
      name="tabler:user-plus"
      v-if="showIcon('userPlusIcon')"
      class="h-6 w-6 fill-current text-red-500"
    />
    <Icon
      name="tabler:help-circle"
      v-if="showIcon('questionMarkCircleIcon')"
      class="h-6 w-6 text-reen-500"
    />
    <Icon
      name="tabler:lock"
      v-if="showIcon('lockClosedIcon')"
      class="h-6 w-6 text-red-500"
    />
    <Icon
      name="tabler:rosette-discount-check"
      v-if="showIcon('checkBadgeIcon')"
      class="h-6 w-6 text-red-500"
    />
    <Icon
      name="tabler:bulb"
      v-if="showIcon('lightBulbIcon')"
      class="h-6 w-6 text-red-500"
    />
  </div>
</template>
