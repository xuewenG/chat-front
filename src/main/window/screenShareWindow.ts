import { WINDOW_NAME } from '@common/window/windowName'
import { createWindow, getWindowByName } from '.'

const createScreenShareWindow = () => {
  const mainWin = getWindowByName(WINDOW_NAME.MAIN_WINDOW)
  createWindow(WINDOW_NAME.SCREEN_SHARE_WINDOW, '/screen', {
    width: 1632,
    height: 918,
    parent: mainWin,
  })
}

export { createScreenShareWindow }
