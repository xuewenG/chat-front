import { EVENT_TYPE } from '@common/event/eventType'
import { createScreenShareWindow } from '@main/window/screenShareWindow'
import { ipcMain } from 'electron'

const useOpenScreenShareWindow = () => {
  ipcMain.on(EVENT_TYPE.OPEN_SCREEN_SHARE_WINDOW, () => {
    createScreenShareWindow()
  })
}

export { useOpenScreenShareWindow }
