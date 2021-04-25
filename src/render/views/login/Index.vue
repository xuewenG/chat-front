<template>
  <div
    class="container"
    @dragstart.prevent
    @dragend.prevent
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
  >
    <div class="op-bar">
      <img class="op-item mini" src="../../assets/mini.svg" alt="最小化" />
      <img class="op-item close" src="../../assets/close.svg" alt="关闭" />
    </div>
    <div class="top-container">
      <img class="avatar" src="https://source.unsplash.com/random" alt="头像" />
    </div>
    <div class="bottom-container">
      <input class="info-input" id="account" type="text" />
      <input class="info-input" id="password" type="password" />
      <div class="select-container">
        <div class="select-item">
          <input id="auto-login" type="checkbox" />
          <label class="info-label" for="auto-login">自动登录</label>
        </div>
        <div class="select-item">
          <input id="remember-password" type="checkbox" />
          <label class="info-label" for="remember-password">记住密码</label>
        </div>
        <div class="select-item">
          <div>找回密码</div>
        </div>
      </div>
      <button class="login">登录</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMoveWindow } from '@render/event/moveWindow'

export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    return {
      ...useMoveWindow(),
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
    background: green;
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
    .info-input {
      width: 100%;
      height: 28px;
      box-sizing: border-box;
      padding: 0 20px;
      margin-bottom: 10px;
      display: inline-block;
      transition: 0.2s;
      background-size: 16px;
      background-repeat: no-repeat;
      background-position: 0 center;
      border: none;
      outline: none;
      border-bottom: 1px solid rgba(229, 229, 229, 1);
      &:hover {
        border-bottom: 1px solid rgba(193, 193, 193, 1);
      }
      &:focus {
        border-bottom: 1px solid rgba(18, 183, 245, 1);
      }
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
    .select-container {
      width: 100%;
      margin-bottom: 16px;
      color: gray;
      display: flex;
      justify-content: space-between;
      .select-item {
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
  }
}
</style>
