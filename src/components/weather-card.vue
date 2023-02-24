<template>
  <div class="card">
    <div v-if="mode === 'search'" class="card__header">
      <CustomAutocomplete @updateCity="updateCity" />

      <div class="card__actions">
        <button v-if="inFavorites" @click="removeCityFromFavorite(true)" class="button button_icon button_small button_flat">
          <img src="@/assets/img/star.svg" alt="Remove from favorite">
        </button>

        <button v-if="!inFavorites" @click="addCityToFavorite" class="button button_icon button_small button_flat">
          <img src="@/assets/img/star-outline.svg" alt="Add to favorite">
        </button>

        <button @click="removeCityFromSearched" class="button button_icon button_small button_flat">
          <img src="@/assets/img/close-black.svg" alt="Remove">
        </button>
      </div>
    </div>

    <div v-else class="card__header card__header_reverse">
      <div class="card__actions">
        <button @click="removeCityFromFavorite(false)" class="button button_icon button_small button_flat">
          <img src="@/assets/img/close-black.svg" alt="Remove">
        </button>
      </div>
    </div>

    <div class="card__data">
      <div class="card__column">
        <div class="card__city">{{ card.city }} ({{ card.country }})</div>
        <div v-if="card.temp !== undefined" class="card__temp">{{ lang.temp[currentLang] }} {{ card.temp }}&deg;C</div>
        <div v-if="card.weather" class="card__weather">({{ card.weather }})</div>
      </div>

      <div v-if="this.currentCard.weatherIcon" class="card__column">
        <img class="card__image" :src="imgSrc" alt="Weather">
      </div>
    </div>

    <div class="card__graph">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import lang from '@/services/lang';
import CustomAutocomplete from "@/components/custom-autocomplete";
import {getInfoByCity} from "@/services/weather";
import { Chart, LineElement, PointElement, LineController, CategoryScale, LinearScale } from 'chart.js';

Chart.register(LineElement, PointElement, LineController, CategoryScale, LinearScale);

export default {
  components: {CustomAutocomplete},
  props: {
    card: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      default: 'search'
    }
  },
  data() {
    return {
      lang,
      currentCard: this.card,
      chartData: {
        labels: (this.card.graph ? this.card.graph.map(item => item.label.getHours() + ':00') : []),
        datasets: [{
          data: (this.card.graph ? this.card.graph.map(item => item.value) : []),
          backgroundColor: 'rgba(0, 0, 255, 0.5)',
          borderColor: 'blue',
          borderWidth: 1,
          lineTension: 0.4,
        }]
      }
    }
  },
  computed: {
    imgSrc() {
      return (this.currentCard.weatherIcon
        ? `https://openweathermap.org/img/w/${ this.currentCard.weatherIcon }.png`
        : '');
    },
    currentLang() {
      return this.$store.state.lang;
    },
    inFavorites() {
      return this.$store.getters.inFavorites({city: this.currentCard.city, country: this.currentCard.country});
    }
  },
  methods: {
    updateCity(event) {
      // update card
      this.$store.commit('startLoad');
      getInfoByCity(event.cityName, event.countryName).then(res => {
        // update city
        this.currentCard = Object.assign(res[0], {graph: res[1]});
        this.$emit('replaceCity', this.currentCard);
        // update graph
        this.chartData.datasets[0].data = [...res[1].map(e => e.value)];
        this.chart.update();

        this.$store.commit('endLoad');
      })
    },
    addCityToFavorite() {
      this.$store.commit('addToFavorite', this.currentCard)
    },
    removeCityFromFavorite(quietly) {
      if (quietly) {
        this.$store.commit('removeFromFavorite', {city: this.currentCard.city, country: this.currentCard.country})
      } else {
        this.$emit('removeFavoriteCity');
      }
    },
    removeCityFromSearched() {
      this.$emit('removeCity');
    },
    renderChart() {
      if (!this.currentCard.graph) return;
      const ctx = this.$refs.chartCanvas.getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'line',
        data: this.chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
          },
          scales: {
            x: {
              ticks: {
                beginAtZero: true
              }
            }
          }
        }
      });
    }
  },
  mounted() {
    this.renderChart();
  },
}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  background-color: var(--color-white);
  box-shadow: var(--item-shadow);
  padding: 2rem;
  border-radius: 0.8rem;
  margin-bottom: 0.8rem;
}

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
  gap: 1rem;
}

.card__data {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: linear-gradient(-45deg, #79b1e4, #f9fbfd);
  padding: 1rem;
  border-radius: 1rem;
}

.card__city {
  font-size: 2.4rem;
  font-weight: 300;
  margin-bottom: 2rem;
  text-transform: capitalize;
}

.card__temp {
  font-size: 1.6rem;
  font-weight: 500;
  text-transform: capitalize;
}

.card__weather {
  font-size: 1rem;
}

.card__image {
  padding: 1rem;
  background: var(--color-light-gray);
  border-radius: 50%;
  box-shadow: inset 0 0.4rem 0.4rem rgba(0, 0, 0, 0.25);
}

@media (max-width: 1280px) {
  .card {
    margin: 0 0.4rem 0.8rem;
  }
}

@media (max-width: 640px) {
  .card {
    padding: 0.8rem;
  }

  .card__header {
    flex-direction: column-reverse;
    align-items: flex-end;
    gap: 0.4rem;
  }

  .card__data {
    flex-direction: column;
    gap: 2rem;
  }

  .card__city {
    font-size: 2rem;
  }

  .card__temp {
    font-size: 1.2rem;
  }

}
</style>