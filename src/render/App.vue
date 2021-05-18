<template>
  <router-view />
</template>

<script lang="ts">
import { Message } from '@common/entity/message'
import { EVENT_TYPE } from '@common/event/eventType'
import { defineComponent } from 'vue'
import { useStore } from './store'

export default defineComponent({
  setup() {
    const store = useStore()
    ipcRenderer.on(
      EVENT_TYPE.RECEIVE_TEXT_MESSAGE,
      (event: Event, message: Message | undefined) => {
        store.dispatch('ADD_TEXT_MESSAGE', message)
      },
    )
  },
})
</script>

<style lang="less">
body {
  user-select: none;
}
::-webkit-scrollbar {
  width: 8px;
  height: 1px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #c0c4cc;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
  background: #ededed;
}
</style>
