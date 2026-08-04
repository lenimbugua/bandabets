<script setup>
import EventCard from "../components/EventCard.vue";
import CalendarTabs from "../components/CalendarTabs.vue";
</script>
<template>
  <CalendarTabs />
  <EventCard :has-selection="false" />
  <EventCard :has-selection="false" />
  <EventCard :has-selection="false" />
  <EventCard :has-selection="false" />
</template>
