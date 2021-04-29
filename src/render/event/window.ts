import { EVENT_TYPE } from '@common/event/eventType'

const handleCloseWindow = () => {
  ipcRenderer.send(EVENT_TYPE.CLOSE_WINDOW)
}

const handleHideWindow = () => {
  ipcRenderer.send(EVENT_TYPE.HIDE_WINDOW)
}

const handleStartMoveWindow = (e: MouseEvent) => {
  const elementTypes = [
    HTMLInputElement,
    HTMLButtonElement,
    HTMLTextAreaElement,
  ]
  const target = e.target
  for (const type of elementTypes) {
    if (target instanceof type) {
      return ipcRenderer.send(EVENT_TYPE.MOVE_WINDOW, {
        canMove: false,
      })
    }
  }
  ipcRenderer.send(EVENT_TYPE.MOVE_WINDOW, {
    canMove: true,
  })
}
const handleStopMoveWindow = () => {
  ipcRenderer.send(EVENT_TYPE.MOVE_WINDOW, {
    canMove: false,
  })
}

const useCloseWindow = () => {
  return {
    handleCloseWindow,
  }
}

const useHideWindow = () => {
  return {
    handleHideWindow,
  }
}

const useMoveWindow = () => {
  return { handleStartMoveWindow, handleStopMoveWindow }
}

export { useCloseWindow, useHideWindow, useMoveWindow }
