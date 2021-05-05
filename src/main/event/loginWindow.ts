import { EVENT_TYPE } from '@common/event/eventType'
import { WINDOW_NAME } from '@common/window/windowName'
import { getWindowByName } from '@main/window'
import { createRegisterWindow } from '@main/window/registerWindow'
import { ipcMain } from 'electron'

const useOpenRegisterWindow = () => {
  ipcMain.on(EVENT_TYPE.OPEN_REGISTER_WINDOW, event => {
    const win = getWindowByName(WINDOW_NAME.REISTER_WINDOW)
    if (win) {
      win.focus()
      return
    }
    createRegisterWindow()
  })
}

export { useOpenRegisterWindow }
