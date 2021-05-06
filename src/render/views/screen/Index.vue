<template>
  <div
    class="container"
    @dragstart.prevent
    @dragend.prevent
    @mousedown="handleStartMoveWindow"
    @mouseup="handleStopMoveWindow"
  >
    <div class="op-bar">
      <img
        class="op-item mini"
        src="../../assets/mini-gray.svg"
        alt="最小化"
        @click="handleHideWindow"
      />
      <img
        class="op-item close"
        src="../../assets/close-gray.svg"
        alt="关闭"
        @click="handleCloseWindow"
      />
    </div>
    <video />
  </div>
</template>

<script lang="ts">
import {
  useCloseWindow,
  useHideWindow,
  useMoveWindow,
} from '@render/event/window'
import { getScreenStream, setStreamToVideo } from '@render/util/capture'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Screen',
  setup() {
    getScreenStream().then(stream => {
      if (!stream) {
        return
      }
      setStreamToVideo('video', stream)
    })
    return {
      ...useMoveWindow(),
      ...useCloseWindow(),
      ...useHideWindow(),
    }
  },
})
</script>

<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  .op-bar {
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    z-index: 10;
    .op-item {
      width: 32px;
      height: 32px;
      transition: 0.2s;
    }
    .mini {
      &:hover {
        background: rgba(150, 150, 150, 0.25);
      }
    }
    .close {
      &:hover {
        background: rgba(255, 0, 0, 0.8);
      }
    }
  }
  video {
    width: 100vw;
    height: 100vh;
  }
}
</style>
