<script setup>
const props = defineProps({
  date: {
    type: String,
    required: true,
  },
});
function parseDate() {
  // Expected format: DD/MM/YY HH:mm
  const [datePart, time] = props.date.split(" ");
  const [day, month] = datePart.split("/");

  // Convert month number → short month name
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthName = months[parseInt(month, 10) - 1];

  return {
    day: day,
    month: monthName,
    time: time,
  };
}

const result = parseDate();
</script>
<template>
  <div class="datebox">
    <div class="datebox-day">{{ result.day }}</div>
    <div class="datebox-month">{{ result.month }}</div>
    <div class="datebox-time">{{ result.time }}</div>
  </div>
</template>

<style scoped>
.datebox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 3rem;
  padding: 0.25rem;
  border-radius: 0.375rem;
  border: 1px solid oklch(0% 0 0 / 0.08);
}
[data-theme="dark"] .datebox {
  border-color: oklch(100% 0 0 / 0.1);
}

.datebox-day {
  font-size: 0.8rem;
  font-weight: 700;
  color: oklch(25% 0 0);
  line-height: 1.1;
}
[data-theme="dark"] .datebox-day {
  color: oklch(100% 0 0 / 0.85);
}

.datebox-month {
  font-size: 0.55rem;
  font-weight: 600;
  color: oklch(45% 0 0);
  text-transform: uppercase;
}
[data-theme="dark"] .datebox-month {
  color: oklch(100% 0 0 / 0.5);
}

.datebox-time {
  font-size: 0.55rem;
  font-weight: 500;
  color: oklch(55% 0 0);
  font-variant-numeric: tabular-nums;
}
[data-theme="dark"] .datebox-time {
  color: oklch(100% 0 0 / 0.4);
}
</style>
