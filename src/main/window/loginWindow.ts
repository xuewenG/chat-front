import { WINDOW_NAME } from '@common/window/windowName'
import { useCopy } from '@main/event/copy'
import {
  useOpenMainWindow,
  useOpenRegisterWindow,
} from '@main/event/loginWindow'
import {
  useAddFriendWindow,
  useOpenEditProfileWindow,
  useOpenScreenShareWindow,
  useOpenVideoWindow,
} from '@main/event/mainWindow'
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
    title: '用户登录',
  })
  useCloseWindow()
  useHideWindow()
  useMoveWindow()
  useOpenRegisterWindow()
  useOpenMainWindow()
  useInitWebSocket()
  useSendSocketMessage()
  useCopy()
  useOpenScreenShareWindow()
  useOpenEditProfileWindow()
  useAddFriendWindow()
  useOpenVideoWindow()
}

export { createLoginWindow }
