<template>
  <div class="loader-container" v-if="$store.state.isLoading">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.loader-container {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  z-index: 3;
  background: rgba(0,0,0,0.2);
  backdrop-filter: blur(2px);
}

.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>