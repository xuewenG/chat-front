<template>
  <div
    class="container"
    @dragstart.prevent
    @dragend.prevent
    @mousedown="handleStartMoveWindow"
    @mouseup="handleStopMoveWindow"
  >
    <div class="op-bar">
      <img
        class="op-item mini"
        src="../../assets/mini-gray.svg"
        alt="最小化"
        @click="handleHideWindow"
      />
      <img
        class="op-item close"
        src="../../assets/close-gray.svg"
        alt="关闭"
        @click="handleCloseWindow"
      />
    </div>
    <div class="left-container">
      <search />
      <friend-flow />
    </div>
    <div class="right-container">
      <div class="top-container">
        <div class="friend-info">
          {{ currentChatFriend.nickname }}({{ currentChatFriend.account }})
        </div>
        <message-flow />
      </div>
      <div class="bottom-container">
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
import {
  useCloseWindow,
  useHideWindow,
  useMoveWindow,
} from '@render/event/window'
import MessageEditor from '@render/components/messageEditor.vue'
import MessageFlow from '@render/components/messageFlow.vue'
import FriendFlow from '@render/components/friendFlow.vue'
import Search from '@render/components/search.vue'
import { computed, defineComponent } from 'vue'
import { FriendMessage, useStore } from '@render/store'
import { EVENT_TYPE } from '@common/event/eventType'
import { User } from '@render/entity/user'

export default defineComponent({
  name: 'Home',
  components: {
    MessageEditor,
    MessageFlow,
    FriendFlow,
    Search,
  },
  setup() {
    const friendListFromServer: User[] = [
      {
        id: 10,
        nickname: '小明',
        avatar:
          'https://blog-xuewen-me.oss-cn-shanghai.aliyuncs.com/xuewen/chat/avatar1.jpeg',
        account: '1982581',
        password: '',
        email: 'xiaoli1@xuewen.me',
      },
      {
        id: 11,
        nickname: '李华',
        avatar:
          'https://blog-xuewen-me.oss-cn-shanghai.aliyuncs.com/xuewen/chat/avatar11.jpeg',
        account: '1982582',
        password: '',
        email: 'xiaoli2@xuewen.me',
      },
      {
        id: 12,
        nickname: '小红',
        avatar:
          'https://blog-xuewen-me.oss-cn-shanghai.aliyuncs.com/xuewen/chat/avatar3.jpeg',
        account: '1982583',
        password: '',
        email: 'xiaoli3@xuewen.me',
      },
    ]
    const friendMessageListFromServer: FriendMessage[] = [
      {
        friendId: 10,
        messageList: [
          {
            fromId: 10,
            toId: 1,
            content: '你出门了吗？',
            time: new Date('2021-05-05 18:01:32'),
          },
          {
            fromId: 1,
            toId: 10,
            content: '快到了',
            time: new Date('2021-05-05 18:09:20'),
          },
        ],
      },
      {
        friendId: 11,
        messageList: [
          {
            fromId: 1,
            toId: 11,
            content: '在干嘛？',
            time: new Date('2021-05-05 11:50:15'),
          },
          {
            fromId: 11,
            toId: 1,
            content: '看电视',
            time: new Date('2021-05-05 11:55:27'),
          },
          {
            fromId: 1,
            toId: 11,
            content: '吃饭了吗？',
            time: new Date('2021-05-05 11:55:58'),
          },
        ],
      },
      {
        friendId: 12,
        messageList: [
          {
            fromId: 1,
            toId: 12,
            content: '你啥时候回来？',
            time: new Date('2021-05-05 09:20:05'),
          },
          {
            fromId: 12,
            toId: 1,
            content: '下午吧',
            time: new Date('2021-05-05 09:29:19'),
          },
        ],
      },
    ]
    const store = useStore()
    store.dispatch('SET_FRIEND_LIST', friendListFromServer)
    store.dispatch('SET_FRIEND_MESSAGE_LIST', friendMessageListFromServer)
    if (friendListFromServer.length) {
      const currentChatId = friendListFromServer[0].id
      store.dispatch('SET_CURRENT_CHAT_ID', currentChatId)
    }

    const friendList = computed(() => store.state.friendList)
    const currentChatId = computed(() => store.state.currentChatId)
    const currentChatFriend = computed(
      () =>
        friendList.value.find(current => current.id === currentChatId.value) ||
        {},
    )
    const handleScreenShare = () => {
      ipcRenderer.send(EVENT_TYPE.OPEN_SCREEN_SHARE_WINDOW)
    }
    return {
      currentChatFriend,
      handleScreenShare,
      ...useMoveWindow(),
      ...useCloseWindow(),
      ...useHideWindow(),
    }
  },
})
</script>

<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  .op-bar {
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    z-index: 10;
    .op-item {
      width: 32px;
      height: 32px;
      transition: 0.2s;
    }
    .mini {
      &:hover {
        background: rgba(150, 150, 150, 0.25);
      }
    }
    .close {
      &:hover {
        background: rgba(255, 0, 0, 0.8);
      }
    }
  }
  .left-container {
    width: 25%;
    height: 100%;
    background-color: rgba(233, 232, 231, 1);
  }
  .right-container {
    width: 75%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 32px;
    background-color: rgba(245, 245, 245, 1);
    .top-container {
      width: 100%;
      height: 70%;
      .friend-info {
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
