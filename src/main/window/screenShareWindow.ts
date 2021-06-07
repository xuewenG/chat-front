import { WINDOW_NAME } from '@common/window/windowName'
import { createWindow } from '.'

const createScreenShareWindow = () => {
  createWindow(WINDOW_NAME.SCREEN_SHARE_WINDOW, '/screen', {
    width: 1920 * 0.8,
    height: 1080 * 0.8,
  })
}

export { createScreenShareWindow }
