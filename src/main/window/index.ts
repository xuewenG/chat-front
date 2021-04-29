import { isDevelopment, isTest } from '@main/util/env'
import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import path from 'path'

const ALL_WINDOW: Map<string, BrowserWindow> = new Map<string, BrowserWindow>()

const createWindow = (
  windowName: string,
  renderPath: string,
  options?: BrowserWindowConstructorOptions,
): BrowserWindow => {
  const DEFAULT_OPTIONS: BrowserWindowConstructorOptions = {
    frame: false,
    resizable: false,
    show: false,
    webPreferences: {
      webSecurity: !isDevelopment,
      preload: path.resolve(__dirname, './preload.js'),
    },
  }
  const finalOptions = Object.assign({}, DEFAULT_OPTIONS, options)
  const win = new BrowserWindow(finalOptions)
  ALL_WINDOW.set(windowName, win)
  win.once('ready-to-show', () => {
    win.show()
  })
  win.on('closed', () => {
    ALL_WINDOW.delete(windowName)
  })
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(
      (process.env.WEBPACK_DEV_SERVER_URL as string) + `#${renderPath}`,
    )
    if (!isTest) win.webContents.openDevTools()
  } else {
    win.loadURL('app://./index.html' + `#${renderPath}`)
  }
  return win
}

const getWindowByName = (windowName: string): BrowserWindow | undefined => {
  return ALL_WINDOW.get(windowName)
}

export { createWindow, getWindowByName }
