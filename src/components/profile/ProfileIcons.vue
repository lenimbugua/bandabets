<script setup>
import {
  BanknotesIcon,
  BellIcon,
  CheckBadgeIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  DocumentCurrencyDollarIcon,
  GiftTopIcon,
  LightBulbIcon,
  LockClosedIcon,
  QuestionMarkCircleIcon,
  StarIcon,
  UserPlusIcon,
} from "@heroicons/vue/24/outline";
// import { GiftIcon } from "@heroicons/vue/24/solid";

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
    <StarIcon
      v-if="showIcon('star')"
      class="h-6 w-6 fill-current text-yellow-500"
    />
    <BellIcon v-if="showIcon('bell')" class="h-6 w-6 text-red-500" />
    <ClockIcon
      v-if="showIcon('clock')"
      class="h-6 w-6 fill-current text-red-500"
    />
    <DocumentCurrencyDollarIcon
      v-if="showIcon('documentCurrencyDollarIcon')"
      class="h-6 w-6 text-amber-500"
    />
    <GiftTopIcon
      v-if="showIcon('giftTopIcon')"
      class="h-6 w-6 text-brand-bright"
    />
    <ClipboardDocumentListIcon
      v-if="showIcon('clipboardDocumentListIcon')"
      class="h-6 w-6 text-brand-bright"
    />

    <BanknotesIcon
      v-if="showIcon('banknotes')"
      class="h-6 w-6 fill-current text-purple-500"
    />
    <UserPlusIcon
      v-if="showIcon('userPlusIcon')"
      class="h-6 w-6 fill-current text-red-500"
    />
    <QuestionMarkCircleIcon
      v-if="showIcon('questionMarkCircleIcon')"
      class="h-6 w-6 text-reen-500"
    />
    <LockClosedIcon
      v-if="showIcon('lockClosedIcon')"
      class="h-6 w-6 text-red-500"
    />
    <CheckBadgeIcon
      v-if="showIcon('checkBadgeIcon')"
      class="h-6 w-6 text-red-500"
    />
    <LightBulbIcon
      v-if="showIcon('lightBulbIcon')"
      class="h-6 w-6 text-red-500"
    />
  </div>
</template>
