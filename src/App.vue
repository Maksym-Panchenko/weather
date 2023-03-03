<template>
  <div id="app" :class="{ 'dark-mode': $store.state.darkMode }">
    <CustomLoader />
    <MainHeader />
    <MainContent />
    <SnackbarList />
  </div>
</template>

<script>
import MainHeader from "@/layouts/main-header";
import MainContent from "@/layouts/main-content";
import CustomLoader from "@/components/custom-loader";
import SnackbarList from "@/layouts/snackbar-list";
export default {
  name: 'App',
  components: {CustomLoader, SnackbarList, MainHeader, MainContent},
}
</script>

<style scoped>
  #app {
    background-color: var(--color-bg-main);
    min-height: 100vh;
  }
</style>
