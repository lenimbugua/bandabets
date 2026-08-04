<template>
  <table
    class="animate-pulse w-full text-xs tracking-tight text-left text-gray-500 shadow-md"
  >
    <thead
      class="text-xs h-10 py-4 text-gray-700 dark:bg-surface-deepest bg-gray-200 sticky top-0"
    >
      <tr class="py-4 divide-gray-300">
        <th scope="col" class="p-1"></th>
        <th scope="col" class="p-1">
          <div class="h-2 w-16 bg-gray-400 "></div>
        </th>
      </tr>
    </thead>
    <tbody
      class="dark:bg-surface-deepest bg-white divide-y divide-gray-200 dark:divide-border-darkest"
    >
      <tr
        v-for="number in 25"
        :key="number"
        class="dark:bg-surface-deepest bg-white p-6 cursor-pointer"
      >
        <td class="p-1">
          <div class="h-8 dark:bg-surface-interactive bg-gray-200 "></div>
        </td>
        <td class="p-1 px-2">
          <div class="h-8 dark:bg-surface-interactive bg-gray-200 "></div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
