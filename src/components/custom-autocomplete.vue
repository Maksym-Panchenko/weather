<template>
  <label class="autocomplete">
    <div class="autocomplete__text">{{ tr('enterCityName') }}</div>
    <div class="autocomplete__input-wrapper">
      <input
          @input="inputName"
          @keyup.esc="clearItems"
          type="text"
          class="autocomplete__input" placeholder="..."
      >
<!--      @blur="clearItems"-->

      <ul class="autocomplete__list">
        <li
            v-for="item in list"
            @click="selectCity(item)"
            :key="item.cityName + '.' + item.countryName"
            class="autocomplete__list-item"
        >{{item.cityName}} - {{item.countryName}}</li>
      </ul>
    </div>
  </label>
</template>

<script>
import {searchCities} from '@/services/weather'
import tr from '@/services/lang'

export default {
  data() {
    return {
      searchCities,
      list: [],
      tr
    }
  },
  methods: {
    async inputName(event) {
      const value = event.target.value
      if (value.length > 2) {
        this.list = await this.searchCities(value);
      } else {
        this.list.splice(0);
      }
    },

    clearItems() {
      this.list.splice(0);
    },

    selectCity(city) {
      // hide autocomplete items
      this.clearItems();

      // emit
      this.$emit('updateCity', city)
    },
  }
}
</script>

<style scoped>
.autocomplete {
  display: flex;
  font-size: 1.2rem;
  gap: 0.4rem;
}

.autocomplete__text {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.8rem;
  color: var(--color-text);
}

.autocomplete__input-wrapper {
  position: relative;
  border-radius: 0.4rem;
  border: 1px solid var(--color-primary);
}

.autocomplete__input {
  font-size: 1.2rem;
  border: 0;
  outline: 0;
  padding: 0.4rem 0.8rem;
  border-radius: 0.4rem;
  background-color: var(--color-bg-main);
  color: var(--color-text);
}

.autocomplete__list {
  position: absolute;
  top: calc(100% + 0.4rem);
  background: var(--color-bg-main);
  color: var(--color-text);
  left: 0;
  width: 100%;
  box-shadow: var(--item-shadow);
  border-radius: 0.4rem;
  z-index: 3;
}

.autocomplete__list-item {
  list-style-type: none;
  padding: 0.4rem;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: 300;
  border: 1px solid var(--color-primary);
  border-width: 0 1px;
}

.autocomplete__list-item:first-child {
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  border-top: 1px solid var(--color-primary)
}

.autocomplete__list-item:last-child {
  border-bottom-left-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
  border-bottom: 1px solid var(--color-primary)
}

.autocomplete__list-item:hover {
  color: var(--color-primary);
}

@media (max-width: 640px) or (min-width: 1280px) {
  .autocomplete {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .autocomplete__input-wrapper,
  .autocomplete__input {
    width: 100%;
  }
}
</style>