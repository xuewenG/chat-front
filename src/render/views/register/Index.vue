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
    <div class="top-container">欢迎注册 Chat</div>
    <div class="bottom-container">
      <input class="input-text" id="nickname" placeholder="昵称" type="text" />
      <input
        class="input-text"
        id="email"
        placeholder="电子邮箱"
        type="email"
      />
      <input
        class="input-text"
        id="password"
        placeholder="密码"
        type="password"
      />
      <input
        class="input-text"
        id="password-confirmed"
        placeholder="确认密码"
        type="password"
      />
      <div class="verify-code-container">
        <input
          class="input-text"
          id="verify-code"
          placeholder="验证码"
          type="text"
        />
        <div class="get-verify-code">获取验证码</div>
      </div>
      <button class="register" @click="handleRegister">立即注册</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  useCloseWindow,
  useHideWindow,
  useMoveWindow,
} from '@render/event/window'

export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    const handleRegister = () => {
      console.log('register')
    }
    return {
      ...useMoveWindow(),
      ...useCloseWindow(),
      ...useHideWindow(),
      handleRegister,
    }
  },
})
</script>

<style lang="less" scoped>
.container {
  width: 100vw;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .input-text {
      width: 300px;
      height: 30px;
      margin-bottom: 12px;
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
    .verify-code-container {
      width: 300px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .input-text {
        width: 200px;
        margin-top: 0;
      }
    }
    .register {
      width: 200px;
      height: 36px;
      margin-top: 6px;
      padding: 0;
      color: white;
      border: none;
      outline: none;
      border-radius: 4px;
      background: none;
      background: rgba(5, 186, 251, 1);
      transition: 0.2s;
      &:hover {
        background: rgba(31, 199, 253, 1);
      }
    }
  }
}
</style>
