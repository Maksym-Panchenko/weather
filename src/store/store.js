import Vue from 'vue'
import Vuex from 'vuex'
import {getInfoByCity} from "@/services/weather";
import {eventBus} from "@/services/event-bus";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    lang: 'ua',
    darkMode: false,
    favoriteCities: [],
    searchedCites: [],

    snackbars: [],
    isLoading: false
  },

  mutations: {
    addSnackbar(state, params) {
      state.snackbars.push({
        status: params.status,
        text: params.text,
        id: Math.floor(Math.random() * Date.now())
      })
    },
    removeSnackbar(state, id) {
      state.snackbars = state.snackbars.filter(e => e.id !== id);
    },
    showSnackbar(state) {
      state.showSnackbar = true;
    },
    hideSnackbar(state) {
      state.showSnackbar = false;
    },
    addToFavorite(state, fullCityData) {
      if (state.favoriteCities.length < 5) {
        // add city
        state.favoriteCities.push(fullCityData);
        this.commit('addSnackbar', {
          status: 'success',
          text: 'snackbarSuccessAddCity'
        });
        this.commit('saveFavorites');

      } else {
        this.commit('addSnackbar', {
          status: 'error',
          text: 'snackbarErrorAddCity'
        })
      }
    },

    removeFromFavorite(state, city) {
      const index = state.favoriteCities.findIndex(c => c.city === city.city && c.country === city.country);
      if (index >= 0) {
        state.favoriteCities.splice(index, 1);
        this.commit('addSnackbar', {
          status: 'success',
          text: 'snackbarSuccessRemoveCity'
        });
        // save to local storage
        this.commit('saveFavorites');
      }
    },

    addCityToSearched(state, city) {
      state.searchedCites.push(city);
    },

    removeCityFromSearched(state, num) {
      state.searchedCites.splice(num, 1);
    },

    replaceCity(state, {city, index}) {
      state.searchedCites.splice(index, 1, city);
    },

    saveFavorites(state) {
      if (state.favoriteCities.length) {
        localStorage.setItem('favorite', JSON.stringify( state.favoriteCities.map(e => ({city: e.city, country: e.country}))) );
      } else {
        localStorage.removeItem('favorite');
      }
    },

    loadFavorites(state) {
      const savedCities = localStorage.getItem('favorite');
      if (savedCities) {
        state.favoriteCities = JSON.parse(savedCities);
      }
    },

    startLoad(state) {
      state.isLoading = true;
    },

    endLoad(state) {
      state.isLoading = false;
    },

    switchLang(state) {
      state.lang = state.lang === 'ua' ? 'en' : 'ua';
      this.commit('saveSettings');
    },

    updateFavoriteList(state, list) {
      state.favoriteCities = list;
    },

    updateSearchedList(state, list) {
      state.searchedCites = list;
    },

    changeMode(state) {
      state.darkMode = !state.darkMode;
      eventBus.$emit('updateCardGraphColor');
      this.commit('saveSettings');
    },

    saveSettings(state) {
      localStorage.setItem('settings', JSON.stringify({'lang': state.lang, 'darkMode': state.darkMode}));
    },

    loadSettings(state) {
      const settings = localStorage.getItem('settings');
      if (settings) {
        const settingsValue = JSON.parse(settings);
        state.lang = settingsValue.lang;
        state.darkMode = settingsValue.darkMode;
      }
    }
  },
  actions: {
    displaySnackbar({ commit }) {
      commit('showSnackbar')
      setTimeout(() => {
        commit('hideSnackbar')
      }, 3000)
    },

    async addCityToSearched({state, commit}, city) {
      if (state.searchedCites.length < 5) {
        const newCity = await getInfoByCity(city.city, city.country);
        const newCityData = Object.assign(newCity[0], {graph: newCity[1]})
        commit('addCityToSearched', newCityData);

      } else {
        this.commit('addSnackbar', {
          status: 'error',
          text: 'snackbarErrorAddCityToSelected'
        });
      }
    },

    async loadFavorites(state) {
      // load base data
      state.commit('loadFavorites');
      // load weather data
      if (store.state.favoriteCities.length) {
        state.commit('startLoad');
        const resList = []
        for (let index in store.state.favoriteCities) {
          const city = store.state.favoriteCities[index].city;
          const country = store.state.favoriteCities[index].country;

          const res = await getInfoByCity(city, country);
          resList.push(Object.assign(res[0], {graph: res[1]}, {id: Date.now() + index.toString()}))
        }
        state.commit('updateFavoriteList', resList);
        state.commit('endLoad');
      }
    },

    async loadSelected(state) {
      if (store.state.searchedCites.length) {
        state.commit('startLoad');
        const resList = []
        for (let index in store.state.searchedCites) {
          const city = store.state.searchedCites[index].city;
          const country = store.state.searchedCites[index].country;

          const res = await getInfoByCity(city, country);
          resList.push(Object.assign(res[0], {graph: res[1]}, {id: Date.now() + index.toString()}))
        }
        state.commit('updateSearchedList', resList);
        state.commit('endLoad');
      }
    },

    async changeLang(state) {
      state.commit('switchLang');
      state.dispatch('loadFavorites');
      state.dispatch('loadSelected');
    }

  },
  getters: {
    inFavorites: (state) => (city) => {
      return state.favoriteCities.some(favorite => {
        return favorite.city === city.city && favorite.country === city.country
      })
    }
  }
})

export default store