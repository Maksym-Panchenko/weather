import store from '@/store/store';

const apiKey = '62eed23c7dfe6e14e59e69936aea7330';
// const apiKey0 = 'd982b206b7125a363d94918d08ebf560'; // temp
const units = 'metric';

export  function getInfoByCity(city, country) {
  const lang = store.state.lang;
  const cityName = `${city},${country}`
  const urlNow = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&lang=${lang}&units=${units}`;
  const urlDay = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&lang=${lang}&units=${units}`;

  return Promise.all( [getCurrentInfo(urlNow), getDayInfo(urlDay)]);
}

export function getInfoByCoordinates(lat, lon) {
  const lang = store.state.lang;
  const url = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=${lang}&units=${units}`;
  return getCurrentInfo(url);
}

function getCurrentInfo(url) {
  return fetch (url)
    .then(resp => resp.json())
    .then(res => ({
        city: res.name,
        country: res.sys.country,
        temp: Math.round(res.main.temp),
        weather: res.weather[0].description,
        weatherIcon: res.weather[0].icon,
      })
    );
}

function getDayInfo(url) {
  return fetch (url)
    .then(resp => resp.json())
    .then(res =>
      res.list
        .map(e => ({
          value: e.main.temp,
          label: new Date(+(e.dt + '100'))}))
      );
}

export async function searchCities(value) {
  const url = `https://api.openweathermap.org/data/2.5/find?q=${value}&type=like&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.list.map(city => ({ cityName: city.name, countryName: city.sys.country }));
}

export function showPosition(position) {
  const lang = store.state.lang;
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=${lang}&units=${units}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then(res => {
      store.dispatch('addCityToSearched', {
        city: res.name,
        country: res.sys.country
      });
    })
    .catch((error) => {
      console.log("Error fetching weather data: ", error);
    });
}