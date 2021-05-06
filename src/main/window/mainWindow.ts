import { WINDOW_NAME } from '@common/window/windowName'
import { createWindow } from '.'

const createMainWindow = () => {
  createWindow(WINDOW_NAME.REISTER_WINDOW, '/main', {
    width: 900,
    height: 600,
  })
}

export { createMainWindow }
