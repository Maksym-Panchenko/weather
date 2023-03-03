import store from '@/store/store'

export default function tr(value) {
  const lang = store.state.lang;
  return translates?.[value]?.[lang] || '-';
}

const translates = {
  empty: { 'en': '', 'ua': '' },
  lang: { 'en': 'en', 'ua': 'юа' },
  noItemsInList: { 'en': 'There are no cities in this list yet', 'ua': 'У цьому списку поки що немає міст' },
  enterCityName: { 'en': 'Enter city name', 'ua': 'Введіть назву міста' },

  temp: { 'en': 'temperature', 'ua': 'температура' },
  tabSearch: { 'en': 'Search', 'ua': 'Пошук' },
  tabFavorite: { 'en': 'Favorite', 'ua': 'Обране' },

  buttonToday: { 'en': 'Today', 'ua': 'Сьогодні' },
  button24Hours: { 'en': '24 hours', 'ua': 'Доба' },
  button5Days: { 'en': '5 days', 'ua': '5 днів' },

  altRemoveFromFavorite: { 'en': 'Remove from favorites', 'ua': '5 днів' },
  altAddToFavorite: { 'en': 'Add to favorites', 'ua': '5 днів' },
  altWeather: { 'en': 'Weather', 'ua': '5 днів' },
  altRemove: { 'en': 'Remove', 'ua': '5 днів' },
  altToLight: { 'en': 'To light theme', 'ua': '5 днів' },
  altToDark: { 'en': 'To dark theme', 'ua': '5 днів' },

  modalButtonCancel: { 'en': 'Cancel', 'ua': 'Відміна' },
  modalButtonAgree: { 'en': 'Ok', 'ua': 'Так' },
  modalMessageDeleteCity: { 'en': 'Remove the city?', 'ua': 'Видалити місто?' },
  modalMessageDeleteFavoriteCity: { 'en': 'Remove the favorite city?', 'ua': 'Видалити обране місто?' },

  snackbarSuccessRemoveCity: { 'en': 'The city is removed from the favorites', 'ua': 'Місто видалене з обраних' },
  snackbarSuccessAddCity: { 'en': 'The city is added to favorites', 'ua': 'Місто додано до обраного' },
  snackbarErrorAddCity: { 'en': 'The favorite list can contain no more than 5 cities', 'ua': 'Список обраних може вміщувати не більше 5 міст' },
  snackbarErrorAddCityToSelected: { 'en': 'The list can contain no more than 5 cities', 'ua': 'Список може вміщувати не більше 5 міст' },
}