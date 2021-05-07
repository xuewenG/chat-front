import { isEmail } from '@common/util/validator'
import { canUse, getVerifyCode } from '@render/api/email'
import { register } from '@render/api/user'
import { GLOBAL_RESPONSE_CODE } from '@render/constant/code/globalResponseCode'
import { USER_RSPONSE_CODE } from '@render/constant/code/userResponseCode'
import route from '@render/router'
import { Ref, ref } from '@vue/reactivity'

const useEditProfile = (): {
  handleRegister: () => void
  handleNicknameChange: () => void
  handleEmailChange: () => void
  handlePasswordChange: () => void
  handleGetVerifyCode: () => void
  handleVerifyCodeInput: () => void
  email: Ref<string>
  password: Ref<string>
  passwordConfirmed: Ref<string>
  nickname: Ref<string>
  verifyCode: Ref<string>
  getVerifyCodeCount: Ref<number>
  validMap: any
} => {
  const email = ref('')
  const password = ref('')
  const passwordConfirmed = ref('')
  const nickname = ref('')
  const verifyCode = ref('')
  const validMap = {
    nickname: ref(true),
    email: ref(true),
    password: ref(true),
    passwordConfirmed: ref(true),
    verifyCode: ref(true),
  }
  const getVerifyCodeCount = ref(0)
  const handleRegister = (): void => {
    if (
      !nickname.value ||
      !email.value ||
      !password.value ||
      !passwordConfirmed.value ||
      !verifyCode.value
    ) {
      validMap.nickname.value = !!nickname.value
      validMap.email.value = !!email.value
      validMap.password.value = !!password.value
      validMap.passwordConfirmed.value = !!passwordConfirmed.value
      validMap.verifyCode.value = !!verifyCode.value
      return
    }
    register({
      email: email.value,
      password: password.value,
      nickname: nickname.value,
      verifyCode: verifyCode.value,
    }).then(resp => {
      if (resp.code === USER_RSPONSE_CODE.INVALID_VERIFY_CODE) {
        validMap.verifyCode.value = false
        return
      }
      if (resp.code === GLOBAL_RESPONSE_CODE.SUCCESS) {
        route.push({
          name: 'RegisterSuccess',
          params: {
            account: resp.data.account,
            email: email.value,
          },
        })
      }
    })
  }
  const handleNicknameChange = (): void => {
    validMap.nickname.value = !!nickname.value
  }
  const handleEmailChange = (): void => {
    if (!isEmail(email.value)) {
      validMap.email.value = false
      return
    }
    canUse({
      email: email.value,
    }).then(resp => {
      validMap.email.value = resp.code === GLOBAL_RESPONSE_CODE.SUCCESS
    })
  }
  const handlePasswordChange = (): void => {
    if (!password.value || !passwordConfirmed.value) {
      return
    }
    validMap.password.value = passwordConfirmed.value === password.value
    validMap.passwordConfirmed.value =
      passwordConfirmed.value === password.value
  }
  const handleGetVerifyCode = (): void => {
    if (getVerifyCodeCount.value) {
      return
    }
    if (!email.value) {
      validMap.email.value = false
      return
    }
    if (!validMap.email.value) {
      return
    }
    getVerifyCode({
      email: email.value,
    }).then(resp => {
      if (resp.code === GLOBAL_RESPONSE_CODE.SUCCESS) {
        getVerifyCodeCount.value = 60
        const id = setInterval(() => {
          getVerifyCodeCount.value--
          if (getVerifyCodeCount.value === 0) {
            clearInterval(id)
          }
        }, 1000)
      } else {
        validMap.email.value = false
      }
    })
  }
  const handleVerifyCodeInput = (): void => {
    verifyCode.value = verifyCode.value.replace(/[^\d]/g, '')
    verifyCode.value = verifyCode.value.slice(0, 6)
    validMap.verifyCode.value = true
  }
  return {
    handleRegister,
    handleNicknameChange,
    handleEmailChange,
    handlePasswordChange,
    handleGetVerifyCode,
    handleVerifyCodeInput,
    email,
    password,
    passwordConfirmed,
    nickname,
    verifyCode,
    getVerifyCodeCount,
    validMap,
  }
}

export { useEditProfile }
