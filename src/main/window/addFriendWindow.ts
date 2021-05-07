import { WINDOW_NAME } from '@common/window/windowName'
import { createWindow, getWindowByName } from '.'

const createAddFriendWindow = () => {
  const mainWindow = getWindowByName(WINDOW_NAME.MAIN_WINDOW)
  createWindow(WINDOW_NAME.ADD_FRIEND_WINDOW, '/add', {
    width: 500,
    height: 500,
    parent: mainWindow,
  })
}

export { createAddFriendWindow }
