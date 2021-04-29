import { WINDOW_NAME } from '@common/window/windowName'
import { useOpenRegisterWindow } from '@main/event/mainWindow'
import {
  useCloseWindow,
  useHideWindow,
  useMoveWindow,
} from '@main/event/window'
import { createWindow } from '.'

const createMainWindow = async (): Promise<void> => {
  const win = createWindow(WINDOW_NAME.LOGIN_WINDOW, '/', {
    width: 430,
    height: 330,
  })
  useCloseWindow()
  useHideWindow()
  useMoveWindow()
  useOpenRegisterWindow()
  win.setAlwaysOnTop(true)
}

export { createMainWindow }
