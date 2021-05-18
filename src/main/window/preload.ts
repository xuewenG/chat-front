import { EVENT_TYPE } from '@common/event/eventType'
import { InjectedIpcRenderer } from '@common/event/injectedIpcRenderer'
import { API_HOST } from '@common/config'
import { InjectedRequest } from '@common/network/injectedRequest'
import { isDevelopment } from '@main/util/env'
import { contextBridge, desktopCapturer, ipcRenderer } from 'electron'
import nodeFetch from 'node-fetch'

const injectIpcRenderer = () => {
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
}

const injectRequest = () => {
  const finalFetch = isDevelopment ? window.fetch : nodeFetch
  const injectedRequest: InjectedRequest = {
    get: async (url: any, params: any) => {
      try {
        const finalUrl = new URL(url, API_HOST)
        finalUrl.search = new URLSearchParams(params).toString()
        const response = await finalFetch(finalUrl.toString())
        return response.json()
      } catch (error) {
        console.error(error)
      }
      return {}
    },
    post: async (url: any, data: any) => {
      try {
        const finalUrl = new URL(url, API_HOST)
        const dataStr = JSON.stringify(data)
        const response = await finalFetch(finalUrl.toString(), {
          method: 'POST',
          body: dataStr,
          headers: { 'Content-Type': 'application/json' },
        })
        return response.json()
      } catch (error) {
        console.error(error)
      }
      return {}
    },
  }
  contextBridge.exposeInMainWorld('request', injectedRequest)
}

const injectDesktopCapturer = () => {
  contextBridge.exposeInMainWorld('desktopCapturer', desktopCapturer)
}

injectIpcRenderer()
injectRequest()
injectDesktopCapturer()
