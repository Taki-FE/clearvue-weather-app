<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)"/>

    <!-- Fallback Content -->
    <p v-if="savedCities.length === 0">
      No cities added. To start tracking a city, search above.
    </p>
  </div>
</template>

<script setup>
  import axios from 'axios';
  import { ref } from 'vue';
  import CityCard from './CityCard.vue';
  import { useRouter } from 'vue-router';

  const apiKey = 'e7a0834d5c68a78d2a20c4ade200a188';
  const savedCities = ref([]);
  const getCities = async () => {
    if (localStorage.getItem('savedCities')) {
      savedCities.value = JSON.parse(localStorage.getItem('savedCities'));

      const requests = [];
      savedCities.value.forEach((city) => {
        requests.push(axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=${apiKey}&units=metric`))
      });

      const weatherData = await Promise.all(requests);

      await new Promise((res) => {
        setTimeout(res, 1500)
      });

      weatherData.forEach((value, index) => {
        savedCities.value[index].weather = value.data;
      });
    };
  };

  await getCities();

  // Redirecting the user
  const router = useRouter();
  const goToCityView = (city) => {
    router.push({
      name: 'cityView',
      params: {
        state: city.state,
        city: city.city
      },
      query: {
        id: city.id,
        lat: city.coords.lat,
        lng: city.coords.lng
      }
    });
  };
</script>
