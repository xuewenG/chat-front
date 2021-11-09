<template>
  <div class="container">
    <op-bar />
    <div class="top-container">注册完成</div>
    <div class="bottom-container">
      <div class="account-tips">申请成功，获得账号：</div>
      <div class="account-and-copy" @click="handleCopy">
        <div class="account">{{ account }}</div>
        <div class="copy">点击复制</div>
      </div>
      <div class="email-tips">
        该账号绑定的邮箱为：{{ email }}，你可以使用账号或邮箱进行登录
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { EVENT_TYPE } from '@common/event/eventType'
import OpBar from '@render/components/opBar.vue'

export default defineComponent({
  name: 'Home',
  components: {
    OpBar,
  },
  setup () {
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
