<template>
  <div class="message-editor-container">
    <textarea
      class="input-text-area"
      type="textarea"
      placeholder="请输入内容"
      v-model="textAreaContent"
      @keydown.enter.prevent="sendMessage"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { SOCKET_MESSAGE_TYPE } from '@common/constant/socket/socketMessageType'
import * as socketUtil from '@render/util/socket'
import { useStore } from '@render/store'
import { Message } from '@common/entity/message'
export default defineComponent({
  name: 'GroupMessageEdit',
  setup () {
    const store = useStore()
    const currentContact = computed(() => store.state.currentContact)
    const textAreaContent = ref('')
    const sendMessage = () => {
      const message: Partial<Message> = {
        toId: (currentContact.value && currentContact.value.contactId) || -1,
        content: textAreaContent.value,
      }
      socketUtil.sendMessage(SOCKET_MESSAGE_TYPE.PRIVATE_MESSAGE, message)
      textAreaContent.value = ''
    }
    return {
      textAreaContent,
      sendMessage,
    }
  },
})
</script>

<style lang="less" scoped>
.message-editor-container {
  width: 100%;
  height: 100%;
}
.input-text-area {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  resize: none;
  padding: 12px;
  display: inline-block;
  border: none;
  outline: none;
}
</style>
