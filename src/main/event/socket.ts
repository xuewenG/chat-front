import { EVENT_TYPE } from '@common/event/eventType'
import { ipcMain } from 'electron'

const socket: WebSocket | null = null

const useInitWebSocket = () => {
  ipcMain.on(EVENT_TYPE.INIT_WEB_SOCKET, (event, data) => {
    const token = data.token
    if (typeof token === 'string') {
      console.log('token:', token)
    }
  })
}

const useSendSocketMessage = () => {
  ipcMain.on(EVENT_TYPE.SEND_SOCKET_MESSAGE, (event, data) => {
    const dataStr = JSON.stringify(data)
    if (socket) {
      socket.send(dataStr)
    }
  })
}

export { useInitWebSocket, useSendSocketMessage }
