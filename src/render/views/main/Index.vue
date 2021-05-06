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
    <div class="left-container">
      <search />
      <friend-flow />
    </div>
    <div class="right-container">
      <div class="message-flow">
        <div class="friend-info">小葛(7565952)</div>
        <message-flow />
      </div>
      <div class="message-editor">
        <message-editor />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  useCloseWindow,
  useHideWindow,
  useMoveWindow,
} from '@render/event/window'
import MessageEditor from '@render/components/messageEditor.vue'
import MessageFlow from '@render/components/messageFlow.vue'
import FriendFlow from '@render/components/friendFlow.vue'
import Search from '@render/components/search.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  components: {
    MessageEditor,
    MessageFlow,
    FriendFlow,
    Search,
  },
  setup() {
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
  .left-container {
    width: 25%;
    height: 100%;
    background-color: rgba(233, 232, 231, 1);
  }
  .right-container {
    width: 75%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 32px;
    background-color: rgba(245, 245, 245, 1);
    .message-flow {
      width: 100%;
      height: 75%;
      .friend-info {
        padding: 0 0 12px 18px;
        font-size: 22px;
        font-weight: 700;
        border-bottom: 1px solid rgba(231, 231, 231, 1);
      }
    }
    .message-editor {
      width: 100%;
      height: 25%;
      background-color: #ccc;
    }
  }
}
</style>
