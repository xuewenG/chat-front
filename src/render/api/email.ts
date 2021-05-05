interface CanUseReq {
  email: string
}

interface GetVerifyCodeReq {
  email: string
}

const canUse = (params: CanUseReq) => {
  return request.get('/email/canUse', params)
}

const getVerifyCode = (data: GetVerifyCodeReq) => {
  return request.post('/email/getVerifyCode', data)
}

export { canUse, getVerifyCode }
