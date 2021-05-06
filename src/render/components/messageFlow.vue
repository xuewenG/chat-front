<template>
  <div class="message-flow-container">
    <message-item
      v-for="message in computedCurrentMessageList"
      :key="message.id"
      :message="message"
    />
  </div>
</template>

<script lang="ts">
import { Message } from '@render/entity/message'
import { useStore } from '@render/store'
import { computed, defineComponent } from 'vue'
import MessageItem from './messageItem.vue'
export default defineComponent({
  name: 'MessageFlow',
  components: { MessageItem },
  setup() {
    const store = useStore()
    const currentChatId = computed(() => store.state.currentChatId)
    const currentMessageList = computed(
      () =>
        store.state.friendMessageList.find(
          friendMessage => friendMessage.friendId === currentChatId.value,
        )?.messageList || [],
    )
    const computedCurrentMessageList = computed(() => {
      return currentMessageList.value.map((message, index, list) => {
        const newMessage: Partial<Message> = Object.assign({}, message)
        if (index === 0) {
          return newMessage
        }
        const preMessage = list[index - 1]
        if (
          message.time.getTime() - preMessage.time.getTime() <
          5 * 60 * 1000
        ) {
          newMessage.time = undefined
        }
        return newMessage
      })
    })
    return {
      computedCurrentMessageList,
    }
  },
})
</script>

<style scoped></style>
