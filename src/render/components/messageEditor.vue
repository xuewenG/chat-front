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
import { defineComponent, ref } from 'vue'
import { SOCKET_MESSAGE_TYPE } from '@render/constant/socket/socketMessageType'
import { EVENT_TYPE } from '@common/event/eventType'
export default defineComponent({
  name: 'GroupMessageEdit',
  setup() {
    const currentChat = ref(-1)
    const textAreaContent = ref('')
    const sendMessage = () => {
      const message = {
        toId: currentChat.value,
        content: textAreaContent.value,
      }
      const socketMessage = {
        type: SOCKET_MESSAGE_TYPE.PRIVATE_MESSAGE,
        data: JSON.stringify(message),
      }
      ipcRenderer.send(EVENT_TYPE.SEND_SOCKET_MESSAGE, socketMessage)
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
