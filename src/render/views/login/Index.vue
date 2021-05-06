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
    <div class="top-container">
      <img class="avatar" src="https://source.unsplash.com/random" alt="头像" />
    </div>
    <div class="bottom-container">
      <m-input
        class="input-text"
        id="account"
        type="text"
        v-model="credential"
      />
      <m-input
        class="input-text"
        id="password"
        type="password"
        v-model="password"
      />
      <div class="option-container">
        <div class="option-item">
          <input id="auto-login" type="checkbox" />
          <label for="auto-login">自动登录</label>
        </div>
        <div class="option-item">
          <input
            id="remember-password"
            type="checkbox"
            v-model="rememberPassword"
          />
          <label for="remember-password">记住密码</label>
        </div>
        <div class="option-item">
          <div>找回密码</div>
        </div>
      </div>
      <button class="login" @click="handleLogin">登录</button>
      <div class="register" @click="handleOpenRegister">注册账号</div>
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
import { EVENT_TYPE } from '@common/event/eventType'
import mInput from '@render/components/mInput.vue'
import { useLogin } from './useLogin'
import { useStore } from '@render/store'

export default defineComponent({
  name: 'Home',
  components: {
    mInput,
  },
  setup() {
    const store = useStore()
    const handleOpenRegister = () => {
      ipcRenderer.send(EVENT_TYPE.OPEN_REGISTER_WINDOW)
    }
    return {
      ...useMoveWindow(),
      ...useCloseWindow(),
      ...useHideWindow(),
      ...useLogin(store),
      handleOpenRegister,
    }
  },
})
</script>

<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
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
    height: 40vh;
    position: relative;
    background: pink;
    display: flex;
    justify-content: center;
    .avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      position: absolute;
      bottom: -32px;
    }
  }
  .bottom-container {
    width: 238px;
    height: 60vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    .input-text {
      width: 100%;
      height: 28px;
      box-sizing: border-box;
      padding: 0 20px;
      margin-bottom: 10px;
      background-size: 16px;
      background-repeat: no-repeat;
      background-position: 0 center;
    }
    #account {
      background-image: url('../../assets/account.svg');
      &:focus {
        background-image: url('../../assets/account-focus.svg');
      }
    }
    #password {
      background-image: url('../../assets/lock.svg');
      &:focus {
        background-image: url('../../assets/lock-focus.svg');
      }
    }
    .option-container {
      width: 100%;
      margin-bottom: 16px;
      color: gray;
      display: flex;
      justify-content: space-between;
      .option-item {
        font-size: 12px;
        display: flex;
      }
    }
    .login {
      width: 100%;
      height: 36px;
      margin-bottom: 18px;
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
    .register {
      margin: 0 0 10px 10px;
      position: fixed;
      bottom: 0;
      left: 0;
      color: gray;
      font-size: 12px;
      cursor: pointer;
    }
  }
}
</style>
