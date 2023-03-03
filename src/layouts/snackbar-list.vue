<template>
  <div class="list">
    <CustomSnackbar
        v-for="snackbar in $store.state.snackbars"
        :param="snackbar"
        :key="snackbar.id"
    />
  </div>
</template>

<script>
import CustomSnackbar from "@/components/custom-snackbar";

export default {
  components: {CustomSnackbar}
}
</script>

<style scoped>
  .list {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    left: 0;
    right: 0;
    bottom: 0;
    padding-bottom: 2rem;
    gap: 0.4rem;
  }
</style>
