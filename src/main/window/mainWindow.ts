import { WINDOW_NAME } from '@common/window/windowName'
import { createWindow } from '.'

const createMainWindow = () => {
  const win = createWindow(WINDOW_NAME.MAIN_WINDOW, '/main', {
    width: 900,
    height: 600,
  })
  win.setAlwaysOnTop(true)
}

export { createMainWindow }
