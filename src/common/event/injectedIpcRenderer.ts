import { IpcRendererEvent } from 'electron'
import { EVENT_DATA } from './eventType'

interface InjectedIpcRenderer {
  send: <K extends keyof EVENT_DATA>(channel: K, data: EVENT_DATA[K]) => void
  on: <K extends keyof EVENT_DATA>(
    channel: K,
    listener: (event: IpcRendererEvent, data: EVENT_DATA[K]) => void,
  ) => void
}

export { InjectedIpcRenderer }
