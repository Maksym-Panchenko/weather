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
    padding: 2rem;
    margin: 0 0.4rem 0.8rem;
    width: 100%;

    background-color: var(--color-bg-card);
    color: var(--color-text);
    border-radius: 0.8rem;
    box-shadow: var(--item-shadow);
    font-size: 1.2rem;
  }
</style>
