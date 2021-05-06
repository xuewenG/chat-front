<template>
  <div class="message-item-container">
    <div v-if="timeStr" class="time-container">
      <div class="time">
        {{ timeStr }}
      </div>
    </div>
    <div class="message-container" :class="{ 'friend-message': !myMessage }">
      <img
        :src="myMessage ? currentUser.avatar : currentChatFriend.avatar"
        class="avatar"
      />
      <div class="content">{{ message.content }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue'
import moment from 'moment'
import { useStore } from '@render/store'
import { Message } from '@render/entity/message'

export default defineComponent({
  name: 'MessageItem',
  props: {
    message: {
      type: Object as PropType<Partial<Message>>,
      default: () => {
        const message: Partial<Message> = {
          fromId: -1,
          toId: -1,
          content: 'default content',
          time: new Date(),
        }
        return message
      },
    },
  },
  setup(props) {
    const store = useStore()
    const { message } = toRefs(props)
    const currentUser = computed(() => store.state.currentUser)
    const myMessage = computed(
      () => message.value.fromId === currentUser.value.id,
    )
    const timeStr = computed(() =>
      message.value.time
        ? moment(message.value.time).format('YYYY-MM-DD HH:mm:ss')
        : '',
    )
    const friendList = computed(() => store.state.friendList)
    const currentChatId = computed(() => store.state.currentChatId)
    const currentChatFriend = computed(
      () =>
        friendList.value.find(current => current.id === currentChatId.value) ||
        {},
    )
    return {
      currentChatFriend,
      currentUser,
      timeStr,
      myMessage,
    }
  },
})
</script>

<style lang="less" scoped>
.message-item-container {
  padding: 5px 10px;
  .time-container {
    text-align: center;
    .time {
      display: inline-block;
      margin: 2px 0;
      padding: 4px 6px;
      font-size: 16px;
      color: #fff;
      border-radius: 4px;
      background-color: #dcdcdc;
    }
  }
  .message-container {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    .avatar {
      width: 32px;
      height: 32px;
      display: inline-block;
      border-radius: 3px;
    }
    .content {
      position: relative;
      margin-right: 10px;
      margin-left: 0;
      padding: 0 10px;
      max-width: calc(100% - 40px);
      min-height: 38px;
      line-height: 38px;
      font-size: 16px;
      text-align: left;
      background-color: #fff;
      border-radius: 6px;
      &::before {
        content: ' ';
        position: absolute;
        top: 9px;
        left: 100%;
        border: 6px solid transparent;
        border-left-color: #fff;
      }
    }
    &.friend-message {
      flex-direction: row;
      .content {
        margin-right: 0;
        margin-left: 10px;
        &::before {
          left: inherit;
          right: 100%;
          border-left-color: transparent;
          border-right-color: #fff;
        }
      }
    }
  }
}
</style>
