import store from '@render/store'

const get = (url: string, params?: any): Promise<any> => {
  const finalParams = Object.assign({}, params, {
    token: store.state.token,
  })
  return request.get(url, finalParams)
}

export { get }
