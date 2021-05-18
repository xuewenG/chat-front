<template>
  <div class="container">
    <op-bar />
    <div class="top-container">查看个人资料</div>
    <div class="bottom-container">
      <div class="avatar-container">
        <img class="avatar" :src="currentUser.avatar" alt="用户头像" />
        <button class="upload">上传头像</button>
      </div>
      <m-input
        class="input-comp"
        id="account"
        :place-holder="currentUser.account"
        type="text"
        disabled
      />
      <m-input
        class="input-comp"
        id="nickname"
        :place-holder="currentUser.nickname"
        type="text"
        v-model="nickname"
        :changeHandler="handleNicknameChange"
        :validInput="validMap.nickname.value"
      />
      <m-input
        class="input-comp"
        id="email"
        :place-holder="currentUser.email"
        type="email"
        v-model="email"
        :changeHandler="handleEmailChange"
        :validInput="validMap.email.value"
      />
      <m-input
        class="input-comp"
        id="password"
        place-holder="新密码"
        type="password"
        v-model="password"
        :changeHandler="handlePasswordChange"
        :validInput="validMap.password.value"
      />
      <m-input
        class="input-comp"
        id="password-confirmed"
        place-holder="确认密码"
        type="password"
        v-model="passwordConfirmed"
        :changeHandler="handlePasswordChange"
        :validInput="validMap.passwordConfirmed.value"
      />
      <div class="verify-code-container">
        <m-input
          class="input-comp"
          id="verify-code"
          place-holder="验证码"
          type="text"
          v-model="verifyCode"
          :inputHandler="handleVerifyCodeInput"
          :validInput="validMap.verifyCode.value"
        />
        <div class="get-verify-code" @click="handleGetVerifyCode">
          {{ getVerifyCodeCount || '获取验证码' }}
        </div>
      </div>
      <button class="register" @click="handleRegister">修改资料</button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import mInput from '@render/components/mInput.vue'
import OpBar from '@render/components/opBar.vue'
import { useEditProfile } from './useEditProfile'
import { useStore } from '@render/store'

export default defineComponent({
  name: 'Home',
  components: {
    mInput,
    OpBar,
  },
  setup() {
    const store = useStore()
    const currentUser = computed(() => store.state.currentUser)
    return {
      currentUser,
      ...useEditProfile(),
    }
  },
})
</script>

<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
  user-select: none;
  .top-container {
    width: 100vw;
    height: 80px;
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
    .avatar-container {
      margin: 8px 0;
      display: flex;
      align-items: baseline;
      .avatar {
        width: 82px;
        height: 82px;
        display: inline-block;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(205, 205, 205, 0.5);
      }
      & > .upload {
        width: 64px;
        height: 22px;
        margin-left: 8px;
        padding: 0;
        font-size: 12px;
        color: white;
        border: none;
        outline: none;
        border-radius: 4px;
        background: rgba(5, 186, 251, 1);
        transition: 0.2s;
        &:hover {
          background: rgba(31, 199, 253, 1);
        }
      }
    }
    .input-comp {
      width: 300px;
      height: 38px;
    }
    .verify-code-container {
      width: 300px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .input-comp {
        width: 200px;
        margin-top: 0;
      }
    }
    .register {
      width: 200px;
      height: 36px;
      margin-top: 12px;
      padding: 0;
      color: white;
      border: none;
      outline: none;
      border-radius: 4px;
      background: rgba(5, 186, 251, 1);
      transition: 0.2s;
      &:hover {
        background: rgba(31, 199, 253, 1);
      }
    }
  }
}
</style>
