import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import { installDevTool } from './util/devtool'
import { isDarwin, isDevelopment, isTest, isWin32 } from './util/env'
import { createLoginWindow } from './window/loginWindow'

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
])

app.on('window-all-closed', () => {
  if (!isDarwin) {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createLoginWindow()
  }
})

app.on('ready', async () => {
  if (isDevelopment && !isTest) {
    installDevTool()
  }
  if (!process.env.WEBPACK_DEV_SERVER_URL) {
    createProtocol('app')
  }
  createLoginWindow()
})

if (isDevelopment) {
  if (isWin32) {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
