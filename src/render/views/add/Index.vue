<template>
  <div class="container">
    <op-bar />
    <div class="top-container">添加好友</div>
    <div class="bottom-container">
      <m-input
        class="input-comp"
        id="credential"
        place-holder="输入好友账号或邮箱"
        type="text"
      />
      <button class="register">开始查找</button>
      <div class="search-result">
        <div
          class="friend-item"
          v-for="friend in searchResultFromServer"
          :key="friend.account"
        >
          <div class="left-container">
            <img class="avatar" :src="friend.avatar" alt="用户头像" />
            <div class="right-container">
              <div class="nickname">{{ friend.nickname }}</div>
              <div class="account">{{ friend.account }}</div>
              <div class="email">{{ friend.email }}</div>
            </div>
          </div>
          <div class="right-container">
            <button class="apply">请求好友</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import mInput from '@render/components/mInput.vue'
import OpBar from '@render/components/opBar.vue'

export default defineComponent({
  name: 'Home',
  components: {
    mInput,
    OpBar,
  },
  setup() {
    const searchResultFromServer = reactive([
      {
        avatar:
          'https://blog-xuewen-me.oss-cn-shanghai.aliyuncs.com/xuewen/chat/avatar2.jpeg',
        nickname: '小虎',
        account: '8236958210',
        email: 'xiaohu@xuewen.me',
      },
      {
        avatar:
          'https://blog-xuewen-me.oss-cn-shanghai.aliyuncs.com/xuewen/chat/avatar3.jpeg',
        nickname: '石头',
        account: '8236958211',
        email: 'shotou@xuewen.me',
      },
      {
        avatar:
          'https://blog-xuewen-me.oss-cn-shanghai.aliyuncs.com/xuewen/chat/avatar10.jpeg',
        nickname: '小芳',
        account: '8236958212',
        email: 'xiaofang@xuewen.me',
      },
    ])
    return {
      searchResultFromServer,
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
    .input-comp {
      width: 300px;
      height: 38px;
    }
    .search-result {
      width: 100vw;
      box-sizing: border-box;
      margin-top: 12px;
      padding: 0 12px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .friend-item {
        width: 100vw;
        margin-bottom: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left-container {
          display: flex;
          align-items: center;
          .avatar {
            width: 64px;
            height: 64px;
            flex: none;
            display: inline-block;
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(205, 205, 205, 0.5);
          }
          & > .right-container {
            margin-left: 12px;
            .nickname {
              font-size: 18px;
              font-weight: 700;
            }
          }
        }
        & > .right-container {
          .apply {
            width: 90px;
            height: 32px;
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
