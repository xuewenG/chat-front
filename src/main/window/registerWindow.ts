import { WINDOW_NAME } from '@common/window/windowName'
import { createWindow, getWindowByName } from '.'

const createRegisterWindow = () => {
  const loginWindow = getWindowByName(WINDOW_NAME.LOGIN_WINDOW)
  createWindow(WINDOW_NAME.REISTER_WINDOW, '/register', {
    width: 500,
    height: 398,
    title: '用户注册',
  })
}

export { createRegisterWindow }
