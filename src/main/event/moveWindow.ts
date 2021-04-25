import { EVENT_TYPE } from '@common/event/eventType'
import { screen, ipcMain, BrowserWindow } from 'electron'

const moveWindow = (win: BrowserWindow): void => {
  let winStartPosition = { x: 0, y: 0 }
  let mouseStartPosition = { x: 0, y: 0 }
  let movingInterval: NodeJS.Timeout | null = null

  ipcMain.on(EVENT_TYPE.MOVE_WINDOW, (events, { canMove }) => {
    if (canMove) {
      const winPosition = win.getPosition()
      winStartPosition = { x: winPosition[0], y: winPosition[1] }
      mouseStartPosition = screen.getCursorScreenPoint()
      if (movingInterval) {
        clearInterval(movingInterval)
      }
      movingInterval = setInterval(() => {
        const cursorPosition = screen.getCursorScreenPoint()
        const x = winStartPosition.x + cursorPosition.x - mouseStartPosition.x
        const y = winStartPosition.y + cursorPosition.y - mouseStartPosition.y
        win.setPosition(x, y, true)
      }, 5)
    } else {
      if (movingInterval) {
        clearInterval(movingInterval)
      }
      movingInterval = null
    }
  })
}

export { moveWindow }
