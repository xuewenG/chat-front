<template>
  <div
    class="friend-item-container"
    :class="[{ activeChat: active }, { unactiveChat: !active }, 'friendItem']"
    @click="changeChat"
  >
    <div class="left-container">
      <img class="avatar" :src="friend.avatar" @click="showProfile" />
    </div>
    <div class="right-container">
      <div class="top-container">
        <div class="nickname">{{ friend.nickname }}</div>
        <div class="time">11:35</div>
      </div>
      <div class="bottom-container">
        <div class="last-message">{{ lastMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'FriendItem',
  props: ['friend'],
  setup() {
    console.log('friedn item setup')
    const lastMessage = ref('你写了多少行代码？')
    return {
      lastMessage,
    }
  },
})
</script>

<style lang="less" scoped>
.friend-item-container {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: rgba(219, 217, 217, 1);
  }
  &.avtive {
    background-color: rgba(195, 195, 197, 1);
  }
  .left-container {
    margin-left: 12px;
    .avatar {
      display: inline-block;
      width: 38px;
      height: 38px;
      border-radius: 50%;
    }
  }
  .right-container {
    flex: 1;
    margin-left: 8px;
    margin-right: 12px;
    .top-container {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      .nickname {
        font-size: 16px;
      }
      .time {
        font-size: 12px;
        line-height: 16px;
      }
    }
    .bottom-container {
      .last-message {
        color: rgba(112, 112, 112, 1);
        font-size: 12px;
        line-height: 16px;
      }
    }
  }
}
</style>
