<script setup>
import { ref } from "vue";
import TheButton from "./TheButton.vue";

const matches = ref([
  {
    date: "2022/01",
    time: "15:00",
    homeTeam: "Aston Villa",
    awayTeam: "Newcastle United",
    id: 2554,
    markets: {
      name: "1 x 2",
      odds: [
        {
          name: "1",
          odd: 1.2,
          selected: false,
        },
        {
          name: "X",
          odd: 6.4,
          selected: false,
        },
        {
          name: "2",
          odd: 10.0,
          selected: false,
        },
      ],
    },
  },
  {
    date: "2022/01",
    time: "17:00",
    homeTeam: "Nottingham Forest",
    awayTeam: "Arsenal FC",
    id: 7987,
    markets: {
      name: "1 x 2",
      odds: [
        {
          name: "1",
          odd: 6.75,
          selected: false,
        },
        {
          name: "X",
          odd: 4.6,
          selected: false,
        },
        {
          name: "2",
          odd: 1.46,
          selected: false,
        },
      ],
    },
  },
  {
    date: "2022/01",
    time: "17:00",
    homeTeam: "Crystal Palace",
    awayTeam: "Sheffield United",
    id: 2667,
    markets: {
      name: "1 x 2",
      odds: [
        {
          name: "1",
          odd: 1.61,
          selected: false,
        },
        {
          name: "X",
          odd: 3.9,
          selected: false,
        },
        {
          name: "2",
          odd: 5.5,
          selected: false,
        },
      ],
    },
  },
  {
    date: "2022/01",
    time: "17:00",
    homeTeam: "Manchester City",
    awayTeam: "Burnley",
    id: 2234,
    markets: {
      name: "1 x 2",
      odds: [
        {
          name: "1",
          odd: 1.1,
          selected: false,
        },
        {
          name: "X",
          odd: 11,
          selected: false,
        },
        {
          name: "2",
          odd: 23,
          selected: false,
        },
      ],
    },
  },
  {
    date: "2022/01",
    time: "19:30",
    homeTeam: "Tottenham Hotspur",
    awayTeam: "Brentford",
    id: 2123,
    markets: {
      name: "1 x 2",
      odds: [
        {
          name: "1",
          odd: 1.55,
          selected: false,
        },
        {
          name: "X",
          odd: 4.5,
          selected: false,
        },
        {
          name: "2",
          odd: 6.25,
          selected: false,
        },
      ],
    },
  },
  {
    date: "2022/01",
    time: "19:30",
    homeTeam: "Manchester United",
    awayTeam: "Wolverhampton Wanderers",
    id: 2040,
    markets: {
      name: "1 x 2",
      odds: [
        {
          name: "1",
          odd: 1.2,
          selected: false,
        },
        {
          name: "X",
          odd: 6.4,
          selected: false,
        },
        {
          name: "2",
          odd: 12.0,
          selected: false,
        },
      ],
    },
  },
]);
</script>
<template>
  <RouterLink
    v-for="match in matches"
    :key="match.id"
    :to="{ name: 'match-details' }"
    class="block p-3 pt-2 mt-2 leading-none space-y-2"
    style="border-top: 1px solid #504b5c"
  >
    <div class="flex justify-between text-muted-foreground text-[0.5rem] px-1">
      <div class="flex space-x-4">
        <div>{{ match.date }}, {{ match.time }}</div>
        <div>ID:{{ match.id }}</div>
      </div>
      <div>+215</div>
    </div>
    <div class="text-xs leading-none text-white space-y-2 px-1">
      <div>{{ match.homeTeam }}</div>
      <div>{{ match.awayTeam }}</div>
    </div>
    <div class="flex space-x-1 text-xs">
      <TheButton
        v-for="odd in match.markets.odds"
        :key="odd.name"
        :selected="false"
        :odd-type="odd.name"
        :odd="odd.odd"
      />
    </div>
  </RouterLink>
</template>
