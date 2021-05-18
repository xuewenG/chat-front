import { isEmail } from '@common/util/validator'
import { ref } from '@vue/reactivity'
import { login } from '@render/api/user'
import { LOGIN_TYPE } from '@render/constant/user/loginTypeConstant'
import { GLOBAL_RESPONSE_CODE } from '@render/constant/code/globalResponseCode'
import { EVENT_TYPE } from '@common/event/eventType'
import { Store } from 'vuex'
import { State } from '@render/store'

const useLogin = (store: Store<State>) => {
  const lastLogin = store.state.lastLogin
  const credential = ref(lastLogin.credential)
  const password = ref(lastLogin.password)
  const rememberPassword = ref(!!lastLogin.password)
  const handleLogin = () => {
    if (!credential.value || !password.value) {
      return
    }
    login({
      credential: credential.value,
      password: password.value,
      type: isEmail(credential.value) ? LOGIN_TYPE.EMAIL : LOGIN_TYPE.ACCOUNT,
    }).then(resp => {
      const code = resp.code
      if (code === GLOBAL_RESPONSE_CODE.SUCCESS) {
        const token = resp.data.token
        const actions: Promise<any>[] = []
        actions.push(store.dispatch('SET_TOKEN', resp.data.token))
        actions.push(store.dispatch('SET_CURRENT_USER', resp.data.user))
        Promise.all(actions).then(() => {
          ipcRenderer.send(EVENT_TYPE.INIT_WEB_SOCKET, {
            token,
          })
          ipcRenderer.send(EVENT_TYPE.OPEN_MAIN_WINDOW)
          ipcRenderer.send(EVENT_TYPE.CLOSE_WINDOW)
        })
        store.dispatch('SET_LAST_LOGIN', {
          credential: credential.value,
          password: rememberPassword.value ? password.value : '',
        })
      }
    })
  }
  return {
    credential,
    password,
    rememberPassword,
    handleLogin,
  }
}

export { useLogin }
