<template>
  <div class="flex flex-col items-center py-6 px-6 rounded-md shadow-md cursor-pointer w-[50%] min-w-[320px] bg-accentLighter
  text-text">
    <div class="flex flex-col flex-1 items-center mb-4">
      <h2 class="text-3xl">{{ city.city }}</h2>
      <h3>{{ city.state }}</h3>
    </div>

    <hr class="border-text border-opacity-10 border w-full mb-4">
    
    <div class="flex flex-col items-center gap-2">
      <p class="text-3xl">
        {{ Math.round(city.weather.main.temp) }}&deg;
      </p>
      <div class="flex gap-2">
        <span class="text-xs">
          H: {{ Math.round(city.weather.main.temp_max) }}&deg;
        </span>
        <span class="text-xs">
          L: {{ Math.round(city.weather.main.temp_min) }}&deg;
        </span>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

  defineProps({
    city: {
      type: Object,
      default: () => {}
    }
  });

</script>