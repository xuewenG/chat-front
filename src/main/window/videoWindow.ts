import { WINDOW_NAME } from '@common/window/windowName'
import { createWindow } from '.'

const createVideoWindow = () => {
  createWindow(WINDOW_NAME.VIDEO_WINDOW, '/video', {
    width: 1920 * 0.8,
    height: 1080 * 0.8,
  })
}

export { createVideoWindow }
