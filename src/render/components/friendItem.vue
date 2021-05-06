<template>
  <div class="friend-item-container" :class="{ active }" @click="changeChat">
    <div class="left-container">
      <img class="avatar" :src="friend.avatar" @click="showProfile" />
    </div>
    <div class="right-container">
      <div class="top-container">
        <div class="nickname">{{ friend.nickname }}</div>
        <div class="time">{{ timeStr }}</div>
      </div>
      <div class="bottom-container">
        <div class="last-message">{{ messageContent }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Message } from '@render/entity/message'
import { User } from '@render/entity/user'
import { useStore } from '@render/store'
import { computed, defineComponent, PropType, ref, toRefs } from 'vue'
import moment from 'moment'
export default defineComponent({
  name: 'FriendItem',
  props: {
    friend: {
      type: Object as PropType<User>,
      default: () => ({}),
    },
    active: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props) {
    const { friend } = toRefs(props)
    const store = useStore()
    const currentMessageList = computed(
      () =>
        store.state.friendMessageList.find(
          friendMessage => friendMessage.friendId === friend.value.id,
        )?.messageList || [],
    )
    const lastMessage = computed(
      () =>
        currentMessageList.value[currentMessageList.value.length - 1] ||
        ({} as Message),
    )
    const messageContent = computed(() => lastMessage.value.content)
    const timeStr = computed(() =>
      lastMessage.value.time
        ? moment(lastMessage.value.time).format('HH:mm')
        : '',
    )
    const changeChat = () => {
      store.dispatch('SET_CURRENT_CHAT_ID', friend.value.id)
    }
    return {
      messageContent,
      timeStr,
      changeChat,
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
  &.active {
    background-color: rgba(199, 198, 197, 1);
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
