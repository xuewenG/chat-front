import { WINDOW_NAME } from '@common/window/windowName'
import { createWindow } from '.'

const createScreenShareWindow = () => {
  createWindow(WINDOW_NAME.SCREEN_SHARE_WINDOW, '/screen', {
    width: 720,
    height: 510,
  })
}

export { createScreenShareWindow }
