<template>
  <div class="card__header" :class="{'card__header_reverse': mode !== 'search'}">
    <template v-if="mode === 'search'">
      <CustomAutocomplete @updateCity="$emit('updateCity', $event)" />

      <div class="card__actions">
        <button v-if="inFavorites()" @click="removeCityFromFavorite(true)" class="button button_icon button_small button_flat">
          <img src="@/assets/img/star.svg" :alt="tr('altRemoveFromFavorite')">
        </button>

        <button v-if="!inFavorites()" @click="addCityToFavorite" class="button button_icon button_small button_flat">
          <img src="@/assets/img/star-outline.svg" :alt="tr('altAddToFavorite')">
        </button>

        <button @click="removeCityFromSearched" class="button button_icon button_small button_flat">
          <img src="@/assets/img/close-black.svg" :alt="tr('altRemove')">
        </button>
      </div>
    </template>

    <template v-else>
      <div class="card__actions">
        <button @click="removeCityFromFavorite(false)" class="button button_icon button_small button_flat">
          <img src="@/assets/img/close-black.svg" :alt="tr('altRemove')">
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import CustomAutocomplete from "@/components/custom-autocomplete";
import tr from "@/services/lang";

export default {
  components: {CustomAutocomplete},
  props: {
    mode: {
      type: String,
      required: true
    },
    card: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tr
    }
  },
  methods: {
    inFavorites() {
      return this.$store.getters.inFavorites({city: this.card.city, country: this.card.country});
    },

    addCityToFavorite() {
      this.$store.commit('addToFavorite', this.card);
    },

    removeCityFromFavorite(withoutModal) {
      if (withoutModal) {
        this.$store.commit('removeFromFavorite', {city: this.card.city, country: this.card.country})
      } else {
        this.$emit('removeFavoriteCity');
      }
    },

    removeCityFromSearched() {
      this.$emit('removeCity');
    },
  }
}
</script>

<style scoped>
.card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card__header_reverse {
  flex-direction: row-reverse;
}

.card__actions {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

@media (max-width: 640px) or (min-width: 1280px) {
  .card__header {
    flex-direction: column-reverse;
    align-items: flex-end;
    gap: 0.4rem;
  }
}
</style>