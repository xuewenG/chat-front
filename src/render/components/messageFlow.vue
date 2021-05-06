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
// import { User } from '@render/entity/user'
// import { useStore } from '@render/store'
import { computed, defineComponent, reactive } from 'vue'
import MessageItem from './messageItem.vue'
export default defineComponent({
  name: 'MessageFlow',
  components: { MessageItem },
  setup() {
    console.log('setup')
    // const store = useStore()
    // const currentChatId = computed(() => store.state.currentChatId)
    // const currentChatFriend = computed(() => {
    //   const friendList = store.state.friendList
    //   for (const user of friendList) {
    //     if (user.id === currentChatId.value) {
    //       return user
    //     }
    //   }
    //   return {} as User
    // })
    const currentMessageList: Message[] = reactive([
      {
        id: 1,
        fromId: 1,
        toId: -1,
        content: 'default content1',
        time: new Date(),
      },
      {
        id: 2,
        fromId: -1,
        toId: -1,
        content: 'default content2',
        time: new Date(),
      },
      {
        id: 3,
        fromId: 1,
        toId: -1,
        content: 'default content3',
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
          console.log(message.time.getTime() - preMessage.time.getTime())
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
