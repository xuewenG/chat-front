<template>
  <input
    class="input-tag"
    :class="{ 'input-tag-error': !validInput }"
    :placeholder="placeHolder"
    :value="modelValue"
    :type="type"
    @input="handleInput"
    @change="handleChange"
  />
</template>

<script lang="ts">
import { defineComponent, nextTick, toRefs } from 'vue'

export default defineComponent({
  name: 'mInput',
  props: {
    type: String,
    modelValue: String,
    validInput: {
      type: Boolean,
      default: true,
    },
    placeHolder: String,
    inputHandler: {
      type: Function,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
    },
    changeHandler: {
      type: Function,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
    },
  },
  setup(props, context) {
    const propsRefs = toRefs(props)
    const { inputHandler, changeHandler } = propsRefs
    const handleInput = (event: InputEvent) => {
      const target: HTMLInputElement = event.target as HTMLInputElement
      context.emit('update:modelValue', target.value)
      nextTick(() => {
        if (typeof inputHandler.value === 'function') {
          inputHandler.value(event)
        }
      })
    }
    const handleChange = (event: Event) => {
      if (typeof changeHandler.value === 'function') {
        changeHandler.value(event)
      }
    }
    return {
      handleInput,
      handleChange,
    }
  },
})
</script>

<style scoped lang="less">
.input-tag {
  padding: 0;
  border: none;
  outline: none;
  border-bottom: 1px solid rgba(229, 229, 229, 1);
  &:first-child {
    margin-top: 18px;
  }
  &:hover {
    border-bottom: 1px solid rgba(193, 193, 193, 1);
  }
  &:focus {
    border-bottom: 1px solid rgba(18, 183, 245, 1);
  }
}
.input-tag-error {
  border-bottom: 1px solid rgba(255, 0, 0, 1);
  &:hover {
    border-bottom: 1px solid rgba(255, 0, 0, 1);
  }
  &:focus {
    border-bottom: 1px solid rgba(255, 0, 0, 1);
  }
}
</style>
