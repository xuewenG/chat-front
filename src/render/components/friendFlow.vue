<template>
  <div class="friend-flow-container">
    <friend-item
      v-for="friend in friendList"
      :key="friend.id"
      :friend="friend"
      :active="currentChatId === friend.id"
    />
  </div>
</template>

<script lang="ts">
import { useStore } from '@render/store'
import { computed, defineComponent } from 'vue'
import FriendItem from './friendItem.vue'
export default defineComponent({
  name: 'FriendFlow',
  components: { FriendItem },
  setup() {
    const store = useStore()
    const friendList = computed(() => store.state.friendList)
    const currentChatId = computed(() => store.state.currentChatId)
    return {
      friendList,
      currentChatId,
    }
  },
})
</script>

<style scoped></style>
