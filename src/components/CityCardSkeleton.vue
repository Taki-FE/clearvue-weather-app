<template>
  <div class="flex flex-col items-center py-6 px-6 rounded-md shadow-md min-w-[320px] bg-accentLighter">
    <div class="flex flex-col flex-1 gap-2 items-center mb-4 w-full">
      <Placeholder class="max-w-[50%] h-8" />
      <Placeholder class="max-w-[40%] h-4" />
    </div>

    <hr class="border-text border-opacity-10 border w-full mb-4">

    <div class="flex flex-col items-center gap-2 w-full">
      <Placeholder class="max-w-[50px] w-full h-9" />
      <Placeholder class="max-w-[70px] w-full h-4" />
    </div>
  </div>
</template>

<script setup>
  import Placeholder from './Placeholder.vue';

</script>  