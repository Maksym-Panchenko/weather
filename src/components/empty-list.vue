<template>
  <div class="empty-block">
    {{ tr('noItemsInList') }}
  </div>
</template>

<script>
import tr from '@/services/lang';

export default {
  data() {
    return {
      tr
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
