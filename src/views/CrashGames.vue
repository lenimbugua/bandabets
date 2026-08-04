<script setup>
import { useCrash } from "../composables/useCrash";
const { categories, games } = useCrash();

</script>
<template>
    <h1
      class="font-bold text-xl flex justify-center w-full text-center sm:text-left text-gray-950 dark:text-white my-3"
    >
      HOT
    </h1>
    <div>
      <TheCrash :games="games" :categories="categories" />
    </div>
</template>
