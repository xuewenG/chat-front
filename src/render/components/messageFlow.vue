<template>
  <div ref="message-flow-container" class="message-flow-container">
    <message-item
      v-for="(message, index) in computedCurrentMessageList"
      :key="message.id"
      :message="message"
      :ref="
        el => {
          if (index === computedCurrentMessageList.length - 1) {
            lastMessageDom = el
          }
        }
      "
    />
  </div>
</template>

<script lang="ts">
import { Message } from '@common/entity/message'
import { ContactMessage, useStore } from '@render/store'
import {
  computed,
  defineComponent,
  onBeforeUpdate,
  Ref,
  ref,
  watchEffect,
} from 'vue'
import MessageItem from './messageItem.vue'
export default defineComponent({
  name: 'MessageFlow',
  components: { MessageItem },
  setup () {
    const store = useStore()
    const currentContact = computed(() => store.state.currentContact)
    const currentMessageList = computed(() => {
      const friendMessage:
        | ContactMessage
        | undefined = store.state.contactMessageList.find(
          relativeMessage =>
            relativeMessage.contactId ===
          (currentContact.value && currentContact.value.contactId),
        )
      if (!friendMessage) {
        return []
      }
      return friendMessage.messageList || []
    })
    const computedCurrentMessageList = computed(() => {
      return currentMessageList.value.map((message, index, list) => {
        const newMessage: Partial<Message> = Object.assign({}, message)
        if (index === 0) {
          return newMessage
        }
        const preMessage = list[index - 1]
        const time = new Date(message.time)
        const preTime = new Date(preMessage.time)
        if (time.getTime() - preTime.getTime() < 5 * 60 * 1000) {
          newMessage.time = undefined
        }
        return newMessage
      })
    })
    const lastMessageDom: Ref<any> = ref(null)
    watchEffect(
      () => {
        if (lastMessageDom.value) {
          lastMessageDom.value.$el.scrollIntoView()
        }
      },
      {
        flush: 'post',
      },
    )
    onBeforeUpdate(() => {
      lastMessageDom.value = null
    })
    return {
      lastMessageDom,
      computedCurrentMessageList,
    }
  },
})
</script>

<style scoped>
.message-flow-container {
  overflow-y: scroll;
}
</style>
