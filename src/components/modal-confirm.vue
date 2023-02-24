<template>
  <div class="modal" v-if="isActive">
    <div class="modal-content">
      <p>{{ message }}</p>
      <div class="modal-buttons">
        <button class="button" @click="$emit('closeModal')">{{ lang['modalButtonCancel'][$store.state.lang] }}</button>
        <button class="button" @click="messageOptions.confirm()">{{ lang['modalButtonAgree'][$store.state.lang] }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import lang from '@/services/lang';

export default {
  props: {
    isActive: Boolean,
    messageOptions: Object
  },
  data() {
    return {
      lang
    };
  },
  computed: {
    message() {
      return this.messageOptions.message ? this.lang[this.messageOptions.message][this.$store.state.lang] : '';
    }
  },
}
</script>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

.modal-content {
  width: 30rem;
  max-width: 90%;
  padding: 2rem 4rem;
  background-color: #fff;
  border-radius: 5px;
  font-size: 1.2rem;
  text-align: center;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
}
</style>