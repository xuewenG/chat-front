<template>
  <div class="contact-item-container" :class="{ active }" @click="changeChat">
    <div class="left-container">
      <img class="avatar" :src="contact.avatar" @click="showProfile" />
    </div>
    <div class="right-container">
      <div class="top-container">
        <div class="nickname">{{ contact.nickname }}</div>
        <div class="time">{{ timeStr }}</div>
      </div>
      <div class="bottom-container">
        <div class="last-message">{{ messageContent }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { User } from '@common/entity/user'
import { ContactMessage, useStore } from '@render/store'
import { computed, defineComponent, PropType, toRefs } from 'vue'
import moment from 'moment'
import { Contact } from '@common/entity/contact'
export default defineComponent({
  name: 'ContactItem',
  props: {
    contact: {
      type: Object as PropType<Contact>,
      default: () => ({}),
    },
    active: {
      type: Boolean,
      default: () => false,
    },
  },
  setup (props) {
    const { contact } = toRefs(props)
    const store = useStore()
    const currentMessageList = computed(() => {
      const contactMessage:
        | ContactMessage
        | undefined = store.state.contactMessageList.find(
          relativeMessage =>
            relativeMessage.contactId === contact.value.contactId,
        )
      if (!contactMessage) {
        return []
      }
      return contactMessage.messageList || []
    })
    const lastMessage = computed(() => {
      const length = currentMessageList.value.length
      if (!length) {
        return { content: '', time: new Date() }
      }
      return currentMessageList.value[length - 1]
    })
    const messageContent = computed(() => lastMessage.value.content)
    const timeStr = computed(() =>
      lastMessage.value.time
        ? moment(lastMessage.value.time).format('HH:mm')
        : '',
    )
    const changeChat = () => {
      store.dispatch('SET_CURRENT_CONTACT', contact)
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
.contact-item-container {
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
      box-shadow: 0 0 10px rgba(205, 205, 205, 0.5);
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
