<template>
  <div class="main">
    <modal-confirm :isActive="showModal" :messageOptions="messageOptions" @closeModal="showModal = false" />

    <div class="content">
      <div class="content__tabs">
        <button class="button" @click="selectTab('search')" :class="{ button_active: selectedTab === 'search' }">{{ lang['tabSearch'][$store.state.lang] }}</button>
        <button class="button" @click="selectTab('favorite')" :class="{ button_active: selectedTab === 'favorite' }">{{ lang['tabFavorite'][$store.state.lang] }}</button>
      </div>

      <div class="main__content" id="cards">
        <!-- searched -->
        <template v-if="selectedTab === 'search'">
          <WeatherCard
              v-for="(card, index) in $store.state.searchedCites"
              @removeCity="removeCity(index)"
              @replaceCity="replaceCity($event, index)"
              :card="card"
              :key="card.city + card.country + index"
          />

          <EmptyList v-if="$store.state.searchedCites.length === 0" />

          <div class="main__action">
            <button class="button button_icon" @click="addNewCity">
              <img src="@/assets/img/plus.svg" alt="Add">
            </button>
          </div>
        </template>

        <!-- favorites -->
        <template v-else>
          <WeatherCard
              v-for="(card, index) in $store.state.favoriteCities"
              @removeFavoriteCity="removeFavoriteCity(card)"
              :mode="'favorite'"
              :card="card"
              :key="card.city + card.country + index"
          />

          <EmptyList v-if="$store.state.favoriteCities.length === 0" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import WeatherCard from "@/components/weather-card";
import ModalConfirm from "@/components/modal-confirm";
import lang from "@/services/lang";
import EmptyList from "@/components/empty-list";

export default {
  components: {EmptyList, ModalConfirm, WeatherCard},
  data() {
    return {
      lang,
      defaultCity: { city: 'london', country: 'uk' },
      messageOptions: {},
      showModal: false,
      selectedTab: 'search', // or favorite
    }
  },
  methods: {
    async start() {
      // add default city
      if (!this.$store.state.searchedCites.length) {
        this.$store.dispatch('addCityToSearched', this.defaultCity);
      }

      // load favorite cities and data for there
      this.$store.dispatch('loadFavorites');
    },

    addNewCity() {
      this.$store.dispatch('addCityToSearched', this.defaultCity);
    },

    removeCity(number) {
      this.messageOptions = {
        message: 'modalMessageDeleteCity',
        confirm: () => {
          this.$store.commit('removeCityFromSearched', number);
          this.showModal = false;
        }
      }
      this.showModal = true;
    },

    removeFavoriteCity(city) {
      this.messageOptions = {
        message: 'modalMessageDeleteFavoriteCity',
        confirm: () => {
          this.$store.commit('removeFromFavorite', city);
          this.showModal = false;
        }
      }
      this.showModal = true;
    },

    selectTab(newTab) {
      if (newTab !== this.selectedTab) {
        this.selectedTab = newTab;
      }
    },

    replaceCity(city, index) {
      this.$store.commit('replaceCity', {city, index})
    }
  },
  created() {
    this.start();
  }
}
</script>
