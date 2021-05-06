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
import { computed, defineComponent, reactive } from 'vue'
import MessageItem from './messageItem.vue'
export default defineComponent({
  name: 'MessageFlow',
  components: { MessageItem },
  setup() {
    const currentMessageList: Message[] = reactive([
      {
        id: 1,
        fromId: 1,
        toId: -1,
        content: '在干嘛？',
        time: new Date(),
      },
      {
        id: 2,
        fromId: -1,
        toId: -1,
        content: '看电视',
        time: new Date(),
      },
      {
        id: 3,
        fromId: 1,
        toId: -1,
        content: '吃饭了吗？',
        time: new Date(),
      },
    ])
    const computedCurrentMessageList = computed(() => {
      return currentMessageList.map((message, index, list) => {
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
