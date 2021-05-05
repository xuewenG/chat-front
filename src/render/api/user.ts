import { User } from '@render/entity/user'

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
  }
}

const register = (data: RegisterReq): Promise<RegisterResp> => {
  return request.post('/user/register', data)
}

const login = (data: LoginReq): Promise<LoginResp> => {
  return request.post('/user/login', data)
}

export { register, login }
