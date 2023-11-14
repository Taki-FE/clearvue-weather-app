<template>
  <main>
    <Transition appear name="fade">
      <div class="relative w-full h-auto border-none outline-none">
        <img class="object-cover w-full h-64" src="../assets/img/beautiful-mountains.jpg" alt="Beautiful Mountains" />
        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
        <div class="absolute flex flex-col inset-0 items-center gap-5 justify-center">
          <h1 class="text-4xl font-bold text-white text-center md:text-6xl md:w-3/4"><span class="text-accentLight">ClearVue:</span> Clarity in Every Forecast</h1>
          <p class="text=xl text-text text-center w-3/4  md:text-2xl">Explore a new era in weather forecasting with ClearVue.</p>
        </div>
      </div>
    </Transition>

    <Transition appear name="fade">
      <div class="flex flex-col gap-4 items-center min-h-screen mb-8">
        <h2 class="text-accent text-2xl font-semibold
        mt-8 mb-2">Tracked Cities</h2>
        <Suspense>
          <CityList />
          <template #fallback>
            <CityCardSkeleton />
          </template>
        </Suspense>
      </div>
    </Transition>
  </main>
</template>

<script setup>
  import CityCardSkeleton from '../components/CityCardSkeleton.vue';
  import CityList from '../components/CityList.vue';

</script>

<style>
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s ease-in-out;
  }
</style>


