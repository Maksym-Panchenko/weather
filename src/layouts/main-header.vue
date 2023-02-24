<template>
  <header class="header">
    <div class="header__content content">
      <a class="header__link" href="#">
        <img src="@/assets/img/logo.svg" alt="Logo Open Weather" class="header__logo">
      </a>

      <button @click="$store.dispatch('changeLang')" class="button button_icon button_flat button_small">{{ lang['lang'][$store.state.lang] }}</button>
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
}

.header__content {
  position: relative;
  display: flex;
  justify-content: center;
}

.button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 1rem;
}
</style>