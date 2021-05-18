import { SOCKET_MESSAGE_TYPE } from '@common/constant/socket/socketMessageType'
import { EVENT_TYPE } from '@common/event/eventType'

const sendMessage = (socketMessageType: SOCKET_MESSAGE_TYPE, data: any) => {
  const socketMessage = {
    type: socketMessageType,
    data: JSON.stringify(data),
  }
  ipcRenderer.send(EVENT_TYPE.SEND_SOCKET_MESSAGE, socketMessage)
}

export { sendMessage }
