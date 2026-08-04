<script setup>
import EventCard from "@/components/EventCard.vue";
import EventCategory from "@/components/EventCategory.vue";
import CalendarTabs from "../components/CalendarTabs.vue";
</script>
<template>
  <CalendarTabs />
  <EventCard />
  <EventCard />
  <div v-for="i in 4" :key="i" class="mb-1">
    <EventCategory :is-opened="false" />
  </div>
</template>
