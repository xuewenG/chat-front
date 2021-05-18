import { Contact } from '@common/entity/contact'
import { Message } from '@common/entity/message'
import { User } from '@common/entity/user'
import { InjectionKey, toRefs } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export interface LastLogin {
  credential: string
  password: string
}

export interface ContactMessage {
  contactId: number
  contactType: number
  messageList: Message[]
}

export interface State {
  currentContact: Contact | null
  currentUser: User
  lastLogin: LastLogin
  contactList: Contact[]
  contactMessageList: ContactMessage[]
  token: string
}

export const key: InjectionKey<Store<State>> = Symbol()

export default createStore<State>({
  state: {
    currentContact: null,
    currentUser: {
      id: -1,
      account: '-1',
      email: 'example@abc.com',
      password: 'pwd',
      nickname: 'testuser',
      avatar: 'https://source.unsplash.com/random',
    },
    lastLogin: {
      credential: '',
      password: '',
    },
    contactList: [],
    contactMessageList: [],
    token: '',
  },
  mutations: {
    SET_CURRENT_CONTACT(state, currentContact: Contact) {
      state.currentContact = currentContact
    },
    SET_CURRENT_USER(state, user: User) {
      state.currentUser = user
    },
    SET_LAST_LOGIN(state, lastLogin: LastLogin) {
      state.lastLogin = lastLogin
    },
    SET_CONTACT_LIST(state, contactList: Contact[]) {
      state.contactList = contactList
    },
    SET_CONTACT_MESSAGE_LIST(state, contactMessageList: ContactMessage[]) {
      state.contactMessageList = contactMessageList
    },
    SET_TOKEN(state, token: string) {
      state.token = token
    },
    ADD_TEXT_MESSAGE(state, message: Message) {
      const { contactMessageList } = toRefs(state)
      const contactMessage = contactMessageList.value.find(
        contactMessage =>
          contactMessage.contactType === message.contactType &&
          (contactMessage.contactId === message.fromId ||
            contactMessage.contactId === message.toId),
      )
      if (contactMessage) {
        contactMessage.messageList.push(message)
      } else {
        // contactMessage
      }
    },
  },
  actions: {
    SET_CURRENT_CONTACT(state, currentContact: string) {
      state.commit('SET_CURRENT_CONTACT', currentContact)
    },
    SET_CURRENT_USER(state, user: User) {
      state.commit('SET_CURRENT_USER', user)
    },
    SET_LAST_LOGIN(state, lastLogin: LastLogin) {
      state.commit('SET_LAST_LOGIN', lastLogin)
    },
    SET_CONTACT_LIST(state, contactList: User[]) {
      state.commit('SET_CONTACT_LIST', contactList)
    },
    SET_CONTACT_MESSAGE_LIST(state, contactMessageList: ContactMessage[]) {
      state.commit('SET_CONTACT_MESSAGE_LIST', contactMessageList)
    },
    SET_TOKEN(state, token: string) {
      state.commit('SET_TOKEN', token)
    },
    ADD_TEXT_MESSAGE(state, message: Message) {
      state.commit('ADD_TEXT_MESSAGE', message)
    },
  },
  plugins: [
    createPersistedState({
      fetchBeforeUse: false,
    }),
  ],
})

export function useStore() {
  return baseUseStore(key)
}
