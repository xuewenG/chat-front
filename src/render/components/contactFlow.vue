<template>
  <div class="contact-flow-container">
    <div v-if="!contactList.length" class="no-contact-tip">你还没有联系人</div>
    <contact-item
      v-for="contact in contactList"
      :key="contact.account"
      :contact="contact"
      :active="
        currentContact.contactId === contact.contactId &&
        currentContact.contactType === contact.contactType
      "
    />
  </div>
</template>

<script lang="ts">
import { useStore } from '@render/store'
import { computed, defineComponent } from 'vue'
import ContactItem from './contactItem.vue'
export default defineComponent({
  name: 'ContactFlow',
  components: { ContactItem },
  setup() {
    const store = useStore()
    const contactList = computed(() => store.state.contactList)
    const currentContact = computed(() => store.state.currentContact)
    return {
      contactList,
      currentContact,
    }
  },
})
</script>

<style lang="less" scoped>
.contact-flow-container {
  .no-contact-tip {
    text-align: center;
    font-size: 18px;
  }
}
</style>
