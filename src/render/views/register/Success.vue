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
        src="../../assets/mini.svg"
        alt="最小化"
        @click="handleHideWindow"
      />
      <img
        class="op-item close"
        src="../../assets/close.svg"
        alt="关闭"
        @click="handleCloseWindow"
      />
    </div>
    <div class="top-container">注册完成</div>
    <div class="bottom-container">
      <div class="account-tips">申请成功，获得账号：</div>
      <div class="account-and-copy" @click="handleCopy">
        <div class="account">{{ account }}</div>
        <div class="copy">点击复制</div>
      </div>
      <div class="email-tips">
        该账号绑定的邮箱为：{{ email }}，你可以使用账号或邮箱进行登录。
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  useCloseWindow,
  useHideWindow,
  useMoveWindow,
} from '@render/event/window'
import { EVENT_TYPE } from '@common/event/eventType'

export default defineComponent({
  name: 'Home',
  setup() {
    const route = useRoute()
    const account = ref('---')
    const accountParam = route.params.account
    if (typeof accountParam === 'string') {
      account.value = accountParam
    }
    const email = ref('---')
    const emailParam = route.params.email
    if (typeof emailParam === 'string') {
      email.value = emailParam
    }
    const handleCopy = () => {
      ipcRenderer.send(EVENT_TYPE.COPY_TEXT, {
        text: account.value,
      })
    }
    return {
      account,
      email,
      ...useMoveWindow(),
      ...useCloseWindow(),
      ...useHideWindow(),
      handleCopy,
    }
  },
})
</script>

<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
  user-select: none;
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
      display: none;
      &:hover {
        background: rgba(255, 255, 255, 0.25);
      }
    }
    .close {
      &:hover {
        background: rgba(255, 0, 0, 0.8);
      }
    }
  }
  .top-container {
    width: 100vw;
    height: 100px;
    box-sizing: border-box;
    padding-left: 30px;
    background-color: pink;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: white;
    font-size: 30px;
    font-family: 'Microsoft YaHei';
  }
  .bottom-container {
    width: 100vw;
    box-sizing: border-box;
    padding: 22px;
    .account-tips {
      font-size: 22px;
      margin-bottom: 28px;
    }
    .account-and-copy {
      display: flex;
      align-items: baseline;
      justify-content: center;
      margin-bottom: 28px;
      cursor: pointer;
      .account {
        font-size: 32px;
        text-align: center;
        color: green;
        margin-right: 6px;
      }
      .copy {
        font-size: 14px;
      }
    }
    .other-tips {
      font-size: 18px;
    }
  }
}
</style>
