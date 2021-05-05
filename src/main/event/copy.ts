import { EVENT_TYPE } from '@common/event/eventType'
import { ipcMain, clipboard } from 'electron'

const useCopy = () => {
  ipcMain.on(EVENT_TYPE.COPY_TEXT, (event, data) => {
    const text = data.text
    if (typeof text === 'string') {
      clipboard.writeText(text)
    }
  })
}

export { useCopy }
