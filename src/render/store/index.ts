import { User } from '@render/entity/user'
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

interface LastLogin {
  credential: string
  password: string
}

export interface State {
  currentChatId: number
  currentUser: User
  lastLogin: LastLogin
  friendList: User[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export default createStore<State>({
  state: {
    currentChatId: -1,
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
    friendList: [],
  },
  mutations: {
    SET_CURRENT_CHAT_ID(state, currentChatId: number) {
      state.currentChatId = currentChatId
    },
    SET_CURRENT_USER(state, user: User) {
      state.currentUser = user
    },
    SET_LAST_LOGIN(state, lastLogin: LastLogin) {
      state.lastLogin = lastLogin
    },
    SET_FRIEND_LIST(state, friendList: User[]) {
      state.friendList = friendList
    },
  },
  actions: {
    SET_CURRENT_CHAT_ID(state, currentChatId: number) {
      state.commit('SET_CURRENT_CHAT_ID', currentChatId)
    },
    SET_CURRENT_USER(state, user: User) {
      state.commit('SET_CURRENT_USER', user)
    },
    SET_LAST_LOGIN(state, lastLogin: LastLogin) {
      state.commit('SET_LAST_LOGIN', lastLogin)
    },
    SET_FRIEND_LIST(state, friendList: User[]) {
      state.commit('SET_FRIEND_LIST', friendList)
    },
  },
  plugins: [createPersistedState()],
})

export function useStore() {
  return baseUseStore(key)
}
