import { EVENT_TYPE } from '@common/event/eventType'

const handleMouseDown = (e: MouseEvent) => {
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
const handleMouseUp = () => {
  ipcRenderer.send(EVENT_TYPE.MOVE_WINDOW, {
    canMove: false,
  })
}
const useMoveWindow = () => {
  return { handleMouseDown, handleMouseUp }
}

export { useMoveWindow }
