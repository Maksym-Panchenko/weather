<template>
  <div class="empty-block">
    {{ list['noItemsInList'][$store.state.lang] }}
  </div>
</template>

<script>
import list from '@/services/lang';

export default {
  data() {
    return {
      list
    }
  }
}
</script>

<style scoped>
  .empty-block {
    display: flex;
    justify-content: center;
    margin-bottom: 0.8rem;
    padding: 2rem;

    background-color: var(--color-white);
    border-radius: 0.8rem;
    box-shadow: var(--item-shadow);
    font-size: 1.2rem;
  }
</style>
