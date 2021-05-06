<template>
  <div class="friend-flow-container">
    <friend-item
      v-for="friend in currentFriendList"
      :key="friend.id"
      :friend="friend"
    />
  </div>
</template>

<script lang="ts">
import { User } from '@render/entity/user'
import { defineComponent, reactive } from 'vue'
import FriendItem from './friendItem.vue'
export default defineComponent({
  name: 'FriendFlow',
  components: { FriendItem },
  setup() {
    const currentFriendList: User[] = reactive([
      {
        id: 10,
        nickname: '小丽1',
        avatar: 'https://source.unsplash.com/random',
        account: '1982580',
        password: '',
        email: 'xiaoli@xuewen.me',
      },
      {
        id: 11,
        nickname: '小丽2',
        avatar: 'https://source.unsplash.com/random',
        account: '1982580',
        password: '',
        email: 'xiaoli@xuewen.me',
      },
      {
        id: 12,
        nickname: '小丽3',
        avatar: 'https://source.unsplash.com/random',
        account: '1982580',
        password: '',
        email: 'xiaoli@xuewen.me',
      },
    ])
    return {
      currentFriendList,
    }
  },
})
</script>

<style scoped></style>
