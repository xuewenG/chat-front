import { EVENT_TYPE } from '@common/event/eventType'
import { ipcMain } from 'electron'

const useInitWebSocket = () => {
  ipcMain.on(EVENT_TYPE.INIT_WEB_SOCKET, (event, data) => {
    const token = data.token
    if (typeof token === 'string') {
      console.log('token:', token)
    }
  })
}

export { useInitWebSocket }
