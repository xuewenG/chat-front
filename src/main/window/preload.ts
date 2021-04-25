import { EVENT_TYPE } from '@common/event/eventType'
import { InjectedIpcRenderer } from '@common/event/injectedIpcRenderer'
import { contextBridge, ipcRenderer } from 'electron'

const injectedIpcRenderer: InjectedIpcRenderer = {
  send: (channel, data) => {
    if (Object.values(EVENT_TYPE).includes(channel)) {
      ipcRenderer.send(channel, data)
    } else {
      console.error(`unkonwn event type: ${channel}`)
    }
  },
  on: (channel, listener) => {
    if (Object.values(EVENT_TYPE).includes(channel)) {
      ipcRenderer.on(channel, listener)
    } else {
      console.error(`unkonwn event type: ${channel}`)
    }
  },
}

contextBridge.exposeInMainWorld('ipcRenderer', injectedIpcRenderer)
