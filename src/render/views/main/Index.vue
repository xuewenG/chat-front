<template>
  <div class="container">
    <op-bar />
    <div class="left-container">
      <div class="user-info-container" @click="handleEditProfile">
        <img class="avatar" :src="currentUser.avatar" alt="用户头像" />
        <div class="right-container">
          <div class="nickname">{{ currentUser.nickname }}</div>
          <div class="account">{{ currentUser.account }}</div>
        </div>
      </div>
      <search />
      <contact-flow />
    </div>
    <div class="right-container">
      <div class="top-container">
        <div v-if="currentContact" class="contact-info">
          {{ currentContact.nickname }}({{ currentContact.account }})
        </div>
        <message-flow />
      </div>
      <div v-if="currentContact" class="bottom-container">
        <div class="tool-bar">
          <img
            class="tool-item voice"
            src="../../assets/voice.svg"
            alt="语音通话"
          />
          <img
            class="tool-item voice"
            src="../../assets/video.svg"
            alt="视频通话"
            @click="handleVideo"
          />
          <img
            class="tool-item voice"
            src="../../assets/screen.svg"
            alt="桌面共享"
            @click="handleScreenShare"
          />
        </div>
        <message-editor />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ContactFlow from '@render/components/contactFlow.vue'
import MessageEditor from '@render/components/messageEditor.vue'
import MessageFlow from '@render/components/messageFlow.vue'
import OpBar from '@render/components/opBar.vue'
import Search from '@render/components/search.vue'
import { getAllContact } from '@render/api/contact'
import { getAllMessage } from '@render/api/message'
import { computed, defineComponent, Ref, ref, watchEffect } from 'vue'
import { ContactMessage, useStore } from '@render/store'
import { EVENT_TYPE } from '@common/event/eventType'
import { Contact } from '@common/entity/contact'
import { Message } from '@common/entity/message'
import { SOCKET_MESSAGE_TYPE } from '@common/constant/socket/socketMessageType'
import * as socketUtil from '@render/util/socket'

export default defineComponent({
  name: 'Home',
  components: {
    ContactFlow,
    MessageEditor,
    MessageFlow,
    OpBar,
    Search,
  },
  setup () {
    const store = useStore()
    const contactListFromServer: Ref<Contact[]> = ref([])
    const initContactList = async () => {
      const resp = await getAllContact()
      const contactList = resp.data.contactList
      contactListFromServer.value = contactList
      store.dispatch('SET_CURRENT_CONTACT', contactList[0] || null)
      store.dispatch('SET_CONTACT_LIST', contactListFromServer)
    }
    initContactList()

    const contactMessageList: Ref<ContactMessage[]> = ref([])
    const initFriendMessageList = async () => {
      const resp = await getAllMessage()
      contactMessageList.value = resp.data.contactMessageList
      store.dispatch('SET_CONTACT_MESSAGE_LIST', contactMessageList)
    }
    initFriendMessageList()

    const currentUser = computed(() => store.state.currentUser)
    const currentContact = computed(() => store.state.currentContact)
    watchEffect(() => {
      document.title = currentUser.value.nickname
    })
    const handleScreenShare = () => {
      const message: Partial<Message> = {
        toId: (currentContact.value && currentContact.value.contactId) || -1,
      }
      socketUtil.sendMessage(SOCKET_MESSAGE_TYPE.SCREEN_SHARE, message)
    }
    const handleVideo = () => {
      ipcRenderer.send(EVENT_TYPE.OPEN_VIDEO_WINDOW)
    }
    const handleEditProfile = () => {
      ipcRenderer.send(EVENT_TYPE.OPEN_EDIT_PROFILE_WINDOW)
    }
    return {
      currentUser,
      currentContact,
      handleScreenShare,
      handleVideo,
      handleEditProfile,
    }
  },
})
</script>

<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  .left-container {
    width: 25%;
    height: 100%;
    background-color: rgba(233, 232, 231, 1);
    .user-info-container {
      margin: 18px 0 0 12px;
      display: flex;
      cursor: pointer;
      .avatar {
        width: 52px;
        height: 52px;
        display: inline-block;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(205, 205, 205, 0.5);
      }
      .right-container {
        height: 52px;
        margin-left: 12px;
        line-height: 22px;
        .nickname {
          font-weight: 700;
        }
      }
    }
    .search-container {
      margin: 18px 0;
    }
  }
  & > .right-container {
    width: 75%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 32px;
    background-color: rgba(245, 245, 245, 1);
    .top-container {
      width: 100%;
      height: 70%;
      display: flex;
      flex-direction: column;
      .contact-info {
        padding: 0 0 12px 18px;
        font-size: 22px;
        font-weight: 700;
        border-bottom: 1px solid rgba(231, 231, 231, 1);
      }
    }
    .bottom-container {
      width: 100%;
      height: 30%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      border-top: 1px solid #eee;
      background-color: #fff;
      .tool-bar {
        padding-left: 18px;
        .tool-item {
          width: 22px;
          height: 22px;
          margin-top: 8px;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
