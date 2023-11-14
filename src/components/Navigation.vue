<template>
  <header class="sticky top-0 shadow-md z-50 bg-background">
    <nav class="px-24 flex items-center justify-between gap-3 text-text py-5 max-md:py-4 max-sm:px-2">
      <RouterLink :to="{name: 'home'}">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-cloud-meatball fa-2xl text-primary"></i>
          <p class="text-3xl font-semibold text-primary max-md:text-xl">ClearVue</p>
        </div>
      </RouterLink>

      <!-- Search Bar -->
      <div class="relative w-[46%]">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for a City"
          class="py-2 px-2 w-full bg-transparent rounded-md border border-gray-300 focus:border-secondary focus:outline-none placeholder:text-sm placeholder:font-Lexend"
          @input="getSearchResults"
          @keypress.enter="previewCityFromButton"
        />
        <!-- Search Btn -->
        <div class="flex items-center justify-center absolute bg-accent w-9 h-9 right-[3px] top-[3px] rounded-[4px] cursor-pointer hover:opacity-80" @click="previewCityFromButton">
          <i class="fa-solid fa-magnifying-glass text-white"></i>
        </div>

        <ul v-if="geoCodingSearchResults && showDropdown" class="absolute bg-gray-200 text-text w-full shadow-sm py-1 px-1 top-[44px] rounded-md">

          <p v-if="searchError">Sorry, something went wrong. Please, try again!</p>
          <p v-if="!searchError && geoCodingSearchResults.length === 0" class="py-1 px-1">No results found. Try a different City.</p>

          <template v-else>
            <li v-for="searchResult in geoCodingSearchResults" :key="searchResult.id" class="py-1 px-1 rounded-[4px] cursor-pointer hover:bg-gray-300 duration-150 ease-out" @click="pushSearchQuery(searchResult)">
              {{ `${searchResult.name}, ${searchResult.state}, ${searchResult.country}` }}
            </li>
          </template>
        </ul>
      </div>

      <!-- Nav Links -->
      <ul class="flex items-center gap-8 font-semibold text-text max-md:text-sm max-sm:hidden">
        <li class="hover:text-secondary duration-150 ease-out cursor-pointer" @click="openModal('about')">About ClearVue</li>
        <li class="hover:text-secondary duration-150 ease-out cursor-pointer" @click="openModal('how')">How it works</li>
      </ul>

      <Modal :modalActive="modalActive" @close-modal="toggleModal">
        <div class="text-text" v-if="selectedLink === 'about'">
          <h1 class="text-xl mb-4 font-semibold">
            About ClearVue:
          </h1>
          <p>ClearVue is a user-friendly and intuitive weather application designed to provide you with up-to-date weather information at your fingertips.<br><br> Whether you're planning your day, a trip, or simply want to stay informed about the weather conditions, ClearVue has you covered.</p>
        </div>
        <div class="text-text" v-if="selectedLink === 'how'">
          <h1 class="text-xl mb-4 font-semibold">
            How it works:
          </h1>
          <p>
            ClearVue is a user-friendly weather application that provides accurate and real-time weather information. Here's how it works:
          </p>
          <ul>
            <li>1. Start by entering a location to search for.</li>
            <li>2. View current weather conditions, including temperature, wind speed, humidity, and more.</li>
            <li>3. Track a City to view at a later time.</li>
          </ul>
        </div>
      </Modal>

    </nav>
  </header>
</template>

<script setup>
  import { RouterLink } from 'vue-router';
  import Modal from './Modal.vue';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';

  // Modal scripts
  const modalActive = ref(false);
  const selectedLink = ref(null);

  const openModal = (link) => {
    selectedLink.value = link;
    modalActive.value = true;
  }

  const toggleModal = () => {
    modalActive.value = !modalActive.value;
  };

  // Input scripts
  const searchQuery = ref("");
  const queryTimeout = ref(null);
  const geoCodingAPIKey = 'e7a0834d5c68a78d2a20c4ade200a188';
  const geoCodingSearchResults = ref(null);
  const searchError = ref(null);

  const getSearchResults = () => {
    clearTimeout(queryTimeout.value);
    queryTimeout.value = setTimeout(async () => {
      if (searchQuery.value !== "") {
        try {
          const result = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery.value}&limit=5&appid=${geoCodingAPIKey}`);
          geoCodingSearchResults.value = result.data;
        } catch {
          searchError.value = true;
        }
        return;
      };
      geoCodingSearchResults.value = null;
    }, 200)
  };

  let lastSelectedSearchResult = ref(null);

  const previewCityFromButton = () => {
    if (lastSelectedSearchResult.value) {
      previewCity(lastSelectedSearchResult.value);
    }
    searchQuery.value = ""
  };
  
  const showDropdown = ref(true);

  const pushSearchQuery = (searchResult) => {
    searchQuery.value = `${searchResult.name}, ${searchResult.state}, ${searchResult.country}`;
    showDropdown.value = false;
    lastSelectedSearchResult.value = searchResult;
  };

  const router = useRouter();

  const previewCity = (searchResult) => {
    console.log(searchResult);
    const city = searchResult.name;
    const state = searchResult.state;
    router.push({
      name: 'cityView',
      params: { state: state, city: city },
      query: {
        lat: searchResult.lat,
        lng: searchResult.lon,
        preview: true
      }
    });
  }

</script>
