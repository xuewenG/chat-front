/* eslint-disable */
import { InjectedIpcRenderer } from '@common/event/injectedIpcRenderer'
import { InjectedRequest } from '@common/network/injectedRequest'
import { InjectedDesktopCapture } from '@common/capture/injectedDesktopCapture'

declare global {
  declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
  }

  declare module '*.svg' {
    const content: any
    export default content
  }

  declare const ipcRenderer: InjectedIpcRenderer
  declare const request: InjectedRequest
  declare const desktopCapturer: InjectedDesktopCapture;
}
