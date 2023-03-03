<template>
  <div
      class="snackbar"
      :class="{
        snackbar_success: statusSnackbar === 'success',
        snackbar_error: statusSnackbar === 'error',
        snackbar_visible: showSnackbar === true
      }"
  >
    <div class="snackbar__text">{{ lang[textSnackbar][$store.state.lang] }}</div>

    <button class="snackbar__button">
      <img @click="$store.commit('hideSnackbar')" class="snackbar__image" src="@/assets/img/close.svg" alt="Weather">
    </button>
  </div>
</template>

<script>
import {mapState} from "vuex";
import lang from "@/services/lang";

export default {
  data() {
    return {
      lang
    }
  },
  computed: {
    ...mapState(['showSnackbar', 'textSnackbar', 'statusSnackbar'])
  }
}
</script>

<style scoped>
 .snackbar {
   position: fixed;
   display: flex;
   justify-content: space-between;
   align-items: center;
   gap: 2rem;
   width: 30rem;
   max-width: calc(100% - 4rem);
   bottom: -14rem;
   left: 50%;
   transform: translateX(-50%);
   padding: 1.6rem 2rem;

   border-radius: 0.8rem;
   box-shadow: var(--item-shadow);
   color: var(--color-white);
   font-size: 1.2rem;
   transition: bottom 0.3s;
 }

 .snackbar_visible {
   bottom: 2rem;
 }

 .snackbar_success {
   background-color: var(--color-primary);
 }

 .snackbar_error {
   background-color: var(--color-red);
 }

 .snackbar__button {
   flex: 2rem 0 0;
   height: 2rem;
   border: 0;
   border-radius: 50%;
   cursor: pointer;
   background: transparent;
 }
</style>