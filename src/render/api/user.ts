import { User } from '@common/entity/user'

interface RegisterReq {
  email: string
  password: string
  nickname: string
  verifyCode: string
}

interface RegisterResp {
  code: string
  data: {
    account: string
  }
}

interface LoginReq {
  credential: string
  password: string
  type: number
}

interface LoginResp {
  code: string
  data: {
    user: User
    token: string
  }
}

interface GetAvatarResp {
  code: string
  data: {
    avatar: string
  }
}

const register = (data: RegisterReq): Promise<RegisterResp> => {
  return request.post('/user/register', data)
}

const login = (data: LoginReq): Promise<LoginResp> => {
  return request.post('/user/login', data)
}

const getAvatar = (credential: string): Promise<GetAvatarResp> => {
  return request.get('/user/avatar', { credential })
}

export { register, login, getAvatar }
