<template>
  <label class="button" :class="{'button_active': isChecked}">
    <input class="radio__input" type="radio" :value="value" :checked="isChecked" @change="handleChange">
    {{ label }}
  </label>
</template>

<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'input'
  },
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      default: ''
    }
  },
  computed: {
    isChecked() {
      return this.value === this.modelValue
    }
  },
  methods: {
    handleChange() {
      this.$emit('input', this.value);
    }
  }
}
</script>

<style scoped>
  .radio__input {
    opacity: 0;
    position: absolute;
  }
</style>
