import { WINDOW_NAME } from '@common/window/windowName'
import { useCopy } from '@main/event/copy'
import {
  useOpenMainWindow,
  useOpenRegisterWindow,
} from '@main/event/loginWindow'
import { useInitWebSocket, useSendSocketMessage } from '@main/event/socket'
import {
  useCloseWindow,
  useHideWindow,
  useMoveWindow,
} from '@main/event/window'
import { createWindow } from '.'

const createLoginWindow = async (): Promise<void> => {
  const win = createWindow(WINDOW_NAME.LOGIN_WINDOW, '/', {
    width: 430,
    height: 330,
  })
  useCloseWindow()
  useHideWindow()
  useMoveWindow()
  useOpenRegisterWindow()
  useOpenMainWindow()
  useInitWebSocket()
  useSendSocketMessage()
  useCopy()
  win.setAlwaysOnTop(true)
}

export { createLoginWindow }
