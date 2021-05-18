import { SOCKET_HOST } from '@common/config'
import { SOCKET_MESSAGE_TYPE } from '@common/constant/socket/socketMessageType'
import { Message } from '@common/entity/message'
import { EVENT_TYPE } from '@common/event/eventType'
import { WINDOW_NAME } from '@common/window/windowName'
import { getWindowByName } from '@main/window'
import { ipcMain } from 'electron'
import WebSocket from 'ws'

interface SocketMessage {
  type: SOCKET_MESSAGE_TYPE
  data: any
}

let socket: WebSocket | null = null
const savedToken = ''

const checkSocket = (socket: WebSocket) => {
  return socket.readyState === WebSocket.OPEN
}

const initWebsocket = (token: string) => {
  if (socket && checkSocket(socket)) {
    socket.close()
  }
  try {
    const url = new URL(`/chatSocket/${token}`, SOCKET_HOST)
    socket = new WebSocket(url)
    socket.on('message', data => {
      console.debug(data)
      const socketMessage: SocketMessage = JSON.parse(data.toString())
      if (socketMessage.type === SOCKET_MESSAGE_TYPE.PRIVATE_MESSAGE) {
        const message: Message = JSON.parse(socketMessage.data)
        const mainWindow = getWindowByName(WINDOW_NAME.MAIN_WINDOW)
        if (mainWindow) {
          mainWindow.webContents.send(EVENT_TYPE.RECEIVE_TEXT_MESSAGE, message)
        }
      }
    })
  } catch (error) {
    console.error(error)
  }
}

const sendSocketMessage = (message: any) => {
  if (socket) {
    socket.send(JSON.stringify(message))
  }
}

const useInitWebSocket = () => {
  ipcMain.on(EVENT_TYPE.INIT_WEB_SOCKET, (event, data) => {
    const token = data.token
    if (typeof token === 'string') {
      initWebsocket(token)
    }
  })
}

const useSendSocketMessage = () => {
  ipcMain.on(EVENT_TYPE.SEND_SOCKET_MESSAGE, (event, message) => {
    sendSocketMessage(message)
  })
}

export { useInitWebSocket, useSendSocketMessage }
