<template>
  <div class="card">
    <CardHeader
        @updateCity="updateCity"
        @removeCity="$emit('removeCity')"
        @removeFavoriteCity="$emit('removeFavoriteCity')"
        :mode="mode"
        :card="currentCard"
    />

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

    <div class="card__button-group">
      <custom-radio
          v-for="(option, index) in options"
          :key="index"
          :value="option.value"
          :label="option.caption"
          v-model="selectedOption"
      />
    </div>

    <div class="card__graph">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import lang from '@/services/lang';
import {getInfoByCity} from "@/services/weather";
import { Chart, LineElement, PointElement, LineController, CategoryScale, LinearScale } from 'chart.js';
import CustomRadio from "@/components/custom-radio";
import CardHeader from "@/components/weather-card/card-header";
import Vue from "vue";
import {eventBus} from "@/services/event-bus";

Chart.register(LineElement, PointElement, LineController, CategoryScale, LinearScale);

export default {
  components: {CustomRadio, CardHeader},
  props: {
    /**
     * -- card has fields
     * city {string}
     * country {string}
     * temp {number}
     * weather {string} - may has diff lang
     * weatherIcon {string} - name img file without extension
     * graph { [{label: Date, value: float}] }
     */
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
      options: [ { value: 'day', caption: 'Today'}, { value: 'full_day', caption: '24 hours'}, { value: 'week', caption: '5 day'} ],
      selectedOption: 'full_day',

      chartData: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: '#fff',
          borderColor: '#6fbad3',
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

  },
  watch: {
    selectedOption() {
      this.updateGraphData()
      this.chart.update();
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
        this.updateGraphData();

        this.chart.update();
        this.$store.commit('endLoad');
      })
    },

    updateGraphData() {
      let selectedTimes = []

      if (this.currentCard.graph.length) {
        switch (this.selectedOption) {
          case 'day':
            selectedTimes = this.currentCard.graph.filter(e => e.label.toDateString() === new Date().toDateString());
            break;

          case 'full_day':
            selectedTimes = this.currentCard.graph.filter((e, i) => i < 8);
            break;

          case 'week':
            selectedTimes = [...this.currentCard.graph];
        }
      }

      let values = [];
      let timeCaptions = [];
      for (let item of selectedTimes) {
        values.push(Math.round(item.value));
        timeCaptions.push(item.label.getHours() + ':00');
      }

      this.chartData.datasets[0].data = [...values];
      this.chartData.labels = [...timeCaptions];
      // dark / light
      this.chartData.datasets[0].backgroundColor = getComputedStyle(this.$el).getPropertyValue('--color-primary');
      this.chartData.datasets[0].borderColor = getComputedStyle(this.$el).getPropertyValue('--color-primary');
      console.log(getComputedStyle(this.$el).getPropertyValue('--color-primary'))
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


    this.updateGraphData();
    this.renderChart();

    const vm = new Vue();
    vm.$on('updateCardGraphColor', () => {
      this.updateGraphData()
    });

    eventBus.$on('updateCardGraphColor', () => {
      // Here we wait for the browser to update the value of the CSS variable
      Vue.nextTick(() => {
        this.updateGraphData();
        this.chart.update();
      })
    });
  },
}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  width: calc(50% - 1rem);
  gap: 0.8rem;
  background-color: var(--color-bg-card);
  box-shadow: var(--item-shadow);
  padding: 2rem;
  border-radius: 0.8rem;
  margin-bottom: 0.8rem;
}

.card__data {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: linear-gradient(-45deg, var(--color-light-blue), var(--color-extra-light-blue));
  padding: 1rem;
  border-radius: 1rem;
  color: var(--color-text);
}

.dark-mode .card__data {
  background-image: linear-gradient(-45deg, var(--color-dark-orange), var(--color-orange));

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
  background: var(--color-semi-white);
  border-radius: 50%;
  box-shadow: inset 0 0.4rem 0.4rem rgba(0, 0, 0, 0.25);
}

.card__button-group {
  display: flex;
  justify-content: center;
  gap: 0.4rem;
}

@media (max-width: 1280px) {
  .card {
    margin: 0 0.4rem 0.8rem;
    width: 100%;
  }
}

@media (max-width: 640px) {
  .card {
    padding: 0.8rem;
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

@media (max-width: 480px) {
  .card__button-group {
    flex-direction: column;
  }
}
</style>