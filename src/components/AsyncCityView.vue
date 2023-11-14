<template>
  <div class="flex flex-col flex-1 items-center text-text relative">
    <!-- Banner -->
    <Transition name="banner">
      <div v-if="route.query.preview && showBanner" class="flex items-center justify-end gap-[380px] text-text py-3 px-8 bg-blue-100 w-full text-center max-sm:gap-0">
        <p>You are currently previewing this City. Click the "+" icon to track this City.</p>
        <i class="fa-solid fa-circle-xmark cursor-pointer hover:opacity-80 duration-300 ease-out" @click="closeBanner"></i>
      </div>
    </Transition>

    <!-- Toast -->
    <Transition name="toast">
      <div v-if="showAddToast" class="flex items-center gap-2 bg-background shadow-md py-8 pl-6 pr-8 border-l-8 border-l-successColor text-successColor rounded-l-md absolute right-0 top-4 z-50">
        <i class="fa-regular fa-face-smile text-xl"></i>
        <p class="font-medium">Added to tracked cities!</p>
      </div>
    </Transition>
    <Transition name="toast">
      <div v-if="showRemoveToast" class="flex items-center gap-2 bg-background shadow-md py-8 pl-6 pr-8 border-l-8 border-l-successColor text-successColor rounded-l-md absolute right-0 top-4 z-50">
        <i class="fa-regular fa-face-smile text-xl"></i>
        <p class="font-medium">Removed from tracked cities!</p>
      </div>
    </Transition>

    <!-- Overview -->
    <div class="flex flex-col items-center text-text py-12">
      <div class="flex relative">
        <h1 class="text-4xl mb-4">{{ route.params.city }}</h1>
        <div class="absolute flex items-center justify-between w-9 top-2 right-[-96px]">
          <div class="border-text border-opacity-20 border h-7"></div>
          <i class="fa-solid fa-circle-plus text-xl cursor-pointer text-accent" @click="addCityAndTriggerToast" v-if="route.query.preview"></i>
          <i class="fa-solid fa-trash text-xl cursor-pointer duration-200 ease-in-out hover:text-accent" @click="removeCityAndTriggerToast" v-if="!route.query.preview"></i>
        </div>
      </div>
      <p class="text-9xl mb-6">
        {{ Math.round(weatherData.data.main.temp) }}&deg;
      </p>
      <p>
        Feels like: {{ Math.round(weatherData.data.main.feels_like) }}&deg;
      </p>
      <p class="capitalize">
        {{ weatherData.data.weather[0].description }}
      </p>
      <img class="w-48 h-auto bg-secondaryLight rounded-full mt-6" :src="`http://openweathermap.org/img/wn/${weatherData.data.weather[0].icon}@2x.png`" alt="Image of Current Weather">
    </div>

    <hr class="border-text border-opacity-10 border w-[48rem]">

    <div class="flex items-center gap-8 py-8">
      <!-- Wind Readings -->
      <div class="flex flex-col items-center">
        <img class="w-10 h-auto p-2 bg-accent rounded-md m-2" src="../assets/img/wind.svg" alt="">
        <p class="font-bold text-lg">Wind</p>
        <p class="opacity-90"> {{ weatherData.data.wind.speed +'km/h' }}</p>
      </div>
      
      <!-- Humidity Readings -->
      <div class="flex flex-col items-center">
        <img class="w-10 h-auto p-2 bg-accent rounded-md m-2" src="../assets/img/humidity.svg" alt="">
        <p class="font-bold text-lg">Humidity</p>
        <p class="opacity-90"> {{ weatherData.data.main.humidity +'%' }}</p>
      </div>

      <!-- Pressure Readings -->
      <div class="flex flex-col items-center">
        <img class="w-10 h-auto p-2 bg-accent rounded-md m-2" src="../assets/img/pessure.svg" alt="">
        <p class="font-bold text-lg">Pressure</p>
        <p class="opacity-90"> {{ weatherData.data.main.pressure +'hPa' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { uid } from 'uid';

  const showBanner = ref(true);        
  const closeBanner = () => {
    showBanner.value = false;
  };

  const apiKey = 'e7a0834d5c68a78d2a20c4ade200a188';
  const route = useRoute();
  const getWeatherData = async () => {
    try {
      const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${route.query.lat}&lon=${route.query.lng}&appid=${apiKey}&units=metric`);

      await new Promise((res) => {
        setTimeout(res, 1500)
      });

      return weatherData;

    } catch(err) {
      console.log(err);
    }
  }

  const weatherData = await getWeatherData();
  console.log(weatherData);

  const router = useRouter();
  const savedCities = ref([]);
  const addCity = () => {
    if (localStorage.getItem('savedCities')) {
      savedCities.value = JSON.parse(localStorage.getItem('savedCities'));
    };

    const locationObject = {
      id: uid(),
      state: route.params.state,
      city: route.params.city,
      coords: {
        lat: route.query.lat,
        lng: route.query.lng
      }
    };

    savedCities.value.push(locationObject);
    localStorage.setItem('savedCities', JSON.stringify(savedCities.value));

    let query = Object.assign({}, route.query);
    delete query.preview;
    query.id = locationObject.id;
    router.replace({ query })
  };

  const removeCity = () => {
    const cities = JSON.parse(localStorage.getItem('savedCities'));
    const updatedCities = cities.filter((city) => city.id !== route.query.id);
    localStorage.setItem('savedCities', JSON.stringify(updatedCities));
    router.push({
      name: 'home',
    })
  };

  const showAddToast = ref(false);
  const showRemoveToast = ref(false);

  const triggerToast = () => {
    showAddToast.value = true;
    setTimeout(() => showAddToast.value = false, 3500);
  };

  const addCityAndTriggerToast = () => {
    addCity();
    triggerToast();
  };

  const removeCityAndTriggerToast = () => {
    removeCity();
    showRemoveToast.value = true;
    setTimeout(() => showRemoveToast.value = false, 3500);
  };
</script>

<style scoped>
  /* Banner Styles */
  .banner-leave-from {
    opacity: 1;
  }

  .banner-leave-to {
    opacity: 0.6;
    transform: translateY(-100px);
  }

  .banner-leave-active {
    transition: all 300ms cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
  }

  /* Toast Styles */
  .toast-enter-active {
    animation: bounce 400ms ease-in-out;
  }

  @keyframes bounce {
    0% {
      opacity: 0;
      transform: translateX(200px);
    }
    50% {
      opacity: 1;
    }
    60% {
      transform: translateX(-40px);
    }
    70% {
      transform: translateX(-30px);
    }
    80% {
      transform: translateX(-20px);
    }
    90% {
      transform: translateX(-10px);
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes bounceOut {
    0% {
      opacity: 1;
      transform: translateX(0);
    }
    50% {
      transform: translateX(-50px);
    }
    60% {
      transform: translateX(0);
    }
    70% {
      transform: translateX(50px);
    }
    80% {
      transform: translateX(100px);
    }
    90% {
      transform: translateX(150px);
    }
    95% {
      transform: translateX(180px);
    }
    100% {
      transform: translateX(200px);
    }
  }

  /* .toast-leave-from {
    opacity: 1;
    transform: translateX(0);
  }

  .toast-leave-to {
    opacity: 0.5;
    transform: translateX(321px);
  } */

  .toast-leave-active {
    animation: bounceOut 400ms ease-in-out;
  }
</style>