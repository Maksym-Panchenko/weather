<template>
  <header class="header">
    <div class="header__content content">
      <button @click="$store.commit('changeMode')" class="button button_icon button_flat button_small header__mode-button">
        <img v-if="$store.state.darkMode" src="@/assets/img/moon.svg" alt="To Light" class="header__icon">
        <img v-else src="@/assets/img/sun.svg" alt="To Dark" class="header__icon">
      </button>

      <a class="header__link" href="#">
        <img src="@/assets/img/logo.svg" alt="Logo Open Weather" class="header__logo">
      </a>

      <button @click="$store.dispatch('changeLang')" class="button button_icon button_flat button_small header__lang-button">
        {{ lang['lang'][$store.state.lang] }}
      </button>
    </div>
  </header>
</template>

<script>
import lang from '@/services/lang'

export default {
  data() {
    return {
      lang
    }
  },
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  padding: 12px;
  box-shadow: var(--header-shadow);
  z-index: 2;
  background-color: var(--color-primary);
}

.header__content {
  position: relative;
  display: flex;
  justify-content: center;
}

.header__lang-button,
.header__mode-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 1rem;
}

.header__mode-button {
  right: auto;
  left: 1rem;
}

.header__logo {
  filter: drop-shadow(2px 2px 1px rgba(255,255,255,0.35));
}
</style>