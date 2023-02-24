<template>
  <div id="app">
    <CustomLoader />
    <MainHeader />
    <MainContent />
    <CustomSnackbar />
  </div>
</template>

<script>
import MainHeader from "@/layouts/main-header";
import MainContent from "@/layouts/main-content";
import CustomSnackbar from "@/components/custom-snackbar";
import CustomLoader from "@/components/custom-loader";
export default {
  name: 'App',
  components: {CustomLoader, CustomSnackbar, MainHeader, MainContent},
}
</script>
