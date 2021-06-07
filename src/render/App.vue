<template>
  <router-view />
  <div class="cover" v-if="showShareScreenPopup"></div>
  <div class="invite-container" v-if="showShareScreenPopup">
    <div class="title">屏幕共享</div>
    <div class="content">对方邀请你观看他的屏幕，是否接受？</div>
    <div class="button-container">
      <div class="button-item confirm" @click="confirmHandler">接受</div>
      <div class="button-item refused" @click="refuseHandler">拒绝</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Message } from '@common/entity/message'
import { EVENT_TYPE } from '@common/event/eventType'
import { defineComponent, ref } from 'vue'
import { useStore } from './store'

export default defineComponent({
  setup () {
    const store = useStore()
    const showShareScreenPopup = ref(false)
    ipcRenderer.on(
      EVENT_TYPE.RECEIVE_TEXT_MESSAGE,
      (event: Event, message: Message | undefined) => {
        store.dispatch('ADD_TEXT_MESSAGE', message)
      },
    )
    ipcRenderer.on(EVENT_TYPE.RECEIVE_SCREEN_SHARE, () => {
      showShareScreenPopup.value = true
    })
    const confirmHandler = () => {
      showShareScreenPopup.value = false
      ipcRenderer.send(EVENT_TYPE.OPEN_SCREEN_SHARE_WINDOW)
    }
    const refuseHandler = () => {
      showShareScreenPopup.value = false
    }
    return {
      showShareScreenPopup,
      confirmHandler,
      refuseHandler,
    }
  },
})
</script>

<style lang="less">
.cover {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: rgba(100, 100, 100, 0.2);
  top: 0;
  left: 0;
}
.invite-container {
  width: 350px;
  margin: 0 auto;
  padding: 12px;
  background: white;
  position: fixed;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 6px;
  .title {
    font-size: 22px;
  }
  .content {
    margin-top: 18px;
    font-size: 18px;
  }
  .button-container {
    margin-top: 18px;
    display: flex;
    justify-content: flex-end;
    .button-item {
      margin-left: 12px;
      padding: 4px 8px;
      font-size: 16px;
      border-radius: 6px;
      color: white;
    }
    .confirm {
      background: rgba(26, 173, 25, 1);
    }
    .refused {
      background: red;
    }
  }
}
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
