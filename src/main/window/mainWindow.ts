import { moveWindow } from '@main/event/moveWindow'
import { BrowserWindow } from 'electron'
import path from 'path'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

const createMainWindow = async (): Promise<void> => {
  const win = new BrowserWindow({
    width: 430,
    height: 330,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: (process.env
        .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
      preload: path.resolve(__dirname, './preload.js'),
    },
  })

  moveWindow(win)
  win.setAlwaysOnTop(true)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }
}

export { createMainWindow }
