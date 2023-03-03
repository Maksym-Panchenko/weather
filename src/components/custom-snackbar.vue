<template>
  <div
      class="snackbar"
      :class="{
        snackbar_success: param.status === 'success',
        snackbar_error: param.status === 'error',
        snackbar_hide: hidden,
      }"
  >
    <div class="snackbar__text">{{ lang[param.text][$store.state.lang] }}</div>

    <button class="snackbar__button">
      <img @click="closeSnackbar" class="snackbar__image" src="@/assets/img/close.svg" alt="Weather">
    </button>
  </div>
</template>

<script>
import {mapState} from "vuex";
import lang from "@/services/lang";

export default {
  props: {
    param: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      lang,
      hidden: false
    }
  },
  computed: {
    ...mapState(['showSnackbar', 'textSnackbar', 'statusSnackbar'])
  },
  methods: {
    closeSnackbar() {
      this.hidden = true;
      setTimeout(() => this.$store.commit('removeSnackbar', this.param.id), 300)
    }
  },
  mounted() {
    setTimeout(() => { this.closeSnackbar() }, 3000);
  }
}
</script>

<style scoped>
 .snackbar {
   display: flex;
   justify-content: space-between;
   align-items: center;
   gap: 2rem;
   width: 30rem;
   max-width: calc(100% - 4rem);
   padding: 1.6rem 2rem;

   border-radius: 0.8rem;
   box-shadow: var(--item-shadow);
   color: var(--color-white);
   font-size: 1.2rem;
   opacity: 1;
   transition: opacity 0.3s ease-out;
 }

 .snackbar_hide {
   opacity: 0;
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
